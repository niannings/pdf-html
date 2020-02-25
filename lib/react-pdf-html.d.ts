import { IPdfHtmlParams } from './index';
import { ReactElement } from 'react';
interface IOpenPrinterParams extends Omit<IPdfHtmlParams, 'el'> {
    el: Element;
    component: ReactElement;
    async: boolean;
}
declare function reactPdfHtml({ el, component, styles, async }: IOpenPrinterParams): (isOk: boolean) => boolean;
export default reactPdfHtml;
