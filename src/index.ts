interface IPrintStyles {
    size?: string;
    margin?: string;
}

interface IPrintPdfParams {
    el: Element | Element[] | NodeListOf<any> | string | string[];
    styles?: IPrintStyles;
}

function printPdf(params: IPrintPdfParams) {
    const { el } = params;
    let domGroup: Element[] = [];

    if (!el) throw new Error('params "el" is required!');

    if (typeof el === 'string') {
        domGroup = Array.from(document.querySelectorAll(el));

        if (!domGroup) {
            throw new Error(`can't find ${el}`);
        }
    } else if (el instanceof Element) {
        domGroup.push(el);
    } else if (el instanceof Array) {
        if (typeof el[0] === 'string') {
            each<string>(<string[]>el, item =>
                (<Array<any>>domGroup).push(
                    ...Array.from(document.querySelectorAll(item))
                )
            );
        } else {
            domGroup = <Element[]>el;
        }
    } else {
        domGroup = Array.from(el);
    }

    // start
    const styleEl = printStart(params, domGroup);

    // print
    window.print();

    // end
    setTimeout(() => printEnd(domGroup, styleEl));
}

export default printPdf;

function printStart(params: IPrintPdfParams, domGroup: Element[]) {
    let isFull: boolean;
    // init styles
    each(domGroup, dom => {
        const nodeName = dom.nodeName.toLowerCase();
        const isFirstLevel =
            dom.parentElement?.nodeName?.toLowerCase() === 'body';

        if (nodeName === 'body' || nodeName === 'html') {
            isFull = true;
        }

        setClassName(dom, true, isFull, isFirstLevel);
    });

    const styleEl = crateStyle(params.styles || {}, isFull);

    document.querySelector('head').appendChild(styleEl);

    return styleEl;
}

function printEnd(domGroup: Element[], styleEl: HTMLStyleElement) {
    // after print
    each(domGroup, dom => setClassName(dom, false));
    styleEl.parentElement.removeChild(styleEl);
}

function setClassName(
    dom: Element,
    isBind: boolean = true,
    isFull: boolean = false,
    isFirstLevel: boolean = false
) {
    if (isFull) return;

    const methodName = isBind ? 'add' : 'remove';
    let pe = dom.parentElement;

    dom.classList[methodName]('is-print');
    // parent is body
    if (isFirstLevel) {
        dom.classList[methodName]('printing');
        each(Array.from(dom.children), item => {
            item.classList[methodName]('is-print');
        });
    }

    while (pe && pe.nodeName.toLowerCase() !== 'body') {
        pe.classList[methodName]('is-print');
        pe.classList[methodName]('printing');
        pe = pe.parentElement;
    }
}

function crateStyle(
    { size = 'A4 portrait', margin = '2cm' }: IPrintStyles,
    isFull: boolean = false
) {
    const styles = `
        @media print {
            @page {
                size: ${size};
                margin: ${margin}
            }
            ${
                isFull
                    ? ''
                    : `
                body > :not(.printing),
                .printing > :not(.is-print) {
                    display: none;
                }`
            }
        }
    `;
    const styleEl = document.createElement('style');

    styleEl.textContent = styles;

    return styleEl;
}

function each<T>(list: T[], cb: (item: T) => any) {
    const len = list.length;
    let i = -1;

    while (++i < len) {
        cb(list[i]);
    }
}
