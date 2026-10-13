import { CSP_NONCE, DOCUMENT, inject, Service } from '@angular/core';
import { Subject } from 'rxjs';
import { PrintOptions } from './print-options';

/** For example:
 * {
 *     'h2': { 'border': 'solid 1px' },
 *     'h1': { 'color': 'red', 'border': '1px solid' },
 *   */
export type PrintStyle = Record<string, Record<string, string>>;

/**
 * Either a {@link PrintStyle} object, or a raw CSS string (e.g. `'h1 { color: red; }'`)
 * to be injected into the print document's <style> tag as-is.
 */
export type PrintStyleInput = PrintStyle | string;

/** Everything copied from the host document into the print document. */
interface DocumentComponents {
  styles: string;
  links: string;
  baseTag: string;
  printContents: string | null;
}

/**
 * A document to print into, plus the parts of printing that differ per print method.
 * Completion detection is wired up by the factory that creates the target.
 */
interface PrintTarget {
  doc: Document;
  /** Runs `callback` once the written document has loaded. */
  onLoad(callback: () => void): void;
  /** Opens the print dialog. */
  print(): void;
}

@Service()
export class PrintBase {
  private document = inject(DOCUMENT);
  private nonce = inject(CSP_NONCE, { optional: true });

  private _iframeElement: HTMLIFrameElement | undefined;
  private _printStyle: string[] = [];
  private _styleSheetFile = '';
  protected printComplete = new Subject<void>();

  //#region Getters and Setters
  /**
   * Sets the print styles based on the provided values.
   *
   * @param values - Either a key-value pairs object representing print styles, or a raw CSS string.
   * @protected
   */
  protected setPrintStyle(values: PrintStyleInput) {
    if (typeof values === 'string') {
      this._printStyle = values ? [values] : [];
      return;
    }

    this._printStyle = [];
    for (const [selector, declarations] of Object.entries(values)) {
      // Built declaration-by-declaration (rather than via JSON.stringify + a quote-stripping
      // regex) so that quotes and commas that are part of a CSS value (e.g. quoted font names,
      // comma-separated font-family fallback lists) survive instead of being stripped/mangled.
      const body = Object.entries(declarations)
        .map(([property, value]) => `${property}:${value}`)
        .join(';');
      this._printStyle.push(`${selector}{${body}}`);
    }
  }

  /**
   * @returns the string that create the stylesheet which will be injected
   * later within <style></style> tag.
   */
  public returnStyleValues(): string {
    const styleNonce = this.nonce ? ` nonce="${this.nonce}"` : '';
    return `<style${styleNonce}> ${this._printStyle.join(' ')} </style>`;
  }

  /**
   * @returns string which contains the link tags containing the css which will
   * be injected later within <head></head> tag.
   *
   */
  private returnStyleSheetLinkTags(): string {
    return this._styleSheetFile;
  }

  /**
   * Sets the style sheet file based on the provided CSS list.
   *
   * @param {string} cssList - CSS file or list of CSS files.
   * @protected
   */
  // prettier-ignore
  protected setStyleSheetFile(cssList: string): void {
    if (!cssList) {
      this._styleSheetFile = '';
      return;
    }
    const files = cssList.split(',').map(f => f.trim());
    const nonceAttr = this.nonce ? ` nonce="${this.nonce}"` : '';
    this._styleSheetFile = files
      .map(url => `<link${nonceAttr} rel="stylesheet" type="text/css" href="${url}">`)
      .join('');
  }

  //#endregion

  //#region Private methods used by PrintBase

