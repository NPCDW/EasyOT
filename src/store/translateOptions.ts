import { computed } from "vue"

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

const translateProvide = {
    BaiduAI: "百度翻译开放平台",
    TencentCloud: "腾讯云",
    GoogleTranslate: "谷歌翻译",
}

const translateLanguage: TranslateLanguageType[] = [
    {
        name: "Language_auto",
        BaiduAI: "auto",
        TencentCloud: "auto",
        GoogleTranslate: "auto",
    },
    {
        name: "Language_zh",
        BaiduAI: "zh",
        TencentCloud: "zh",
        GoogleTranslate: "zh-cn",
    },
    {
        name: "Language_cht",
        BaiduAI: "cht",
        TencentCloud: "zh-TW",
        GoogleTranslate: "zh-tw",
    },
    {
        name: "Language_en",
        BaiduAI: "en",
        TencentCloud: "en",
        GoogleTranslate: "en",
    },
    {
        name: "Language_jp",
        BaiduAI: "jp",
        TencentCloud: "ja",
        GoogleTranslate: "ja",
    },
    {
        name: "Language_kor",
        BaiduAI: "kor",
        TencentCloud: "ko",
        GoogleTranslate: "ko",
    },
    {
        name: "Language_fra",
        BaiduAI: "fra",
        TencentCloud: "fr",
        GoogleTranslate: "fr",
    },
    {
        name: "Language_spa",
        BaiduAI: "spa",
        TencentCloud: "es",
        GoogleTranslate: "es",
    },
    {
        name: "Language_th",
        BaiduAI: "th",
        TencentCloud: "th",
        GoogleTranslate: "th",
    },
    {
        name: "Language_ara",
        BaiduAI: "ara",
        TencentCloud: "ar",
        GoogleTranslate: "ar",
    },
    {
        name: "Language_ru",
        BaiduAI: "ru",
        TencentCloud: "ru",
        GoogleTranslate: "ru",
    },
    {
        name: "Language_pt",
        BaiduAI: "pt",
        TencentCloud: "pt",
        GoogleTranslate: "pt",
    },
    {
        name: "Language_de",
        BaiduAI: "de",
        TencentCloud: "de",
        GoogleTranslate: "de",
    },
    {
        name: "Language_it",
        BaiduAI: "it",
        TencentCloud: "it",
        GoogleTranslate: "it",
    },
    {
        name: "Language_vie",
        BaiduAI: "vie",
        TencentCloud: "vi",
        GoogleTranslate: "vi",
    },
    {
        name: "Language_el",
        BaiduAI: "el",
        GoogleTranslate: "el",
    },
    {
        name: "Language_nl",
        BaiduAI: "nl",
        GoogleTranslate: "nl",
    },
    {
        name: "Language_pl",
        BaiduAI: "pl",
        GoogleTranslate: "pl",
    },
    {
        name: "Language_bul",
        BaiduAI: "bul",
        GoogleTranslate: "bg",
    },
    {
        name: "Language_est",
        BaiduAI: "est",
        GoogleTranslate: "et",
    },
    {
        name: "Language_dan",
        BaiduAI: "dan",
        GoogleTranslate: "da",
    },
    {
        name: "Language_fin",
        BaiduAI: "fin",
        GoogleTranslate: "fi",
    },
    {
        name: "Language_cs",
        BaiduAI: "cs",
        GoogleTranslate: "cs",
    },
    {
        name: "Language_rom",
        BaiduAI: "rom",
        GoogleTranslate: "ro",
    },
    {
        name: "Language_slo",
        BaiduAI: "slo",
        GoogleTranslate: "sl",
    },
    {
        name: "Language_swe",
        BaiduAI: "swe",
        GoogleTranslate: "sv",
    },
    {
        name: "Language_hu",
        BaiduAI: "hu",
        GoogleTranslate: "hu",
    },
    {
        name: "Language_tr",
        TencentCloud: "tr",
        GoogleTranslate: "tr",
    },
    {
        name: "Language_id",
        TencentCloud: "id",
        GoogleTranslate: "id",
    },
    {
        name: "Language_ms",
        TencentCloud: "ms",
        GoogleTranslate: "ms",
    },
    {
        name: "Language_hi",
        TencentCloud: "hi",
        GoogleTranslate: "hi",
    },
    {
        name: "Language_yue",
        BaiduAI: "yue",
    },
    {
        name: "Language_wyw",
        BaiduAI: "wyw",
    },
    {
        name: "Language_af",
        GoogleTranslate: "af",
    },
    {
        name: "Language_sq",
        GoogleTranslate: "sq",
    },
    {
        name: "Language_am",
        GoogleTranslate: "am",
    },
    {
        name: "Language_hy",
        GoogleTranslate: "hy",
    },
    {
        name: "Language_az",
        GoogleTranslate: "az",
    },
    {
        name: "Language_eu",
        GoogleTranslate: "eu",
    },
    {
        name: "Language_be",
        GoogleTranslate: "be",
    },
    {
        name: "Language_bn",
        GoogleTranslate: "bn",
    },
    {
        name: "Language_bs",
        GoogleTranslate: "bs",
    },
    {
        name: "Language_ca",
        GoogleTranslate: "ca",
    },
    {
        name: "Language_ceb",
        GoogleTranslate: "ceb",
    },
    {
        name: "Language_ny",
        GoogleTranslate: "ny",
    },
    {
        name: "Language_co",
        GoogleTranslate: "co",
    },
    {
        name: "Language_hr",
        GoogleTranslate: "hr",
    },
    {
        name: "Language_eo",
        GoogleTranslate: "eo",
    },
    {
        name: "Language_tl",
        GoogleTranslate: "tl",
    },
    {
        name: "Language_fy",
        GoogleTranslate: "fy",
    },
    {
        name: "Language_gl",
        GoogleTranslate: "gl",
    },
    {
        name: "Language_ka",
        GoogleTranslate: "ka",
    },
    {
        name: "Language_gu",
        GoogleTranslate: "gu",
    },
    {
        name: "Language_ht",
        GoogleTranslate: "ht",
    },
    {
        name: "Language_ha",
        GoogleTranslate: "ha",
    },
    {
        name: "Language_haw",
        GoogleTranslate: "haw",
    },
    {
        name: "Language_iw",
        GoogleTranslate: "iw",
    },
    {
        name: "Language_hmn",
        GoogleTranslate: "hmn",
    },
    {
        name: "Language_is",
        GoogleTranslate: "is",
    },
    {
        name: "Language_ig",
        GoogleTranslate: "ig",
    },
    {
        name: "Language_ga",
        GoogleTranslate: "ga",
    },
    {
        name: "Language_jw",
        GoogleTranslate: "jw",
    },
    {
        name: "Language_kn",
        GoogleTranslate: "kn",
    },
    {
        name: "Language_kk",
        GoogleTranslate: "kk",
    },
    {
        name: "Language_km",
        GoogleTranslate: "km",
    },
    {
        name: "Language_ku",
        GoogleTranslate: "ku",
    },
    {
        name: "Language_ky",
        GoogleTranslate: "ky",
    },
    {
        name: "Language_lo",
        GoogleTranslate: "lo",
    },
    {
        name: "Language_la",
        GoogleTranslate: "la",
    },
    {
        name: "Language_lv",
        GoogleTranslate: "lv",
    },
    {
        name: "Language_lt",
        GoogleTranslate: "lt",
    },
    {
        name: "Language_lb",
        GoogleTranslate: "lb",
    },
    {
        name: "Language_mk",
        GoogleTranslate: "mk",
    },
    {
        name: "Language_mg",
        GoogleTranslate: "mg",
    },
    {
        name: "Language_ml",
        GoogleTranslate: "ml",
    },
    {
        name: "Language_mt",
        GoogleTranslate: "mt",
    },
    {
        name: "Language_mi",
        GoogleTranslate: "mi",
    },
    {
        name: "Language_mr",
        GoogleTranslate: "mr",
    },
    {
        name: "Language_mn",
        GoogleTranslate: "mn",
    },
    {
        name: "Language_my",
        GoogleTranslate: "my",
    },
    {
        name: "Language_ne",
        GoogleTranslate: "ne",
    },
    {
        name: "Language_no",
        GoogleTranslate: "no",
    },
    {
        name: "Language_ps",
        GoogleTranslate: "ps",
    },
    {
        name: "Language_fa",
        GoogleTranslate: "fa",
    },
    {
        name: "Language_ma",
        GoogleTranslate: "ma",
    },
    {
        name: "Language_sm",
        GoogleTranslate: "sm",
    },
    {
        name: "Language_gd",
        GoogleTranslate: "gd",
    },
    {
        name: "Language_sr",
        GoogleTranslate: "sr",
    },
    {
        name: "Language_st",
        GoogleTranslate: "st",
    },
    {
        name: "Language_sn",
        GoogleTranslate: "sn",
    },
    {
        name: "Language_sd",
        GoogleTranslate: "sd",
    },
    {
        name: "Language_si",
        GoogleTranslate: "si",
    },
    {
        name: "Language_sk",
        GoogleTranslate: "sk",
    },
    {
        name: "Language_so",
        GoogleTranslate: "so",
    },
    {
        name: "Language_su",
        GoogleTranslate: "su",
    },
    {
        name: "Language_sw",
        GoogleTranslate: "sw",
    },
    {
        name: "Language_tg",
        GoogleTranslate: "tg",
    },
    {
        name: "Language_ta",
        GoogleTranslate: "ta",
    },
    {
        name: "Language_te",
        GoogleTranslate: "te",
    },
    {
        name: "Language_uk",
        GoogleTranslate: "uk",
    },
    {
        name: "Language_ur",
        GoogleTranslate: "ur",
    },
    {
        name: "Language_uz",
        GoogleTranslate: "uz",
    },
    {
        name: "Language_cy",
        GoogleTranslate: "cy",
    },
    {
        name: "Language_xh",
        GoogleTranslate: "xh",
    },
    {
        name: "Language_yi",
        GoogleTranslate: "yi",
    },
    {
        name: "Language_yo",
        GoogleTranslate: "yo",
    },
    {
        name: "Language_zu",
        GoogleTranslate: "zu",
    }
]
