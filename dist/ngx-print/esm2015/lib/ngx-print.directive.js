/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
export class NgxPrintDirective {
    constructor() {
        this._printStyle = [];
        /**
         *
         *
         * \@memberof NgxPrintDirective
         */
        this.useExistingCss = false;
        /**
         * A delay in milliseconds to force the print dialog to wait before opened. Default: 0
         *
         * \@memberof NgxPrintDirective
         */
        this.printDelay = 0;
        /**
         *
         *
         * @return html for the given tag
         *
         * \@memberof NgxPrintDirective
         */
        this._styleSheetFile = '';
    }
    /**
     *
     *
     * \@memberof NgxPrintDirective
     * @param {?} values
     * @return {?}
     */
    set printStyle(values) {
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
     * \@memberof NgxPrintDirective
     * @return {?} the string that create the stylesheet which will be injected
     * later within <style></style> tag.
     *
     * -join/replace to transform an array objects to css-styled string
     *
     */
    returnStyleValues() {
        return `<style> ${this._printStyle.join(' ').replace(/,/g, ';')} </style>`;
    }
    /**
     * \@memberof NgxPrintDirective
     * @param {?} cssList
     * @return {?}
     */
    set styleSheetFile(cssList) {
        /** @type {?} */
        let linkTagFn = (/**
         * @param {?} cssFileName
         * @return {?}
         */
        function (cssFileName) {
            return `<link rel="stylesheet" type="text/css" href="${cssFileName}">`;
        });
        if (cssList.indexOf(',') !== -1) {
            /** @type {?} */
            const valueArr = cssList.split(',');
            for (let val of valueArr) {
                this._styleSheetFile = this._styleSheetFile + linkTagFn(val);
            }
        }
        else {
            this._styleSheetFile = linkTagFn(cssList);
        }
    }
    /**
     * @private
     * @return {?} string which contains the link tags containing the css which will
     * be injected later within <head></head> tag.
     *
     */
    returnStyleSheetLinkTags() {
        return this._styleSheetFile;
    }
    /**
     * @private
     * @param {?} tag
     * @return {?}
     */
    getElementTag(tag) {
        /** @type {?} */
        const html = [];
        /** @type {?} */
        const elements = document.getElementsByTagName(tag);
        for (let index = 0; index < elements.length; index++) {
            html.push(elements[index].outerHTML);
        }
        return html.join('\r\n');
    }
    /**
     * @private
     * @return {?} html section to be printed along with some associated inputs
     *
     */
    getHtmlContents() {
        /** @type {?} */
        let printContents = document.getElementById(this.printSectionId);
        /** @type {?} */
        let innards = printContents.getElementsByTagName('input');
        for (var i = 0; i < innards.length; i++) {
            innards[i].defaultValue = innards[i].value;
        }
        return printContents.innerHTML;
    }
    /**
     *
     *
     * \@memberof NgxPrintDirective
     * @return {?}
     */
    print() {
        /** @type {?} */
        let printContents;
        /** @type {?} */
        let popupWin;
        /** @type {?} */
        let styles = '';
        /** @type {?} */
        let links = '';
        /** @type {?} */
        const baseTag = this.getElementTag('base');
        if (this.useExistingCss) {
            styles = this.getElementTag('style');
            links = this.getElementTag('link');
        }
        printContents = this.getHtmlContents();
        popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>${this.printTitle ? this.printTitle : ""}</title>
          ${baseTag}
          ${this.returnStyleValues()}
          ${this.returnStyleSheetLinkTags()}
          ${styles}
          ${links}
        </head>
        <body>
          ${printContents}
          <script defer>
            function triggerPrint(event) {
              window.removeEventListener('load', triggerPrint, false);
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 0);
              }, ${this.printDelay});
            }
            window.addEventListener('load', triggerPrint, false);
          </script>
        </body>
      </html>`);
        popupWin.document.close();
    }
}
NgxPrintDirective.decorators = [
    { type: Directive, args: [{
                selector: "button[ngxPrint]"
            },] }
];
NgxPrintDirective.propDecorators = {
    printSectionId: [{ type: Input }],
    printTitle: [{ type: Input }],
    useExistingCss: [{ type: Input }],
    printDelay: [{ type: Input }],
    printStyle: [{ type: Input }],
    styleSheetFile: [{ type: Input }],
    print: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    NgxPrintDirective.prototype._printStyle;
    /**
     *
     *
     * \@memberof NgxPrintDirective
     * @type {?}
     */
    NgxPrintDirective.prototype.printSectionId;
    /**
     *
     *
     * \@memberof NgxPrintDirective
     * @type {?}
     */
    NgxPrintDirective.prototype.printTitle;
    /**
     *
     *
     * \@memberof NgxPrintDirective
     * @type {?}
     */
    NgxPrintDirective.prototype.useExistingCss;
    /**
     * A delay in milliseconds to force the print dialog to wait before opened. Default: 0
     *
     * \@memberof NgxPrintDirective
     * @type {?}
     */
    NgxPrintDirective.prototype.printDelay;
    /**
     *
     *
     * \@return html for the given tag
     *
     * \@memberof NgxPrintDirective
     * @type {?}
     * @private
     */
    NgxPrintDirective.prototype._styleSheetFile;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXByaW50LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wcmludC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtcHJpbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJL0QsTUFBTSxPQUFPLGlCQUFpQjtJQUg5QjtRQUtTLGdCQUFXLEdBQUcsRUFBRSxDQUFDOzs7Ozs7UUFxQmYsbUJBQWMsR0FBRyxLQUFLLENBQUM7Ozs7OztRQU92QixlQUFVLEdBQVcsQ0FBQyxDQUFDOzs7Ozs7OztRQXNDeEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7SUErRi9CLENBQUM7Ozs7Ozs7O0lBOUhDLElBQ0ksVUFBVSxDQUFDLE1BQW9EO1FBQ2pFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3RCLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNoRjtTQUNGO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7Ozs7Ozs7SUFZSSxpQkFBaUI7UUFDdEIsT0FBTyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUMxRSxDQUFDOzs7Ozs7SUFlRCxJQUNJLGNBQWMsQ0FBQyxPQUFlOztZQUM1QixTQUFTOzs7O1FBQUcsVUFBUyxXQUFXO1lBQ2xDLE9BQU8sZ0RBQWdELFdB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QUFLO3lCQU9MLEtBQUs7NkJBT0wsS0FBSzt5QkFPTCxLQUFLO3lCQU9MLEtBQUs7NkJBcUNMLEtBQUs7b0JBa0RMLFlBQVksU0FBQyxPQUFPOzs7O0lBMUhyQix3Q0FBd0I7Ozs7Ozs7SUFPeEIsMkNBQWdDOzs7Ozs7O0lBT2hDLHVDQUE0Qjs7Ozs7OztJQU81QiwyQ0FBZ0M7Ozs7Ozs7SUFPaEMsdUNBQWdDOzs7Ozs7Ozs7O0lBc0NoQyw0Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogXCJidXR0b25bbmd4UHJpbnRdXCJcbn0pXG5leHBvcnQgY2xhc3MgTmd4UHJpbnREaXJlY3RpdmUge1xuXG4gIHB1YmxpYyBfcHJpbnRTdHlsZSA9IFtdO1xuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4UHJpbnREaXJlY3RpdmVcbiAgICovXG4gIEBJbnB1dCgpIHByaW50U2VjdGlvbklkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hQcmludERpcmVjdGl2ZVxuICAgKi9cbiAgQElucHV0KCkgcHJpbnRUaXRsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4UHJpbnREaXJlY3RpdmVcbiAgICovXG4gIEBJbnB1dCgpIHVzZUV4aXN0aW5nQ3NzID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIHRvIGZvcmNlIHRoZSBwcmludCBkaWFsb2cgdG8gd2FpdCBiZWZvcmUgb3BlbmVkLiBEZWZhdWx0OiAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hQcmludERpcmVjdGl2ZVxuICAgKi9cbiAgQElucHV0KCkgcHJpbnREZWxheTogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIE5neFByaW50RGlyZWN0aXZlXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgcHJpbnRTdHlsZSh2YWx1ZXM6IHsgW2tleTogc3RyaW5nXTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB9KSB7XG4gICAgZm9yIChsZXQga2V5IGluIHZhbHVlcykge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB0aGlzLl9wcmludFN0eWxlLnB1c2goKGtleSArIEpTT04uc3RyaW5naWZ5KHZhbHVlc1trZXldKSkucmVwbGFjZSgvWydcIl0rL2csICcnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmV0dXJuU3R5bGVWYWx1ZXMoKTtcbiAgfVxuXG4vKipcbiAqXG4gKlxuICogQHJldHVybnMgdGhlIHN0cmluZyB0aGF0IGNyZWF0ZSB0aGUgc3R5bGVzaGVldCB3aGljaCB3aWxsIGJlIGluamVjdGVkXG4gKiBsYXRlciB3aXRoaW4gPHN0eWxlPjwvc3R5bGU+IHRhZy5cbiAqXG4gKiAtam9pbi9yZXBsYWNlIHRvIHRyYW5zZm9ybSBhbiBhcnJheSBvYmplY3RzIHRvIGNzcy1zdHlsZWQgc3RyaW5nXG4gKlxuICogQG1lbWJlcm9mIE5neFByaW50RGlyZWN0aXZlXG4gKi9cbnB1YmxpYyByZXR1cm5TdHlsZVZhbHVlcygpIHtcbiAgcmV0dXJuIGA8c3R5bGU+ICR7dGhpcy5fcHJpbnRTdHlsZS5qb2luKCcgJykucmVwbGFjZSgvLC9nLCc7Jyl9IDwvc3R5bGU+YDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiBAcmV0dXJucyBodG1sIGZvciB0aGUgZ2l2ZW4gdGFnXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hQcmludERpcmVjdGl2ZVxuICAgKi9cbiAgcHJpdmF0ZSBfc3R5bGVTaGVldEZpbGUgPSAnJztcblxuICAvKipcbiAgICogQG1lbWJlcm9mIE5neFByaW50RGlyZWN0aXZlXG4gICAqIEBwYXJhbSBjc3NMaXN0XG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgc3R5bGVTaGVldEZpbGUoY3NzTGlzdDogc3RyaW5nKSB7XG4gICAgbGV0IGxpbmtUYWdGbiA9IGZ1bmN0aW9uKGNzc0ZpbGVOYW1lKSB7XG4gICAgICByZXR1cm4gYDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJHtjc3NGaWxlTmFtZX1cIj5gO1xuICAgIH1cbiAgICBpZiAoY3NzTGlzdC5pbmRleE9mKCcsJykgIT09IC0xKSB7XG4gICAgICBjb25zdCB2YWx1ZUFyciA9IGNzc0xpc3Quc3BsaXQoJywnKTtcbiAgICAgIGZvciAobGV0IHZhbCBvZiB2YWx1ZUFycikge1xuICAgICAgICB0aGlzLl9zdHlsZVNoZWV0RmlsZSA9IHRoaXMuX3N0eWxlU2hlZXRGaWxlICsgbGlua1RhZ0ZuKHZhbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0eWxlU2hlZXRGaWxlID0gbGlua1RhZ0ZuKGNzc0xpc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBzdHJpbmcgd2hpY2ggY29udGFpbnMgdGhlIGxpbmsgdGFncyBjb250YWluaW5nIHRoZSBjc3Mgd2hpY2ggd2lsbFxuICAgKiBiZSBpbmplY3RlZCBsYXRlciB3aXRoaW4gPGhlYWQ+PC9oZWFkPiB0YWcuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJldHVyblN0eWxlU2hlZXRMaW5rVGFncygpIHtcbiAgICByZXR1cm4gdGhpcy5fc3R5bGVTaGVldEZpbGU7XG4gIH1cbiAgcHJpdmF0ZSBnZXRFbGVtZW50VGFnKHRhZzoga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwKTogc3RyaW5nIHtcbiAgICBjb25zdCBodG1sOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZWxlbWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBodG1sLnB1c2goZWxlbWVudHNbaW5kZXhdLm91dGVySFRNTCk7XG4gICAgfVxuICAgIHJldHVybiBodG1sLmpvaW4oJ1xcclxcbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIGh0bWwgc2VjdGlvbiB0byBiZSBwcmludGVkIGFsb25nIHdpdGggc29tZSBhc3NvY2lhdGVkIGlucHV0c1xuICAgKiBcbiAgICovXG4gIHByaXZhdGUgZ2V0SHRtbENvbnRlbnRzKCkge1xuICAgIGxldCBwcmludENvbnRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wcmludFNlY3Rpb25JZCk7XG4gICAgbGV0IGlubmFyZHMgPSBwcmludENvbnRlbnRzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbm5hcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbm5hcmRzW2ldLmRlZmF1bHRWYWx1ZSA9IGlubmFyZHNbaV0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBwcmludENvbnRlbnRzLmlubmVySFRNTDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4UHJpbnREaXJlY3RpdmVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgcHVibGljIHByaW50KCk6IHZvaWQge1xuICAgIGxldCBwcmludENvbnRlbnRzLCBwb3B1cFdpbiwgc3R5bGVzID0gJycsIGxpbmtzID0gJyc7XG4gICAgY29uc3QgYmFzZVRhZyA9IHRoaXMuZ2V0RWxlbWVudFRhZygnYmFzZScpO1xuXG4gICAgaWYodGhpcy51c2VFeGlzdGluZ0Nzcykge1xuICAgICAgc3R5bGVzID0gdGhpcy5nZXRFbGVtZW50VGFnKCdzdHlsZScpO1xuICAgICAgbGlua3MgPSB0aGlzLmdldEVsZW1lbnRUYWcoJ2xpbmsnKTtcbiAgICB9XG5cbiAgICBwcmludENvbnRlbnRzID0gdGhpcy5nZXRIdG1sQ29udGVudHMoKTtcbiAgICBwb3B1cFdpbiA9IHdpbmRvdy5vcGVuKFwiXCIsIFwiX2JsYW5rXCIsIFwidG9wPTAsbGVmdD0wLGhlaWdodD1hdXRvLHdpZHRoPWF1dG9cIik7XG4gICAgcG9wdXBXaW4uZG9jdW1lbnQub3BlbigpO1xuICAgIHBvcHVwV2luLmRvY3VtZW50LndyaXRlKGBcbiAgICAgIDxodG1sPlxuICAgICAgICA8aGVhZD5cbiAgICAgICAgICA8dGl0bGU+JHt0aGlzLnByaW50VGl0bGUgPyB0aGlzLnByaW50VGl0bGUgOiBcIlwifTwvdGl0bGU+XG4gICAgICAgICAgJHtiYXNlVGFnfVxuICAgICAgICAgICR7dGhpcy5yZXR1cm5TdHlsZVZhbHVlcygpfVxuICAgICAgICAgICR7dGhpcy5yZXR1cm5TdHlsZVNoZWV0TGlua1RhZ3MoKX1cbiAgICAgICAgICAke3N0eWxlc31cbiAgICAgICAgICAke2xpbmtzfVxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5PlxuICAgICAgICAgICR7cHJpbnRDb250ZW50c31cbiAgICAgICAgICA8c2NyaXB0IGRlZmVyPlxuICAgICAgICAgICAgZnVuY3Rpb24gdHJpZ2dlclByaW50KGV2ZW50KSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgdHJpZ2dlclByaW50LCBmYWxzZSk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnByaW50KCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgd2luZG93LmNsb3NlKCk7IH0sIDApO1xuICAgICAgICAgICAgICB9LCAke3RoaXMucHJpbnREZWxheX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0cmlnZ2VyUHJpbnQsIGZhbHNlKTtcbiAgICAgICAgICA8L3NjcmlwdD5cbiAgICAgICAgPC9ib2R5PlxuICAgICAgPC9odG1sPmApO1xuICAgIHBvcHVwV2luLmRvY3VtZW50LmNsb3NlKCk7XG4gIH1cbn1cbiJdfQ==