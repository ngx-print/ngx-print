import { PrintOptions } from './print-options';

export function initPrintWindow(windowRef: Window, printOptions: PrintOptions) {
  function triggerPrint() {
    windowRef.removeEventListener('load', triggerPrint, false);
    if (!printOptions.previewOnly) {
      setTimeout(() => {
        windowRef.print();
        if (printOptions.closeWindow) windowRef.close();
      }, printOptions.printDelay || 0);
    }
  }

  function afterPrint() {
    if (windowRef.opener) {
      windowRef.opener.postMessage({ type: 'print-complete' }, '*');
    }
    if (printOptions.closeWindow) windowRef.close();
  }

  windowRef.addEventListener('load', triggerPrint, false);
  windowRef.addEventListener('afterprint', afterPrint, { once: true });
}