  private syncFormValues(source: HTMLElement, clone: HTMLElement): void {
    // Select all form elements
    const selector = 'input, select, textarea';
    const sourceEls = source.querySelectorAll(selector);
    const cloneEls = clone.querySelectorAll(selector);

    for (let i = 0; i < sourceEls.length; i++) {
      const srcNode = sourceEls[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const cloneNode = cloneEls[i] as typeof srcNode;

      if (srcNode instanceof HTMLInputElement) {
        if (srcNode.type === 'checkbox' || srcNode.type === 'radio') {
          if (srcNode.checked) cloneNode.setAttribute('checked', '');
          else cloneNode.removeAttribute('checked'); // Remove if unchecked
        } else if (srcNode.type === 'file') {
          // File inputs can't be set programmatically for security
          continue;
        } else {
          cloneNode.setAttribute('value', srcNode.value);
        }
      } else if (srcNode instanceof HTMLTextAreaElement) {
        cloneNode.textContent = srcNode.value; // Use textContent, not innerHTML
      } else if (srcNode instanceof HTMLSelectElement) {
        Array.from((cloneNode as HTMLSelectElement).options).forEach((opt, idx) => {
          if (idx === srcNode.selectedIndex) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected'); // Remove from non-selected
          }
        });
      }
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
    } catch (err) {
      console.warn(`Canvas conversion failed for ${canvasElm}. Likely the canvas is tainted:`, err);
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

    this.syncFormValues(sourceElm, cloneElm);
    this.updateCanvasToImage(sourceElm, cloneElm);

    return cloneElm.outerHTML;
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
    for (const el of Array.from(elements)) {
      html.push((el as Element).outerHTML);
    }
    return html.join('\r\n');
  }

  //#endregion

  /**
   * Prints the specified content using the provided print options.
   *
   * @public
   * @param printOptionInput - Options for printing.
   * @returns a Promise that resolves once this print job completes (the print dialog / window was closed).
   * It never settles if printing could not be started, or with `previewOnly` in iframe mode.
   */
  protected print(printOptionInput?: Partial<PrintOptions>): Promise<void> {
    const printOptions = new PrintOptions(printOptionInput);
    return new Promise<void>(resolve => {
      const onComplete = () => {
        this.printComplete.next(); // legacy
        resolve();
      };

      // Collected before any window/iframe is created, so a missing section never leaves an empty popup behind.
      const components = this.prepareDocumentComponents(printOptions);
      if (!components.printContents) {
        console.error(`Print section with id "${printOptions.printSectionId}" not found.`);
        return;
      }

      const target = printOptions.printMethod === 'iframe' ? this.createIframeTarget(printOptions, onComplete) : this.createWindowTarget(printOptions, onComplete);
      if (target) {
        this.runPrint(target, printOptions, components);
      }
    });
  }

  /**
   * The steps shared by every print method: write the document, wait for it to load,
   * then open the print dialog after `printDelay` (unless `previewOnly`).
   */
  private runPrint(target: PrintTarget, printOptions: PrintOptions, components: DocumentComponents): void {
    target.doc.open();
    this.buildPrintDocument(target.doc, printOptions, components);
    target.doc.close();

    target.onLoad(() => {
      if (printOptions.previewOnly) return;
      setTimeout(() => target.print(), printOptions.printDelay || 0);
    });
  }

  private createWindowTarget(printOptions: PrintOptions, onComplete: () => void): PrintTarget | null {
    // An empty features string makes the browser open a new tab instead of a popup window.
    const popOut = printOptions.printMethod === 'tab' ? '' : 'top=0,left=0,height=auto,width=auto';
    const popupWin = window.open('', '_blank', popOut);

    if (!popupWin) {
      // the popup window could not be opened.
      console.error('Could not open print window.');
      return null;
    }

    // Started right away (not when printing) so that closing a previewOnly window also completes.
    const checkClosedInterval = setInterval(() => {
      if (popupWin.closed) {
        clearInterval(checkClosedInterval);
        onComplete();
      }
    }, 500);

    return {
      doc: popupWin.document,
      onLoad: callback => popupWin.addEventListener('load', callback),
      print: () => {
        popupWin.print();
        if (printOptions.closeWindow) popupWin.close();
      },
    };
  }

  private createIframeTarget(printOptions: PrintOptions, onComplete: () => void): PrintTarget | null {
    this._iframeElement?.remove();
    this._iframeElement = this.document.createElement('iframe');
    const iframe = this._iframeElement;
    iframe.id = 'print-iframe-' + new Date().getTime();
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.ariaHidden = 'true';

    this.document.body.appendChild(iframe);

    const printWindow = iframe.contentWindow;
    const iframeDoc = iframe.contentDocument || printWindow?.document;
    if (!printWindow || !iframeDoc) {
      console.error('Could not access iframe document.');
      iframe.remove();
      return null;
    }

    return {
      doc: iframeDoc,
      onLoad: callback => (iframe.onload = callback),
      print: () => {
        // Browsers derive the suggested "Save as PDF" filename from the host page's
        // document.title, not the iframe's own <title> (unlike window/tab printing, where the popup/tab is itself the top-level context).
        // Swap it temporarily so printTitle is used as the suggested filename here too, restoring it once printing is done.
        const originalTitle = this.document.title;
        if (printOptions.printTitle) {
          this.document.title = printOptions.printTitle;
        }

        // Registered BEFORE print() is called: window.print() blocks script execution.
        // Registered only now (not at creation) so that printing the host page while a previewOnly iframe exists doesn't count as completion.
        const mediaQueryList = printWindow.matchMedia('print');
        const listener = (mql: MediaQueryListEvent) => {
          if (!mql.matches) {
            this.document.title = originalTitle;
            onComplete();
            mediaQueryList.removeEventListener('change', listener);
          }
        };
        mediaQueryList.addEventListener('change', listener);

        printWindow.focus();
        printWindow.print();
      },
    };
  }

  private prepareDocumentComponents(printOptions: PrintOptions): DocumentComponents {
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

  private buildPrintDocument(doc: Document, printOptions: PrintOptions, components: DocumentComponents): void {
    const html = doc.createElement('html');
    const head = doc.createElement('head');
    const body = doc.createElement('body');

    // Set title
    const title = doc.createElement('title');
    title.textContent = printOptions.printTitle || '';
    head.appendChild(title);

    // Add all head content
    if (components.baseTag) {
      head.innerHTML += components.baseTag;
    }
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
  }
}
