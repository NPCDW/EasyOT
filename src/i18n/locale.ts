import en_US from './lang/en_us.json'
import zh_CN from './lang/zh_cn.json'

const lang = {
    en_US,
    zh_CN,
}

export type LocaleLangType = keyof typeof lang

export const langOptions = [
    {
      label: "English",
      value: "en_US"
    },
    {
      label: "简体中文",
      value: "zh_CN"
    },
]

export default lang