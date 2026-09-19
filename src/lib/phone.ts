/**
 * O'zbekiston telefon raqami maskasi — `cleave.js` (35 KB) o'rniga.
 *
 * Format: +998 90 123-45-67
 * Cleave sozlamasi bilan bir xil: prefix '+998', blocks [4,2,3,2,2],
 * delimiters [' ', ' ', '-', '-'].
 */

export const PHONE_PREFIX = '+998'
/** To'liq raqamdagi raqamlar soni (998 + 9 ta) */
export const PHONE_DIGITS = 12
/** "+998 90 123-45-67" uzunligi */
export const PHONE_MAX_LENGTH = 17

/** Kiritilgan matndan faqat raqamlarni oladi (mamlakat kodi bilan). */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/** Xom raqamlarni "+998 90 123-45-67" ko'rinishiga keltiradi. */
export function formatPhone(value: string): string {
  let digits = phoneDigits(value)

  // Foydalanuvchi prefiksni o'chirib yuborsa ham qayta tiklaymiz
  if (!digits.startsWith('998')) {
    digits = '998' + digits.replace(/^9{0,3}/, '')
  }
  digits = digits.slice(0, PHONE_DIGITS)

  const rest = digits.slice(3)
  let out = PHONE_PREFIX
  if (rest.length) out += ' ' + rest.slice(0, 2)
  if (rest.length > 2) out += ' ' + rest.slice(2, 5)
  if (rest.length > 5) out += '-' + rest.slice(5, 7)
  if (rest.length > 7) out += '-' + rest.slice(7, 9)

  return out
}

/** Raqam to'liq kiritilganini tekshiradi. */
export function isPhoneComplete(value: string): boolean {
  return phoneDigits(value).length === PHONE_DIGITS
}
