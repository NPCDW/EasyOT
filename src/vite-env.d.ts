/// <reference types="vite/client" />
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}

interface SelectOptions {
    label: string | Ref,
    value: string
}