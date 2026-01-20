import { CSP_NONCE, DOCUMENT, inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PrintOptions } from './print-options';

@Injectable({
  providedIn: 'root',
})
export class PrintBase {
  private document = inject(DOCUMENT);
  private nonce = inject(CSP_NONCE, { optional: true });

  private _iframeElement: HTMLIFrameElement | undefined;
  private _printStyle: string[] = [];
  private _styleSheetFile: string = '';
  protected printComplete = new Subject<void>();

  //#region Getters and Setters
  /**
   * Sets the print styles based on the provided values.
   *
   * @param {Object} values - Key-value pairs representing print styles.
   * @protected
   */
  protected setPrintStyle(values: { [key: string]: { [key: string]: string } }) {
    this._printStyle = [];
    for (const key of Object.keys(values)) {
      this._printStyle.push((key + JSON.stringify(values[key])).replace(/['"]+/g, ''));
    }
  }

  /**
   *
   *
   * @returns the string that create the stylesheet which will be injected
   * later within <style></style> tag.
   *
   * -join/replace to transform an array objects to css-styled string
   */
  public returnStyleValues() {
    const styleNonce = this.nonce ? ` nonce="${this.nonce}"` : '';
    return `<style${styleNonce}> ${this._printStyle.join(' ').replace(/,/g, ';')} </style>`;
  }

  /**
   * @returns string which contains the link tags containing the css which will
   * be injected later within <head></head> tag.
   *
   */
  private returnStyleSheetLinkTags() {
    return this._styleSheetFile;
  }

  /**
   * Sets the style sheet file based on the provided CSS list.
   *
   * @param {string} cssList - CSS file or list of CSS files.
   * @protected
   */
  protected setStyleSheetFile(cssList: string) {
    const linkTagFn = (cssFileName: string) => {
      return `<link rel="stylesheet" type="text/css" href="${cssFileName}">`;
    };

    if (cssList.indexOf(',') !== -1) {
      const valueArr = cssList.split(',');
      this._styleSheetFile = valueArr.map(val => linkTagFn(val)).join('');
    } else {
      this._styleSheetFile = linkTagFn(cssList);
    }
  }

  //#endregion

  //#region Private methods used by PrintBase

  /**
   * Updates the default values for input elements.
   *
   * @param {HTMLCollectionOf<HTMLInputElement>} elements - Collection of input elements.
   * @private
   */
  private updateInputDefaults(elements: HTMLCollectionOf<HTMLInputElement>): void {
    for (const element of Array.from(elements)) {
      element['defaultValue'] = element.value;
      if (element['checked']) element['defaultChecked'] = true;
    }
  }

  /**
   * Updates the default values for select elements.
   *
   * @param {HTMLCollectionOf<HTMLSelectElement>} elements - Collection of select elements.
   * @private
   */
  private updateSelectDefaults(elements: HTMLCollectionOf<HTMLSelectElement>): void {
    for (const element of Array.from(elements)) {
      const selectedIdx = element.selectedIndex;
      if (selectedIdx < 0 || selectedIdx >= element.options.length) continue;
      const selectedOption: HTMLOptionElement = element.options[selectedIdx];

      selectedOption.defaultSelected = true;
    }
  }

  /**
   * Updates the default values for textarea elements.
   *
   * @param {HTMLCollectionOf<HTMLTextAreaElement>} elements - Collection of textarea elements.
   * @private
   */
  private updateTextAreaDefaults(elements: HTMLCollectionOf<HTMLTextAreaElement>): void {
    for (const element of Array.from(elements)) {
      element['defaultValue'] = element.value;
    }
  }

  /**
   * Converts a canvas element to an image and returns its HTML string.
   *
   * @param {HTMLCanvasElement} canvasElm - The canvas element to convert.
   * @returns {HTMLImageElement | null} - HTML Element of the image.
   * @private
   */
  private canvasToImageHtml(canvasElm: HTMLCanvasElement): HTMLImageElement | null {
    try {
      const dataUrl = canvasElm.toDataURL(); // may throw if canvas is tainted
      const img = this.document.createElement('img');
      img.src = dataUrl;
      img.style.maxWidth = '100%';

      // Preserve displayed size (not just bitmap size)
      const rect = canvasElm.getBoundingClientRect();
      if (rect.width) img.style.width = `${rect.width}px`;
      if (rect.height) img.style.height = `${rect.height}px`;

      return img;
    } catch {
      // If toDataURL() fails (e.g., tainted canvas), keep canvas as-is in print output
      return null;
    }
  }

  /**
   * Includes canvas contents in the print section via img tags.
   *
   * @private
   * @param source
   * @param clone
   */
  private updateCanvasToImage(source: HTMLElement, clone: HTMLElement): void {
    const sourceCanvases = source.querySelectorAll('canvas');
    const cloneCanvases = clone.querySelectorAll('canvas');

    for (let i = 0; i < sourceCanvases.length; i++) {
      const srcCanvas = sourceCanvases[i];
      const cloneCanvas = cloneCanvases[i];
      const img = this.canvasToImageHtml(srcCanvas);
      if (img) {
        cloneCanvas.replaceWith(img);
      }
    }
  }

  /**
   * Retrieves the HTML content of a specified printing section.
   *
   * @param {string} printSectionId - Id of the printing section.
   * @returns {string | null} - HTML content of the printing section, or null if not found.
   * @private
   */
  private getHtmlContents(printSectionId: string): string | null {
    const sourceElm = this.document.getElementById(printSectionId);
    if (!sourceElm) return null;

    const cloneElm = sourceElm.cloneNode(true) as HTMLElement; // cloneNode(true) deep clones subtree

    const inputEls = sourceElm.getElementsByTagName('input');
    const selectEls = sourceElm.getElementsByTagName('select');
    const textAreaEls = sourceElm.getElementsByTagName('textarea');

    // todo
    //this.updateInputDefaults(inputEls);
    //this.updateSelectDefaults(selectEls);
    //this.updateTextAreaDefaults(textAreaEls);
    this.updateCanvasToImage(sourceElm, cloneElm);

    return cloneElm.innerHTML;
  }

  /**
   * Retrieves the HTML content of elements with the specified tag.
   *
   * @param {keyof HTMLElementTagNameMap} tag - HTML tag name.
   * @returns {string} - Concatenated outerHTML of elements with the specified tag.
   * @private
   */
  private getElementTag(tag: keyof HTMLElementTagNameMap): string {
    const html: string[] = [];
    const elements = this.document.getElementsByTagName(tag);
    for (let index = 0; index < elements.length; index++) {
      html.push(elements[index].outerHTML);
    }
    return html.join('\r\n');
  }

  //#endregion

  protected notifyPrintComplete() {
    this.printComplete.next();
  }

  /**
   * Prints the specified content using the provided print options.
   *
   * @public
   * @param printOptionInput - Options for printing.
   */
  protected print(printOptionInput?: Partial<PrintOptions>): void {
    const printOptions = new PrintOptions(printOptionInput);
    if (printOptions.printMethod === 'iframe') {
      this.printWithIframe(printOptions);
    } else {
      this.printWithWindow(printOptions);
    }
  }

  protected printWithWindow(printOptions: PrintOptions) {
    // If the openNewTab option is set to true, then set the popOut option to an empty string
    // This will cause the print dialog to open in a new tab.
    const popOut = printOptions.printMethod === 'tab' ? '' : 'top=0,left=0,height=auto,width=auto';

    const popupWin = window.open('', '_blank', popOut);

    if (!popupWin) {
      // the popup window could not be opened.
      console.error('Could not open print window.');
      return;
    }

    popupWin.document.open();
    // Create the HTML structure
    this.buildPrintDocument(popupWin.document, printOptions);

    popupWin.document.close();

    // Listen for the window closing
    const checkClosedInterval = setInterval(() => {
      if (popupWin.closed) {
        clearInterval(checkClosedInterval);
        this.notifyPrintComplete();
      }
    }, 500);

    popupWin.addEventListener('load', () => {
      if (!printOptions.previewOnly) {
        setTimeout(() => {
          popupWin.print();
          if (printOptions.closeWindow) popupWin.close();
        }, printOptions.printDelay || 0);
      }
    });
  }

  private printWithIframe(printOptions: PrintOptions): void {
    if (this._iframeElement) {
      this._iframeElement.remove();
    }
    this._iframeElement = this.document.createElement('iframe');
    const iframe = this._iframeElement;
    iframe.id = 'print-iframe-' + new Date().getTime();
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.style.width = '0px';
    iframe.style.height = '0px';

    this.document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      console.error('Could not access iframe document.');
      this.document.body.removeChild(iframe);
      return;
    }

    iframeDoc.open();
    const success = this.buildPrintDocument(iframeDoc, printOptions);
    if (!success) {
      iframeDoc.close();
      this.document.body.removeChild(iframe);
      return;
    }
    iframeDoc.close();

    iframe.onload = () => {
      const printWindow = iframe.contentWindow;
      if (!printWindow) {
        console.error('Could not access iframe window.');
        this.document.body.removeChild(iframe);
        return;
      }

      setTimeout(() => {
        if (printOptions.previewOnly) {
          return;
        }
        printWindow.focus();
        printWindow.print();

        const mediaQueryList = printWindow.matchMedia('print');
        const listener = (mql: MediaQueryListEvent | MediaQueryList) => {
          if (!mql.matches) {
            this.notifyPrintComplete();
            mediaQueryList.removeEventListener('change', listener);
          }
        };

        mediaQueryList.addEventListener('change', listener);
      }, printOptions.printDelay || 0);
    };
  }

  private prepareDocumentComponents(printOptions: PrintOptions) {
    let styles = '';
    let links = '';
    const baseTag = this.getElementTag('base');

    if (printOptions.useExistingCss) {
      styles = this.getElementTag('style');
      links = this.getElementTag('link');
    }

    const printContents = this.getHtmlContents(printOptions.printSectionId);

    return { styles, links, baseTag, printContents };
  }

  private buildPrintDocument(doc: Document, printOptions: PrintOptions): boolean {
    const components = this.prepareDocumentComponents(printOptions);

    if (!components.printContents) {
      console.error(`Print section with id "${printOptions.printSectionId}" not found.`);
      return false;
    }

    const html = doc.createElement('html');
    const head = doc.createElement('head');
    const body = doc.createElement('body');

    // Set title
    const title = doc.createElement('title');
    title.textContent = printOptions.printTitle || '';
    head.appendChild(title);

    // Add all head content
    if (components.baseTag) head.innerHTML += components.baseTag;
    head.innerHTML += this.returnStyleValues();
    head.innerHTML += this.returnStyleSheetLinkTags();
    head.innerHTML += components.styles;
    head.innerHTML += components.links;

    // Set body class and content
    if (printOptions.bodyClass) body.className = printOptions.bodyClass;
    body.innerHTML += components.printContents;

    // Assemble document
    html.appendChild(head);
    html.appendChild(body);
    doc.appendChild(html);

    return true;
  }
}
