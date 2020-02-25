interface IPrintStyles {
    size?: string;
    margin?: string;
}
export interface IPdfHtmlParams {
    el: Element | Element[] | NodeListOf<Element> | string | string[];
    styles?: IPrintStyles;
}
declare function pdfHtml(params: IPdfHtmlParams): void;
export default pdfHtml;
