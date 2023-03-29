import { computed } from "vue"
import i18n from '../i18n'

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
            label: v,
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
                label: item.name,
                value: item[translateProvide]!
            })
        }
    }
    return list
}

const { t } = i18n.global

const translateProvide = {
    BaiduAI: t('translateOptions.TencentCloud'),
    TencentCloud: t('translateOptions.TencentCloud'),
    GoogleTranslate: t('translateOptions.TencentCloud'),
}

const translateLanguage: TranslateLanguageType[] = [
    {
        name: t('language.auto'),
        BaiduAI: "auto",
        TencentCloud: "auto",
        GoogleTranslate: "auto",
    },
    {
        name: t('language.zh'),
        BaiduAI: "zh",
        TencentCloud: "zh",
        GoogleTranslate: "zh-cn",
    },
    {
        name: t('language.cht'),
        BaiduAI: "cht",
        TencentCloud: "zh-TW",
        GoogleTranslate: "zh-tw",
    },
    {
        name: t('language.en'),
        BaiduAI: "en",
        TencentCloud: "en",
        GoogleTranslate: "en",
    },
    {
        name: t('language.jp'),
        BaiduAI: "jp",
        TencentCloud: "ja",
        GoogleTranslate: "ja",
    },
    {
        name: t('language.kor'),
        BaiduAI: "kor",
        TencentCloud: "ko",
        GoogleTranslate: "ko",
    },
    {
        name: t('language.fra'),
        BaiduAI: "fra",
        TencentCloud: "fr",
        GoogleTranslate: "fr",
    },
    {
        name: t('language.spa'),
        BaiduAI: "spa",
        TencentCloud: "es",
        GoogleTranslate: "es",
    },
    {
        name: t('language.th'),
        BaiduAI: "th",
        TencentCloud: "th",
        GoogleTranslate: "th",
    },
    {
        name: t('language.ara'),
        BaiduAI: "ara",
        TencentCloud: "ar",
        GoogleTranslate: "ar",
    },
    {
        name: t('language.ru'),
        BaiduAI: "ru",
        TencentCloud: "ru",
        GoogleTranslate: "ru",
    },
    {
        name: t('language.pt'),
        BaiduAI: "pt",
        TencentCloud: "pt",
        GoogleTranslate: "pt",
    },
    {
        name: t('language.de'),
        BaiduAI: "de",
        TencentCloud: "de",
        GoogleTranslate: "de",
    },
    {
        name: t('language.it'),
        BaiduAI: "it",
        TencentCloud: "it",
        GoogleTranslate: "it",
    },
    {
        name: t('language.vie'),
        BaiduAI: "vie",
        TencentCloud: "vi",
        GoogleTranslate: "vi",
    },
    {
        name: t('language.el'),
        BaiduAI: "el",
        GoogleTranslate: "el",
    },
    {
        name: t('language.nl'),
        BaiduAI: "nl",
        GoogleTranslate: "nl",
    },
    {
        name: t('language.pl'),
        BaiduAI: "pl",
        GoogleTranslate: "pl",
    },
    {
        name: t('language.bul'),
        BaiduAI: "bul",
        GoogleTranslate: "bg",
    },
    {
        name: t('language.est'),
        BaiduAI: "est",
        GoogleTranslate: "et",
    },
    {
        name: t('language.dan'),
        BaiduAI: "dan",
        GoogleTranslate: "da",
    },
    {
        name: t('language.fin'),
        BaiduAI: "fin",
        GoogleTranslate: "fi",
    },
    {
        name: t('language.cs'),
        BaiduAI: "cs",
        GoogleTranslate: "cs",
    },
    {
        name: t('language.rom'),
        BaiduAI: "rom",
        GoogleTranslate: "ro",
    },
    {
        name: t('language.slo'),
        BaiduAI: "slo",
        GoogleTranslate: "sl",
    },
    {
        name: t('language.swe'),
        BaiduAI: "swe",
        GoogleTranslate: "sv",
    },
    {
        name: t('language.hu'),
        BaiduAI: "hu",
        GoogleTranslate: "hu",
    },
    {
        name: t('language.tr'),
        TencentCloud: "tr",
        GoogleTranslate: "tr",
    },
    {
        name: t('language.id'),
        TencentCloud: "id",
        GoogleTranslate: "id",
    },
    {
        name: t('language.ms'),
        TencentCloud: "ms",
        GoogleTranslate: "ms",
    },
    {
        name: t('language.hi'),
        TencentCloud: "hi",
        GoogleTranslate: "hi",
    },
    {
        name: t('language.yue'),
        BaiduAI: "yue",
    },
    {
        name: t('language.wyw'),
        BaiduAI: "wyw",
    },
    {
        name: t('language.af'),
        GoogleTranslate: "af",
    },
    {
        name: t('language.sq'),
        GoogleTranslate: "sq",
    },
    {
        name: t('language.am'),
        GoogleTranslate: "am",
    },
    {
        name: t('language.hy'),
        GoogleTranslate: "hy",
    },
    {
        name: t('language.az'),
        GoogleTranslate: "az",
    },
    {
        name: t('language.eu'),
        GoogleTranslate: "eu",
    },
    {
        name: t('language.be'),
        GoogleTranslate: "be",
    },
    {
        name: t('language.bn'),
        GoogleTranslate: "bn",
    },
    {
        name: t('language.bs'),
        GoogleTranslate: "bs",
    },
    {
        name: t('language.ca'),
        GoogleTranslate: "ca",
    },
    {
        name: t('language.ceb'),
        GoogleTranslate: "ceb",
    },
    {
        name: t('language.ny'),
        GoogleTranslate: "ny",
    },
    {
        name: t('language.co'),
        GoogleTranslate: "co",
    },
    {
        name: t('language.hr'),
        GoogleTranslate: "hr",
    },
    {
        name: t('language.eo'),
        GoogleTranslate: "eo",
    },
    {
        name: t('language.tl'),
        GoogleTranslate: "tl",
    },
    {
        name: t('language.fy'),
        GoogleTranslate: "fy",
    },
    {
        name: t('language.gl'),
        GoogleTranslate: "gl",
    },
    {
        name: t('language.ka'),
        GoogleTranslate: "ka",
    },
    {
        name: t('language.gu'),
        GoogleTranslate: "gu",
    },
    {
        name: t('language.ht'),
        GoogleTranslate: "ht",
    },
    {
        name: t('language.ha'),
        GoogleTranslate: "ha",
    },
    {
        name: t('language.haw'),
        GoogleTranslate: "haw",
    },
    {
        name: t('language.iw'),
        GoogleTranslate: "iw",
    },
    {
        name: t('language.hmn'),
        GoogleTranslate: "hmn",
    },
    {
        name: t('language.is'),
        GoogleTranslate: "is",
    },
    {
        name: t('language.ig'),
        GoogleTranslate: "ig",
    },
    {
        name: t('language.ga'),
        GoogleTranslate: "ga",
    },
    {
        name: t('language.jw'),
        GoogleTranslate: "jw",
    },
    {
        name: t('language.kn'),
        GoogleTranslate: "kn",
    },
    {
        name: t('language.kk'),
        GoogleTranslate: "kk",
    },
    {
        name: t('language.km'),
        GoogleTranslate: "km",
    },
    {
        name: t('language.ku'),
        GoogleTranslate: "ku",
    },
    {
        name: t('language.ky'),
        GoogleTranslate: "ky",
    },
    {
        name: t('language.lo'),
        GoogleTranslate: "lo",
    },
    {
        name: t('language.la'),
        GoogleTranslate: "la",
    },
    {
        name: t('language.lv'),
        GoogleTranslate: "lv",
    },
    {
        name: t('language.lt'),
        GoogleTranslate: "lt",
    },
    {
        name: t('language.lb'),
        GoogleTranslate: "lb",
    },
    {
        name: t('language.mk'),
        GoogleTranslate: "mk",
    },
    {
        name: t('language.mg'),
        GoogleTranslate: "mg",
    },
    {
        name: t('language.ml'),
        GoogleTranslate: "ml",
    },
    {
        name: t('language.mt'),
        GoogleTranslate: "mt",
    },
    {
        name: t('language.mi'),
        GoogleTranslate: "mi",
    },
    {
        name: t('language.mr'),
        GoogleTranslate: "mr",
    },
    {
        name: t('language.mn'),
        GoogleTranslate: "mn",
    },
    {
        name: t('language.my'),
        GoogleTranslate: "my",
    },
    {
        name: t('language.ne'),
        GoogleTranslate: "ne",
    },
    {
        name: t('language.no'),
        GoogleTranslate: "no",
    },
    {
        name: t('language.ps'),
        GoogleTranslate: "ps",
    },
    {
        name: t('language.fa'),
        GoogleTranslate: "fa",
    },
    {
        name: t('language.ma'),
        GoogleTranslate: "ma",
    },
    {
        name: t('language.sm'),
        GoogleTranslate: "sm",
    },
    {
        name: t('language.gd'),
        GoogleTranslate: "gd",
    },
    {
        name: t('language.sr'),
        GoogleTranslate: "sr",
    },
    {
        name: t('language.st'),
        GoogleTranslate: "st",
    },
    {
        name: t('language.sn'),
        GoogleTranslate: "sn",
    },
    {
        name: t('language.sd'),
        GoogleTranslate: "sd",
    },
    {
        name: t('language.si'),
        GoogleTranslate: "si",
    },
    {
        name: t('language.sk'),
        GoogleTranslate: "sk",
    },
    {
        name: t('language.so'),
        GoogleTranslate: "so",
    },
    {
        name: t('language.su'),
        GoogleTranslate: "su",
    },
    {
        name: t('language.sw'),
        GoogleTranslate: "sw",
    },
    {
        name: t('language.tg'),
        GoogleTranslate: "tg",
    },
    {
        name: t('language.ta'),
        GoogleTranslate: "ta",
    },
    {
        name: t('language.te'),
        GoogleTranslate: "te",
    },
    {
        name: t('language.uk'),
        GoogleTranslate: "uk",
    },
    {
        name: t('language.ur'),
        GoogleTranslate: "ur",
    },
    {
        name: t('language.uz'),
        GoogleTranslate: "uz",
    },
    {
        name: t('language.cy'),
        GoogleTranslate: "cy",
    },
    {
        name: t('language.xh'),
        GoogleTranslate: "xh",
    },
    {
        name: t('language.yi'),
        GoogleTranslate: "yi",
    },
    {
        name: t('language.yo'),
        GoogleTranslate: "yo",
    },
    {
        name: t('language.zu'),
        GoogleTranslate: "zu",
    }
]
