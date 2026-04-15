// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/translations'

const LANGUAGE_STORAGE_KEY = 'sms_gateway_language'
const SUPPORTED_LANGUAGES = ['en', 'bn']

const LanguageContext = createContext(null)

function resolveKey(dictionary, key) {
  return key.split('.').reduce((result, part) => {
    if (result && Object.prototype.hasOwnProperty.call(result, part)) {
      return result[part]
    }

    return undefined
  }, dictionary)
}

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (SUPPORTED_LANGUAGES.includes(storedLanguage)) {
    return storedLanguage
  }

  return 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  const setAppLanguage = useCallback((nextLanguage) => {
    if (SUPPORTED_LANGUAGES.includes(nextLanguage)) {
      setLanguage(nextLanguage)
    }
  }, [])

  const t = useCallback(
    (key) => {
      const selectedValue = resolveKey(translations[language], key)

      if (typeof selectedValue === 'string') {
        return selectedValue
      }

      const fallbackValue = resolveKey(translations.en, key)

      if (typeof fallbackValue === 'string') {
        return fallbackValue
      }

      return key
    },
    [language],
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage: setAppLanguage,
      t,
    }),
    [language, setAppLanguage, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
