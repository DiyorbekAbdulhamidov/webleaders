'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react'
import uz, { type Translations } from '@/i18n/uz'

export type LangType = 'UZ' | 'RU' | 'EN'

/**
 * Tillar alohida chunk'larda.
 *
 * Ilgari uchala tilning barcha matnlari (76 KB / 26 KB gz) har bir sahifaga
 * yuklanardi — holbuki tashrif buyuruvchilarning katta qismi faqat o'zbekchani
 * ko'radi. Endi UZ statik, RU va EN esa faqat tanlanganda yuklanadi.
 */
const loaders: Record<Exclude<LangType, 'UZ'>, () => Promise<{ default: Translations }>> = {
  RU: () => import('@/i18n/ru'),
  EN: () => import('@/i18n/en')
}

interface LanguageContextType {
  language: LangType
  setLanguage: (lang: LangType) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LangType>('UZ')
  const [dict, setDict] = useState<Translations>(uz)

  const applyLanguage = useCallback((lang: LangType) => {
    if (lang === 'UZ') {
      setDict(uz)
      setLanguage('UZ')
      return
    }
    loaders[lang]()
      .then(mod => {
        setDict(mod.default)
        setLanguage(lang)
      })
      .catch(() => {
        // Chunk yuklanmasa o'zbekchada qolamiz — sahifa buzilmaydi
      })
  }, [])

  // Saqlangan tilni faqat mount'dan keyin o'qiymiz. useState initializer'da
  // o'qib bo'lmaydi — server 'UZ' render qiladi, hydration mos kelmay qoladi.
  useEffect(() => {
    // Hydration yakunlandi — layout'dagi "3 soniyalik himoya" taymeri
    // scroll-reveal klassini olib tashlamasin.
    document.documentElement.setAttribute('data-wl-ready', '')

    let savedLang: string | null = null
    try {
      savedLang = localStorage.getItem('lang')
    } catch {
      // Private rejim / cookie bloklangan — standart til bilan davom etamiz
    }
    if (savedLang === 'RU' || savedLang === 'EN') {
      // localStorage faqat klientda mavjud, shuning uchun bu holatni
      // useState initializer'da hal qilib bo'lmaydi — server doim UZ render
      // qiladi va hydration mos kelishi shart.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      applyLanguage(savedLang)
    }
  }, [applyLanguage])

  const handleSetLanguage = useCallback(
    (lang: LangType) => {
      applyLanguage(lang)
      try {
        localStorage.setItem('lang', lang)
      } catch {
        // Saqlab bo'lmasa ham til shu sessiyada almashaveradi
      }
    },
    [applyLanguage]
  )

  // Har bir renderda yangi obyekt yaratilsa, kontekstdagi BARCHA komponentlar
  // qayta render bo'ladi. useMemo shuni to'xtatadi.
  const value = useMemo(
    () => ({ language, setLanguage: handleSetLanguage, t: dict }),
    [language, dict, handleSetLanguage]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
