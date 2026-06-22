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
  printComplete$ = this.printComplete.asObservable();

  /**
   * Initiates the printing process using the provided print options.
   *
   * @param {PrintOptions} printOptions - Options for configuring the printing process.
   * @memberof NgxPrintService
   * @returns {void}
   */
  public override print(printOptions?: Partial<PrintOptions>): void {
    // Call the print method in the parent class
    super.print(printOptions);
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
