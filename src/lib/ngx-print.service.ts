import { Service } from '@angular/core';
import { PrintBase, PrintStyleInput } from './ngx-print.base';
import { PrintOptions } from './print-options';

/**
 * Service for handling printing functionality in Angular applications.
 * Extends the base printing class (PrintBase).
 *
 * @export
 * @class NgxPrintService
 * @extends {PrintBase}
 */
@Service()
export class NgxPrintService extends PrintBase {
  /**
   * Emits every time a print job completes.
   *
   * @deprecated The RxJS-based API will be removed in the next major version.
   * Use the Promise returned by {@link NgxPrintService.print} instead, which resolves when that print job completes:
   *
   * ```ts
   * // Before
   * this.printService.printComplete$.pipe(take(1)).subscribe(() => onDone());
   * this.printService.print(options);
   *
   * // After
   * await this.printService.print(options);
   * onDone();
   * // or: this.printService.print(options).then(() => onDone());
   * ```
   *
   * If you still need an Observable, wrap the Promise yourself: `from(this.printService.print(options))`.
   */
  printComplete$ = this.printComplete.asObservable();

  /**
   * Initiates the printing process using the provided print options.
   *
   * @param {PrintOptions} printOptions - Options for configuring the printing process.
   * @memberof NgxPrintService
   * @returns {Promise<void>} Resolves once this print job completes (the print dialog / window was closed).
   * It cannot tell whether the user printed or cancelled, and it never settles if printing
   * could not be started (e.g. blocked popup, missing print section).
   */
  public override print(printOptions?: Partial<PrintOptions>): Promise<void> {
    // Call the print method in the parent class
    return super.print(printOptions);
  }

  /**
   * Sets the print style for the printing process.
   *
   * @param values - Either a dictionary representing the print styles, or a raw CSS string.
   * @memberof NgxPrintService
   * @setter
   */
  set printStyle(values: PrintStyleInput) {
    super.setPrintStyle(values);
  }

  /**
   * Sets the stylesheet file for the printing process.
   *
   * @param {string} cssList - A string representing the path to the stylesheet file.
   * @memberof NgxPrintService
   * @setter
   */
  set styleSheetFile(cssList: string) {
    super.setStyleSheetFile(cssList);
  }
}
