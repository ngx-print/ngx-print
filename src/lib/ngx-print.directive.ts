import { Directive, HostListener, Input, output } from '@angular/core';
import { PrintBase } from './ngx-print.base';
import { PrintOptions } from './print-options';
import { take } from 'rxjs';
@Directive({
  selector: '[ngxPrint]',
  standalone: true,
})
export class NgxPrintDirective extends PrintBase {
  private printOptions = new PrintOptions();
  /**
   * Prevents the print dialog from opening on the window
   *
   * @memberof NgxPrintDirective
   */
  @Input() set previewOnly(value: boolean) {
    this.printOptions = { ...this.printOptions, previewOnly: value };
  }

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input() set printSectionId(value: string) {
    this.printOptions = { ...this.printOptions, printSectionId: value };
  }

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input() set printTitle(value: string) {
    this.printOptions = { ...this.printOptions, printTitle: value };
  }

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input() set useExistingCss(value: boolean) {
    this.printOptions = { ...this.printOptions, useExistingCss: value };
  }

  /**
   * A delay in milliseconds to force the print dialog to wait before opened. Default: 0
   *
   * @memberof NgxPrintDirective
   */
  @Input() set printDelay(value: number) {
    this.printOptions = { ...this.printOptions, printDelay: value };
  }

  /**
   * Whether to close the window after print() returns.
   *
   */
  @Input() set closeWindow(value: boolean) {
    this.printOptions = { ...this.printOptions, closeWindow: value };
  }

  /**
   * Class attribute to apply to the body element.
   *
   */
  @Input() set bodyClass(value: string) {
    this.printOptions = { ...this.printOptions, bodyClass: value };
  }

  /**
   * Whether to open a new window or default to new window.
   *
   */
  @Input() set openNewTab(value: boolean) {
    this.printOptions = { ...this.printOptions, openNewTab: value };
  }

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input()
  set printStyle(values: { [key: string]: { [key: string]: string } }) {
    super.setPrintStyle(values);
  }

  /**
   * @memberof NgxPrintDirective
   * @param cssList
   */
  @Input()
  set styleSheetFile(cssList: string) {
    super.setStyleSheetFile(cssList);
  }

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @HostListener('click')
  public print(): void {
    super.print(this.printOptions);
    this.printComplete.pipe(take(1)).subscribe(() => {
      this.printCompleted.emit(undefined);
    });
  }

  readonly printCompleted = output<void>();
}
