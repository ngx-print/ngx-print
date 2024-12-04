export class PrintOptions {
  printSectionId: string = '';
  printTitle: string = '';
  useExistingCss: boolean = false;
  bodyClass: string = '';
  openNewTab: boolean = false;
  previewOnly: boolean = false;
  closeWindow: boolean = true;
  printDelay: number = 0;

  constructor(options?: Partial<PrintOptions>) {
    if (options) {
      Object.assign(this, options);
    }
  }
}
