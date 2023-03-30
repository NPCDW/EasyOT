import { computed } from "vue"
import i18n from '../i18n'

const { t } = i18n.global

type TranslateLanguageTmp = {
    name: string;
}

type TranslateProvideType = {
    [key in keyof typeof translateProvide]?: string;
}

type TranslateLanguageType = TranslateLanguageTmp & TranslateProvideType

export type TranslateLanguageKeys = keyof TranslateProvideType

export const translateProvideOptions = computed(() => {
    let list: SelectOptions[] = []
    Object.entries(translateProvide).forEach(([k, v]) => {
        list.push({
            label: t(v),
            value: k
        })
    });
    return list
})

export function getTranslateLanguageOptions(translateProvide: TranslateLanguageKeys) {
    let list: SelectOptions[] = []
    for (const item of translateLanguage) {
        if (item[translateProvide]) {
            list.push({
                label: computed(() => t(item.name)),
                value: item[translateProvide]!
            })
        }
    }
    return list
}

const translateProvide = {
    BaiduAI: 'translateOptions.BaiduTranslate',
    TencentCloud: 'translateOptions.TencentCloud',
    GoogleTranslate: 'translateOptions.GoogleTranslate',
}

const translateLanguage: TranslateLanguageType[] = [
    {
        name: 'language.auto',
        BaiduAI: "auto",
        TencentCloud: "auto",
        GoogleTranslate: "auto",
    },
    {
        name: 'language.zh',
        BaiduAI: "zh",
        TencentCloud: "zh",
        GoogleTranslate: "zh-cn",
    },
    {
        name: 'language.cht',
        BaiduAI: "cht",
        TencentCloud: "zh-TW",
        GoogleTranslate: "zh-tw",
    },
    {
        name: 'language.en',
        BaiduAI: "en",
        TencentCloud: "en",
        GoogleTranslate: "en",
    },
    {
        name: 'language.jp',
        BaiduAI: "jp",
        TencentCloud: "ja",
        GoogleTranslate: "ja",
    },
    {
        name: 'language.kor',
        BaiduAI: "kor",
        TencentCloud: "ko",
        GoogleTranslate: "ko",
    },
    {
        name: 'language.fra',
        BaiduAI: "fra",
        TencentCloud: "fr",
        GoogleTranslate: "fr",
    },
    {
        name: 'language.spa',
        BaiduAI: "spa",
        TencentCloud: "es",
        GoogleTranslate: "es",
    },
    {
        name: 'language.th',
        BaiduAI: "th",
        TencentCloud: "th",
        GoogleTranslate: "th",
    },
    {
        name: 'language.ara',
        BaiduAI: "ara",
        TencentCloud: "ar",
        GoogleTranslate: "ar",
    },
    {
        name: 'language.ru',
        BaiduAI: "ru",
        TencentCloud: "ru",
        GoogleTranslate: "ru",
    },
    {
        name: 'language.pt',
        BaiduAI: "pt",
        TencentCloud: "pt",
        GoogleTranslate: "pt",
    },
    {
        name: 'language.de',
        BaiduAI: "de",
        TencentCloud: "de",
        GoogleTranslate: "de",
    },
    {
        name: 'language.it',
        BaiduAI: "it",
        TencentCloud: "it",
        GoogleTranslate: "it",
    },
    {
        name: 'language.vie',
        BaiduAI: "vie",
        TencentCloud: "vi",
        GoogleTranslate: "vi",
    },
    {
        name: 'language.el',
        BaiduAI: "el",
        GoogleTranslate: "el",
    },
    {
        name: 'language.nl',
        BaiduAI: "nl",
        GoogleTranslate: "nl",
    },
    {
        name: 'language.pl',
        BaiduAI: "pl",
        GoogleTranslate: "pl",
    },
    {
        name: 'language.bul',
        BaiduAI: "bul",
        GoogleTranslate: "bg",
    },
    {
        name: 'language.est',
        BaiduAI: "est",
        GoogleTranslate: "et",
    },
    {
        name: 'language.dan',
        BaiduAI: "dan",
        GoogleTranslate: "da",
    },
    {
        name: 'language.fin',
        BaiduAI: "fin",
        GoogleTranslate: "fi",
    },
    {
        name: 'language.cs',
        BaiduAI: "cs",
        GoogleTranslate: "cs",
    },
    {
        name: 'language.rom',
        BaiduAI: "rom",
        GoogleTranslate: "ro",
    },
    {
        name: 'language.slo',
        BaiduAI: "slo",
        GoogleTranslate: "sl",
    },
    {
        name: 'language.swe',
        BaiduAI: "swe",
        GoogleTranslate: "sv",
    },
    {
        name: 'language.hu',
        BaiduAI: "hu",
        GoogleTranslate: "hu",
    },
    {
        name: 'language.tr',
        TencentCloud: "tr",
        GoogleTranslate: "tr",
    },
    {
        name: 'language.id',
        TencentCloud: "id",
        GoogleTranslate: "id",
    },
    {
        name: 'language.ms',
        TencentCloud: "ms",
        GoogleTranslate: "ms",
    },
    {
        name: 'language.hi',
        TencentCloud: "hi",
        GoogleTranslate: "hi",
    },
    {
        name: 'language.yue',
        BaiduAI: "yue",
    },
    {
        name: 'language.wyw',
        BaiduAI: "wyw",
    },
    {
        name: 'language.af',
        GoogleTranslate: "af",
    },
    {
        name: 'language.sq',
        GoogleTranslate: "sq",
    },
    {
        name: 'language.am',
        GoogleTranslate: "am",
    },
    {
        name: 'language.hy',
        GoogleTranslate: "hy",
    },
    {
        name: 'language.az',
        GoogleTranslate: "az",
    },
    {
        name: 'language.eu',
        GoogleTranslate: "eu",
    },
    {
        name: 'language.be',
        GoogleTranslate: "be",
    },
    {
        name: 'language.bn',
        GoogleTranslate: "bn",
    },
    {
        name: 'language.bs',
        GoogleTranslate: "bs",
    },
    {
        name: 'language.ca',
        GoogleTranslate: "ca",
    },
    {
        name: 'language.ceb',
        GoogleTranslate: "ceb",
    },
    {
        name: 'language.ny',
        GoogleTranslate: "ny",
    },
    {
        name: 'language.co',
        GoogleTranslate: "co",
    },
    {
        name: 'language.hr',
        GoogleTranslate: "hr",
    },
    {
        name: 'language.eo',
        GoogleTranslate: "eo",
    },
    {
        name: 'language.tl',
        GoogleTranslate: "tl",
    },
    {
        name: 'language.fy',
        GoogleTranslate: "fy",
    },
    {
        name: 'language.gl',
        GoogleTranslate: "gl",
    },
    {
        name: 'language.ka',
        GoogleTranslate: "ka",
    },
    {
        name: 'language.gu',
        GoogleTranslate: "gu",
    },
    {
        name: 'language.ht',
        GoogleTranslate: "ht",
    },
    {
        name: 'language.ha',
        GoogleTranslate: "ha",
    },
    {
        name: 'language.haw',
        GoogleTranslate: "haw",
    },
    {
        name: 'language.iw',
        GoogleTranslate: "iw",
    },
    {
        name: 'language.hmn',
        GoogleTranslate: "hmn",
    },
    {
        name: 'language.is',
        GoogleTranslate: "is",
    },
    {
        name: 'language.ig',
        GoogleTranslate: "ig",
    },
    {
        name: 'language.ga',
        GoogleTranslate: "ga",
    },
    {
        name: 'language.jw',
        GoogleTranslate: "jw",
    },
    {
        name: 'language.kn',
        GoogleTranslate: "kn",
    },
    {
        name: 'language.kk',
        GoogleTranslate: "kk",
    },
    {
        name: 'language.km',
        GoogleTranslate: "km",
    },
    {
        name: 'language.ku',
        GoogleTranslate: "ku",
    },
    {
        name: 'language.ky',
        GoogleTranslate: "ky",
    },
    {
        name: 'language.lo',
        GoogleTranslate: "lo",
    },
    {
        name: 'language.la',
        GoogleTranslate: "la",
    },
    {
        name: 'language.lv',
        GoogleTranslate: "lv",
    },
    {
        name: 'language.lt',
        GoogleTranslate: "lt",
    },
    {
        name: 'language.lb',
        GoogleTranslate: "lb",
    },
    {
        name: 'language.mk',
        GoogleTranslate: "mk",
    },
    {
        name: 'language.mg',
        GoogleTranslate: "mg",
    },
    {
        name: 'language.ml',
        GoogleTranslate: "ml",
    },
    {
        name: 'language.mt',
        GoogleTranslate: "mt",
    },
    {
        name: 'language.mi',
        GoogleTranslate: "mi",
    },
    {
        name: 'language.mr',
        GoogleTranslate: "mr",
    },
    {
        name: 'language.mn',
        GoogleTranslate: "mn",
    },
    {
        name: 'language.my',
        GoogleTranslate: "my",
    },
    {
        name: 'language.ne',
        GoogleTranslate: "ne",
    },
    {
        name: 'language.no',
        GoogleTranslate: "no",
    },
    {
        name: 'language.ps',
        GoogleTranslate: "ps",
    },
    {
        name: 'language.fa',
        GoogleTranslate: "fa",
    },
    {
        name: 'language.ma',
        GoogleTranslate: "ma",
    },
    {
        name: 'language.sm',
        GoogleTranslate: "sm",
    },
    {
        name: 'language.gd',
        GoogleTranslate: "gd",
    },
    {
        name: 'language.sr',
        GoogleTranslate: "sr",
    },
    {
        name: 'language.st',
        GoogleTranslate: "st",
    },
    {
        name: 'language.sn',
        GoogleTranslate: "sn",
    },
    {
        name: 'language.sd',
        GoogleTranslate: "sd",
    },
    {
        name: 'language.si',
        GoogleTranslate: "si",
    },
    {
        name: 'language.sk',
        GoogleTranslate: "sk",
    },
    {
        name: 'language.so',
        GoogleTranslate: "so",
    },
    {
        name: 'language.su',
        GoogleTranslate: "su",
    },
    {
        name: 'language.sw',
        GoogleTranslate: "sw",
    },
    {
        name: 'language.tg',
        GoogleTranslate: "tg",
    },
    {
        name: 'language.ta',
        GoogleTranslate: "ta",
    },
    {
        name: 'language.te',
        GoogleTranslate: "te",
    },
    {
        name: 'language.uk',
        GoogleTranslate: "uk",
    },
    {
        name: 'language.ur',
        GoogleTranslate: "ur",
    },
    {
        name: 'language.uz',
        GoogleTranslate: "uz",
    },
    {
        name: 'language.cy',
        GoogleTranslate: "cy",
    },
    {
        name: 'language.xh',
        GoogleTranslate: "xh",
    },
    {
        name: 'language.yi',
        GoogleTranslate: "yi",
    },
    {
        name: 'language.yo',
        GoogleTranslate: "yo",
    },
    {
        name: 'language.zu',
        GoogleTranslate: "zu",
    }
]
