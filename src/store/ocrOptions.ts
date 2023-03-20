import { computed } from "vue"

type OcrLanguageTmp = {
    name: string;
}

type OcrProvideType = {
    [key in keyof typeof ocrProvide]?: string;
}

type OcrModeType = {
    [key in keyof typeof ocrProvide]: {
        [key in string]: string
    };
}

type OcrLanguageType = OcrLanguageTmp & OcrProvideType

export type OcrLanguageKeys = keyof OcrProvideType

export const ocrProvideOptions = computed(() => {
    let list: SelectOptions[] = []
    Object.entries(ocrProvide).forEach(([k, v]) => {
        list.push({
            label: v,
            value: k
        })
    });
    return list
})

export function getOcrModeOptions(ocrProvide: OcrLanguageKeys) {
    let list: SelectOptions[] = []
    Object.entries(ocrMode[ocrProvide]).forEach(([k, v]) => {
        list.push({
            label: v,
            value: k
        })
    });
    return list
}

export function getOcrLanguageOptions(ocrProvide: OcrLanguageKeys) {
    let list: SelectOptions[] = []
    for (const item of ocrLanguage) {
        if (item[ocrProvide]) {
            list.push({
                label: item.name,
                value: item[ocrProvide]!
            })
        }
    }
    return list
}

const ocrProvide = {
    BaiduCloud: "百度云",
    TencentCloud: "腾讯云",
    SpaceOCR: "SpaceOCR",
}

const ocrMode: OcrModeType = {
    "BaiduCloud": {
        "general_basic": "通用",
        "accurate_basic": "高精度",
        "handwriting": "手写体",
    },
    "TencentCloud": {
        "GeneralBasicOCR": "通用",
        "GeneralAccurateOCR": "高精度",
        "GeneralHandwritingOCR": "手写体",
    },
    "SpaceOCR": {
        "1": "引擎一",
        "2": "引擎二",
        "3": "引擎三",
        "5": "引擎五",
    },
}

const ocrLanguage: OcrLanguageType[] = [
    {
        name: "Language_auto",
        BaiduCloud: "auto",
        TencentCloud: "auto",
    },
    {
        name: "Language_en",
        SpaceOCR: "eng",
    },
    {
        name: "Language_zh",
        SpaceOCR: "chs",
    },
    {
        name: "Language_cht",
        SpaceOCR: "cht",
    },
    {
        name: "Language_jp",
        SpaceOCR: "jpn",
    },
    {
        name: "Language_kor",
        SpaceOCR: "kor",
    },
    {
        name: "Language_fra",
        SpaceOCR: "fre",
    },
    {
        name: "Language_spa",
        SpaceOCR: "spa",
    },
    {
        name: "Language_th",
        SpaceOCR: "tai",
    },
    {
        name: "Language_ara",
        SpaceOCR: "ara",
    },
    {
        name: "Language_ru",
        SpaceOCR: "rus",
    },
    {
        name: "Language_bul",
        SpaceOCR: "bul",
    },
    {
        name: "Language_hr",
        SpaceOCR: "hrv",
    },
    {
        name: "Language_cs",
        SpaceOCR: "cze",
    },
    {
        name: "Language_dan",
        SpaceOCR: "dan",
    },
    {
        name: "Language_nl",
        SpaceOCR: "dut",
    },
    {
        name: "Language_it",
        SpaceOCR: "ita",
    },
    {
        name: "Language_fin",
        SpaceOCR: "fin",
    },
    {
        name: "Language_de",
        SpaceOCR: "ger",
    },
    {
        name: "Language_el",
        SpaceOCR: "gre",
    },
    {
        name: "Language_hu",
        SpaceOCR: "hun",
    },
    {
        name: "Language_pl",
        SpaceOCR: "pol",
    },
    {
        name: "Language_pt",
        SpaceOCR: "por",
    },
    {
        name: "Language_slo",
        SpaceOCR: "slv",
    },
    {
        name: "Language_swe",
        SpaceOCR: "swe",
    },
    {
        name: "Language_tr",
        SpaceOCR: "tur",
    },
    {
        name: "Language_hi",
        SpaceOCR: "hin",
    },
    {
        name: "Language_kn",
        SpaceOCR: "kan",
    },
    {
        name: "Language_fa",
        SpaceOCR: "per",
    },
    {
        name: "Language_te",
        SpaceOCR: "tel",
    },
    {
        name: "Language_ta",
        SpaceOCR: "tam",
    },
    {
        name: "Language_vie",
        SpaceOCR: "vie",
    },
]
