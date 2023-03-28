import { createI18n } from 'vue-i18n'
import messages from './locale'

export default createI18n({
    legacy: false,
    locale: 'en_US',
    fallbackLocale: 'en_US',
    messages
})