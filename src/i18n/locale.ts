import en_US from './lang/en_us.json'
import zh_CN from './lang/zh_cn.json'

const lang = {
    en_US,
    zh_CN,
}

export type LocaleLangType = keyof typeof lang

export default lang