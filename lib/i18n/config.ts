import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from '@/public/locales/en/common.json'
import koCommon from '@/public/locales/ko/common.json'

const resources = {
  en: {
    common: enCommon,
  },
  ko: {
    common: koCommon,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n