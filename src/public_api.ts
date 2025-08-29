/*
 * Public API Surface of ngx-print
 */
export { NgxPrintDirective } from './lib/ngx-print.directive';
export { NgxPrintModule } from './lib/ngx-print.module';
export { NgxPrintService } from './lib/ngx-print.service';
export { PrintOptions } from './lib/print-options';
import { initPrintWindow } from './lib/print-helper';

// Expose globally for popup windows
if (!(window as any).initPrintWindow) {
  (window as any).initPrintWindow = initPrintWindow;
}

// listen for postMessage from child window
window.addEventListener('message', (event: MessageEvent) => {
  if (event.data?.type === 'init-print') {
    initPrintWindow(window, event.data.options);
  }
});
