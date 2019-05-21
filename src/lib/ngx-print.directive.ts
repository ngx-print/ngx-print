import { Directive, HostListener, Input } from "@angular/core";
@Directive({
  selector: "button[ngxPrint]"
})
export class NgxPrintDirective {

  public _printStyle = [];

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input() printSectionId: string;

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input() printTitle: string;

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input() useExistingCss = false;

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input()
  set printStyle(values: { [key: string]: { [key: string]: string } }) {
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
      this._printStyle.push((key + JSON.stringify(values[key])).replace(/['"]+/g, ''));
      }
    }
    this.returnStyleValues();
  }

/**
 *
 *
 * @returns the string that create the stylesheet which will be injected
 * later within <style></style> tag.
 *
 * -join/replace to transform an array objects to css-styled string
 *
 * @memberof NgxPrintDirective
 */
public returnStyleValues() {
  return `<style> ${this._printStyle.join(' ').replace(/,/g,';')} </style>`;
  }

  /**
   *
   *
   * @returns html for the given tag
   *
   * @memberof NgxPrintDirective
   */
  private _styleSheetFile = '';

  /**
   * @memberof NgxPrintDirective
   * @param cssList
   */
  @Input()
  set styleSheetFile(cssList: string) {
    let linkTagFn = cssFileName =>
      `<link rel="stylesheet" type="text/css" href="${cssFileName}">`;
    if (cssList.indexOf(',') !== -1) {
      const valueArr = cssList.split(',');
      for (let val of valueArr) {
        this._styleSheetFile = this._styleSheetFile + linkTagFn(val);
      }
    } else {
      this._styleSheetFile = linkTagFn(cssList);
    }
  }

  /**
   * @returns string which contains the link tags containing the css which will
   * be injected later within <head></head> tag.
   *
   */
  private returnStyleSheetLinkTags() {
    return this._styleSheetFile;
  }
  private getElementTag(tag: keyof HTMLElementTagNameMap): string {
    const html: string[] = [];
    const elements = document.getElementsByTagName(tag);
    for (let index = 0; index < elements.length; index++) {
      html.push(elements[index].outerHTML);
    }
    return html.join('\r\n');
  }


  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @HostListener('click')
  public print(): void {
    let printContents, popupWin, styles = '', links = '';

    if(this.useExistingCss) {
      styles = this.getElementTag('style');
      links = this.getElementTag('link');
    }

    printContents = document.getElementById(this.printSectionId).innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>${this.printTitle ? this.printTitle : ""}</title>
          ${this.returnStyleValues()}
          ${this.returnStyleSheetLinkTags()}
          ${styles}
          ${links}
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }
}
