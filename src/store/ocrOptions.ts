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

const { t } = i18n.global

const ocrProvide = {
    BaiduCloud: t('ocrOptions.BaiduCloud'),
    TencentCloud: t('ocrOptions.TencentCloud'),
    SpaceOCR: "SpaceOCR",
}

const ocrMode: OcrModeType = {
    "BaiduCloud": {
        "general_basic": t('ocrOptions.GeneralBasicOCR'),
        "accurate_basic": t('ocrOptions.GeneralAccurateOCR'),
        "handwriting": t('ocrOptions.GeneralHandwritingOCR'),
    },
    "TencentCloud": {
        "GeneralBasicOCR": t('ocrOptions.GeneralBasicOCR'),
        "GeneralAccurateOCR": t('ocrOptions.GeneralAccurateOCR'),
        "GeneralHandwritingOCR": t('ocrOptions.GeneralHandwritingOCR'),
    },
    "SpaceOCR": {
        "1": t('ocrOptions.engine1'),
        "2": t('ocrOptions.engine2'),
        "3": t('ocrOptions.engine3'),
        "5": t('ocrOptions.engine5'),
    },
}

const ocrLanguage: OcrLanguageType[] = [
    {
        name: t('language.auto'),
        BaiduCloud: "auto",
        TencentCloud: "auto",
    },
    {
        name: t('language.en'),
        SpaceOCR: "eng",
    },
    {
        name: t('language.zh'),
        SpaceOCR: "chs",
    },
    {
        name: t('language.cht'),
        SpaceOCR: "cht",
    },
    {
        name: t('language.jp'),
        SpaceOCR: "jpn",
    },
    {
        name: t('language.kor'),
        SpaceOCR: "kor",
    },
    {
        name: t('language.fra'),
        SpaceOCR: "fre",
    },
    {
        name: t('language.spa'),
        SpaceOCR: "spa",
    },
    {
        name: t('language.th'),
        SpaceOCR: "tai",
    },
    {
        name: t('language.ara'),
        SpaceOCR: "ara",
    },
    {
        name: t('language.ru'),
        SpaceOCR: "rus",
    },
    {
        name: t('language.bul'),
        SpaceOCR: "bul",
    },
    {
        name: t('language.hr'),
        SpaceOCR: "hrv",
    },
    {
        name: t('language.cs'),
        SpaceOCR: "cze",
    },
    {
        name: t('language.dan'),
        SpaceOCR: "dan",
    },
    {
        name: t('language.nl'),
        SpaceOCR: "dut",
    },
    {
        name: t('language.it'),
        SpaceOCR: "ita",
    },
    {
        name: t('language.fin'),
        SpaceOCR: "fin",
    },
    {
        name: t('language.de'),
        SpaceOCR: "ger",
    },
    {
        name: t('language.el'),
        SpaceOCR: "gre",
    },
    {
        name: t('language.hu'),
        SpaceOCR: "hun",
    },
    {
        name: t('language.pl'),
        SpaceOCR: "pol",
    },
    {
        name: t('language.pt'),
        SpaceOCR: "por",
    },
    {
        name: t('language.slo'),
        SpaceOCR: "slv",
    },
    {
        name: t('language.swe'),
        SpaceOCR: "swe",
    },
    {
        name: t('language.tr'),
        SpaceOCR: "tur",
    },
    {
        name: t('language.hi'),
        SpaceOCR: "hin",
    },
    {
        name: t('language.kn'),
        SpaceOCR: "kan",
    },
    {
        name: t('language.fa'),
        SpaceOCR: "per",
    },
    {
        name: t('language.te'),
        SpaceOCR: "tel",
    },
    {
        name: t('language.ta'),
        SpaceOCR: "tam",
    },
    {
        name: t('language.vie'),
        SpaceOCR: "vie",
    },
]
