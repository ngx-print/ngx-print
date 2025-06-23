import { CSP_NONCE, Inject, Injectable, Optional } from '@angular/core';
import { PrintOptions } from './print-options';

@Injectable({
  providedIn: 'root',
})
export class PrintBase {
  private _printStyle: string[] = [];
  private _styleSheetFile: string = '';

  constructor(@Inject(CSP_NONCE) @Optional() private nonce?: string | null) {}

  //#region Getters and Setters
  /**
   * Sets the print styles based on the provided values.
   *
   * @param {Object} values - Key-value pairs representing print styles.
   * @protected
   */
  protected setPrintStyle(values: { [key: string]: { [key: string]: string } }) {
    this._printStyle = [];
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        this._printStyle.push((key + JSON.stringify(values[key])).replace(/['"]+/g, ''));
      }
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
    const linkTagFn = function (cssFileName: string) {
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
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
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
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const selectedIdx = element.selectedIndex;
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
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element['defaultValue'] = element.value;
    }
  }

  /**
   * Converts a canvas element to an image and returns its HTML string.
   *
   * @param {HTMLCanvasElement} element - The canvas element to convert.
   * @returns {string} - HTML string of the image.
   * @private
   */
  private canvasToImageHtml(element: HTMLCanvasElement): string {
    const dataUrl = element.toDataURL();
    return `<img src="${dataUrl}" style="max-width: 100%;">`;
  }

  /**
   * Includes canvas contents in the print section via img tags.
   *
   * @param {HTMLCollectionOf<HTMLCanvasElement>} elements - Collection of canvas elements.
   * @private
   */
  private updateCanvasToImage(elements: HTMLCollectionOf<HTMLCanvasElement>): void {
    for (let i = 0; i < elements.length; i++) {
      const element = this.canvasToImageHtml(elements[i]);
      elements[i].insertAdjacentHTML('afterend', element);
      elements[i].remove();
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
    const printContents = document.getElementById(printSectionId);
    if (!printContents) return null;

    const inputEls = printContents.getElementsByTagName('input');
    const selectEls = printContents.getElementsByTagName('select');
    const textAreaEls = printContents.getElementsByTagName('textarea');
    const canvasEls = printContents.getElementsByTagName('canvas');

    this.updateInputDefaults(inputEls);
    this.updateSelectDefaults(selectEls);
    this.updateTextAreaDefaults(textAreaEls);
    this.updateCanvasToImage(canvasEls);

    return printContents.innerHTML;
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
    const elements = document.getElementsByTagName(tag);
    for (let index = 0; index < elements.length; index++) {
      html.push(elements[index].outerHTML);
    }
    return html.join('\r\n');
  }
  //#endregion

  /**
   * Prints the specified content using the provided print options.
   *
   * @param {PrintOptions} printOptions - Options for printing.
   * @public
   */
  protected print(printOptions: PrintOptions): void {
    let styles = '',
      links = '',
      popOut = 'top=0,left=0,height=auto,width=auto';
    const baseTag = this.getElementTag('base');

    if (printOptions.useExistingCss) {
      styles = this.getElementTag('style');
      links = this.getElementTag('link');
    }

    // If the openNewTab option is set to true, then set the popOut option to an empty string.
    // This will cause the print dialog to open in a new tab.
    if (printOptions.openNewTab) {
      popOut = '';
    }

    const printContents = this.getHtmlContents(printOptions.printSectionId);
    if (!printContents) {
      // Handle the case where the specified print section is not found.
      console.error(`Print section with id ${printOptions.printSectionId} not found.`);
      return;
    }

    const popupWin = window.open('', '_blank', popOut);

    if (!popupWin) {
      // the popup window could not be opened.
      console.error('Could not open print window.');
      return;
    }

    popupWin.document.open();

    // Create the HTML structure
    const doc = popupWin.document;

    // Set up the basic HTML structure
    const html = doc.createElement('html');
    const head = doc.createElement('head');
    const body = doc.createElement('body');

    // Set title
    const title = doc.createElement('title');
    title.textContent = printOptions.printTitle || '';
    head.appendChild(title);

    // Add base tag, styles, and links
    if (baseTag) {
      head.innerHTML += baseTag;
    }
    head.innerHTML += this.returnStyleValues();
    head.innerHTML += this.returnStyleSheetLinkTags();
    head.innerHTML += styles;
    head.innerHTML += links;

    // Set body class if provided
    if (printOptions.bodyClass) {
      body.className = printOptions.bodyClass;
    }

    // Insert print contents
    body.innerHTML += printContents;

    // Add script
    const script = doc.createElement('script');
    script.defer = true;

    if (this.nonce) {
      script.setAttribute('nonce', this.nonce);
    }

    script.textContent = `
  function triggerPrint(event) {
    window.removeEventListener('load', triggerPrint, false);
    ${
      printOptions.previewOnly
        ? ''
        : `setTimeout(function() {
      closeWindow(window.print());
    }, ${printOptions.printDelay});`
    }
  }
  function closeWindow(){
    ${printOptions.closeWindow ? 'window.close();' : ''}
  }
  window.addEventListener('load', triggerPrint, false);
`;
    body.appendChild(script);

    // Assemble the document
    html.appendChild(head);
    html.appendChild(body);
    doc.appendChild(html);

    popupWin.document.close();
  }
}
