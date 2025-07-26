"use client"
import { useEffect } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black p-6 rounded-2xl w-[90%] max-w-md shadow-lg animate-fade-in-up"
      >
        <h2 className="text-2xl font-semibold mb-4">Buyurtma berish</h2>
        <p className="mb-6 text-gray-600">
          Iltimos, bizga murojaat qilish uchun quyidagilardan birini tanlang:
        </p>
        <div className="flex flex-col gap-4">
          <a
            href="tel:+998901234567"
            className="bg-green-500 hover:bg-green-600 text-white text-center px-4 py-2 rounded-lg transition"
          >
            📞 Telefon qilish
          </a>
          <button
            className="border border-gray-400 hover:border-gray-600 px-4 py-2 rounded-lg text-center"
            onClick={onClose}
          >
            ❌ Bekor qilish
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
