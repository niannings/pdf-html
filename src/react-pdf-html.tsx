import pdfHtml, { IPdfHtmlParams } from './index';
import React, { Component, ReactElement, createRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

interface IOpenPrinterParams extends Omit<IPdfHtmlParams, 'el'> {
    el: Element;
    component: ReactElement;
    async: boolean;
}

function reactPdfHtml({
    el,
    component,
    styles,
    async = false
}: IOpenPrinterParams) {
    const div = document.createElement('div');
    const start = (isOk: boolean) => {
        if (isOk) {
            open({ el, styles, html: div });

            return true;
        }

        return false;
    };

    render(component, div);

    if (async) {
        return start;
    }

    setTimeout(() => start(true));

    return null;
}

interface IPdfContainerProps
    extends Omit<IOpenPrinterParams, 'component' | 'async'> {
    html: Element;
}

function open(params: IPdfContainerProps) {
    const { el } = params;

    render(<PdfContainer {...params}></PdfContainer>, el);

    setTimeout(() => {
        unmountComponentAtNode(el);
        el.parentNode?.removeChild(el);
    });
}

class PdfContainer extends Component<IPdfContainerProps> {
    htmlRef = createRef<HTMLDivElement>();
    componentDidMount() {
        const { el, styles, html } = this.props;
        this.htmlRef.current?.append(html);

        pdfHtml({ el, styles });
    }

    render() {
        return <div ref={this.htmlRef}></div>;
    }
}

export default reactPdfHtml;
