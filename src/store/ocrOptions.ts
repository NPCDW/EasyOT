import { computed } from "vue"
import i18n from '../i18n'

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
            label: t(v),
            value: k
        })
    });
    return list
})

export function getOcrModeOptions(ocrProvide: OcrLanguageKeys) {
    let list: SelectOptions[] = []
    Object.entries(ocrMode[ocrProvide]).forEach(([k, v]) => {
        list.push({
            label: t(v),
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
                label: t(item.name),
                value: item[ocrProvide]!
            })
        }
    }
    return list
}

const { t } = i18n.global

const ocrProvide = {
    BaiduCloud: 'ocrOptions.BaiduCloud',
    TencentCloud: 'ocrOptions.TencentCloud',
    SpaceOCR: 'ocrOptions.SpaceOCR',
}

const ocrMode: OcrModeType = {
    "BaiduCloud": {
        "general_basic": 'ocrOptions.GeneralBasicOCR',
        "accurate_basic": 'ocrOptions.GeneralAccurateOCR',
        "handwriting": 'ocrOptions.GeneralHandwritingOCR',
    },
    "TencentCloud": {
        "GeneralBasicOCR": 'ocrOptions.GeneralBasicOCR',
        "GeneralAccurateOCR": 'ocrOptions.GeneralAccurateOCR',
        "GeneralHandwritingOCR": 'ocrOptions.GeneralHandwritingOCR',
    },
    "SpaceOCR": {
        "1": 'ocrOptions.engine1',
        "2": 'ocrOptions.engine2',
        "3": 'ocrOptions.engine3',
        "5": 'ocrOptions.engine5',
    },
}

const ocrLanguage: OcrLanguageType[] = [
    {
        name: 'language.auto',
        BaiduCloud: "auto",
        TencentCloud: "auto",
    },
    {
        name: 'language.en',
        SpaceOCR: "eng",
    },
    {
        name: 'language.zh',
        SpaceOCR: "chs",
    },
    {
        name: 'language.cht',
        SpaceOCR: "cht",
    },
    {
        name: 'language.jp',
        SpaceOCR: "jpn",
    },
    {
        name: 'language.kor',
        SpaceOCR: "kor",
    },
    {
        name: 'language.fra',
        SpaceOCR: "fre",
    },
    {
        name: 'language.spa',
        SpaceOCR: "spa",
    },
    {
        name: 'language.th',
        SpaceOCR: "tai",
    },
    {
        name: 'language.ara',
        SpaceOCR: "ara",
    },
    {
        name: 'language.ru',
        SpaceOCR: "rus",
    },
    {
        name: 'language.bul',
        SpaceOCR: "bul",
    },
    {
        name: 'language.hr',
        SpaceOCR: "hrv",
    },
    {
        name: 'language.cs',
        SpaceOCR: "cze",
    },
    {
        name: 'language.dan',
        SpaceOCR: "dan",
    },
    {
        name: 'language.nl',
        SpaceOCR: "dut",
    },
    {
        name: 'language.it',
        SpaceOCR: "ita",
    },
    {
        name: 'language.fin',
        SpaceOCR: "fin",
    },
    {
        name: 'language.de',
        SpaceOCR: "ger",
    },
    {
        name: 'language.el',
        SpaceOCR: "gre",
    },
    {
        name: 'language.hu',
        SpaceOCR: "hun",
    },
    {
        name: 'language.pl',
        SpaceOCR: "pol",
    },
    {
        name: 'language.pt',
        SpaceOCR: "por",
    },
    {
        name: 'language.slo',
        SpaceOCR: "slv",
    },
    {
        name: 'language.swe',
        SpaceOCR: "swe",
    },
    {
        name: 'language.tr',
        SpaceOCR: "tur",
    },
    {
        name: 'language.hi',
        SpaceOCR: "hin",
    },
    {
        name: 'language.kn',
        SpaceOCR: "kan",
    },
    {
        name: 'language.fa',
        SpaceOCR: "per",
    },
    {
        name: 'language.te',
        SpaceOCR: "tel",
    },
    {
        name: 'language.ta',
        SpaceOCR: "tam",
    },
    {
        name: 'language.vie',
        SpaceOCR: "vie",
    },
]
