/// <reference types="vite/client" />
declare module 'jspdf' {
    declare interface jsPDF {
        getPageWidth(page: number): number
        getPageHeight(page: number): number
    }
}