import { Directive, input, output } from '@angular/core';
import { PrintBase, PrintStyleInput } from './ngx-print.base';
import { PrintOptions } from './print-options';
import { take } from 'rxjs';

@Directive({
  selector: '[ngxPrint]',
  standalone: true,
  host: {
    '(click)': 'print()',
  },
})
export class NgxPrintDirective extends PrintBase {
  /**
   * Prevents the print dialog from opening on the window
   */
  readonly previewOnly = input(false);

  readonly printSectionId = input('');

  readonly printTitle = input('');

  readonly useExistingCss = input(false);

  /**
   * A delay in milliseconds to force the print dialog to wait before opened. Default: 0
   */
  readonly printDelay = input(0);

  /**
   * Whether to close the window after print() returns.
   */
  readonly closeWindow = input(true);

  /**
   * Class attribute to apply to the body element.
   */
  readonly bodyClass = input('');

  /**
   * Which PrintMethod (iframe/window/tab) to use.
   */
  readonly printMethod = input<PrintOptions['printMethod']>('window');

  readonly printStyle = input<PrintStyleInput>({});

  readonly styleSheetFile = input('');

  readonly printCompleted = output<void>();

  public override print(): void {
    // Inputs carry side effects on PrintBase's internal style state, so they're applied
    // synchronously here rather than via effect() (effects shouldn't propagate state).
    super.setPrintStyle(this.printStyle());
    super.setStyleSheetFile(this.styleSheetFile());

    super.print({
      printSectionId: this.printSectionId(),
      printTitle: this.printTitle(),
      useExistingCss: this.useExistingCss(),
      bodyClass: this.bodyClass(),
      printMethod: this.printMethod(),
      previewOnly: this.previewOnly(),
      closeWindow: this.closeWindow(),
      printDelay: this.printDelay(),
    });

    this.printComplete.pipe(take(1)).subscribe(() => {
      this.printCompleted.emit();
    });
  }
}
