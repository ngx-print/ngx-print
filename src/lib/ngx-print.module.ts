import { NgModule } from '@angular/core';
import { NgxPrintDirective } from './ngx-print.directive';

@NgModule({
  imports: [NgxPrintDirective],
  exports: [NgxPrintDirective],
})
export class NgxPrintModule {}
