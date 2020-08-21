/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener, Input } from '@angular/core';
var NgxPrintDirective = /** @class */ (function () {
    function NgxPrintDirective() {
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
    Object.defineProperty(NgxPrintDirective.prototype, "printStyle", {
        /**
         *
         *
         * @memberof NgxPrintDirective
         */
        set: /**
         *
         *
         * \@memberof NgxPrintDirective
         * @param {?} values
         * @return {?}
         */
        function (values) {
            for (var key in values) {
                if (values.hasOwnProperty(key)) {
                    this._printStyle.push((key + JSON.stringify(values[key])).replace(/['"]+/g, ''));
                }
            }
            this.returnStyleValues();
        },
        enumerable: true,
        configurable: true
    });
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
    NgxPrintDirective.prototype.returnStyleValues = /**
     *
     *
     * \@memberof NgxPrintDirective
     * @return {?} the string that create the stylesheet which will be injected
     * later within <style></style> tag.
     *
     * -join/replace to transform an array objects to css-styled string
     *
     */
    function () {
        return "<style> " + this._printStyle.join(' ').replace(/,/g, ';') + " </style>";
    };
    Object.defineProperty(NgxPrintDirective.prototype, "styleSheetFile", {
        /**
         * @memberof NgxPrintDirective
         * @param cssList
         */
        set: /**
         * \@memberof NgxPrintDirective
         * @param {?} cssList
         * @return {?}
         */
        function (cssList) {
            var e_1, _a;
            /** @type {?} */
            var linkTagFn = (/**
             * @param {?} cssFileName
             * @return {?}
             */
            function (cssFileName) {
                return "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + cssFileName + "\">";
            });
            if (cssList.indexOf(',') !== -1) {
                /** @type {?} */
                var valueArr = cssList.split(',');
                try {
                    for (var valueArr_1 = tslib_1.__values(valueArr), valueArr_1_1 = valueArr_1.next(); !valueArr_1_1.done; valueArr_1_1 = valueArr_1.next()) {
                        var val = valueArr_1_1.value;
                        this._styleSheetFile = this._styleSheetFile + linkTagFn(val);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (valueArr_1_1 && !valueArr_1_1.done && (_a = valueArr_1.return)) _a.call(valueArr_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                this._styleSheetFile = linkTagFn(cssList);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @returns string which contains the link tags containing the css which will
     * be injected later within <head></head> tag.
     *
     */
    /**
     * @private
     * @return {?} string which contains the link tags containing the css which will
     * be injected later within <head></head> tag.
     *
     */
    NgxPrintDirective.prototype.returnStyleSheetLinkTags = /**
     * @private
     * @return {?} string which contains the link tags containing the css which will
     * be injected later within <head></head> tag.
     *
     */
    function () {
        return this._styleSheetFile;
    };
    /**
     * @private
     * @param {?} tag
     * @return {?}
     */
    NgxPrintDirective.prototype.getElementTag = /**
     * @private
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        /** @type {?} */
        var html = [];
        /** @type {?} */
        var elements = document.getElementsByTagName(tag);
        for (var index = 0; index < elements.length; index++) {
            html.push(elements[index].outerHTML);
        }
        return html.join('\r\n');
    };
    /**
     * @returns html section to be printed along with some associated inputs
     *
     */
    /**
     * @private
     * @return {?} html section to be printed along with some associated inputs
     *
     */
    NgxPrintDirective.prototype.getHtmlContents = /**
     * @private
     * @return {?} html section to be printed along with some associated inputs
     *
     */
    function () {
        /** @type {?} */
        var printContents = document.getElementById(this.printSectionId);
        /** @type {?} */
        var innards = printContents.getElementsByTagName('input');
        for (var i = 0; i < innards.length; i++) {
            innards[i].defaultValue = innards[i].value;
        }
        return printContents.innerHTML;
    };
    /**
     *
     *
     * @memberof NgxPrintDirective
     */
    /**
     *
     *
     * \@memberof NgxPrintDirective
     * @return {?}
     */
    NgxPrintDirective.prototype.print = /**
     *
     *
     * \@memberof NgxPrintDirective
     * @return {?}
     */
    function () {
        /** @type {?} */
        var printContents;
        /** @type {?} */
        var popupWin;
        /** @type {?} */
        var styles = '';
        /** @type {?} */
        var links = '';
        /** @type {?} */
        var baseTag = this.getElementTag('base');
        if (this.useExistingCss) {
            styles = this.getElementTag('style');
            links = this.getElementTag('link');
        }
        printContents = this.getHtmlContents();
        popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>" + (this.printTitle ? this.printTitle : "") + "</title>\n          " + baseTag + "\n          " + this.returnStyleValues() + "\n          " + this.returnStyleSheetLinkTags() + "\n          " + styles + "\n          " + links + "\n        </head>\n        <body>\n          " + printContents + "\n          <script defer>\n            function triggerPrint(event) {\n              window.removeEventListener('load', triggerPrint, false);\n              setTimeout(function() {\n                window.print();\n                setTimeout(function() { window.close(); }, 0);\n              }, " + this.printDelay + ");\n            }\n            window.addEventListener('load', triggerPrint, false);\n          </script>\n        </body>\n      </html>");
        popupWin.document.close();
    };
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
    return NgxPrintDirective;
}());
export { NgxPrintDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXByaW50LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wcmludC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtcHJpbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9EO0lBQUE7UUFLUyxnQkFBVyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O1FBcUJmLG1CQUFjLEdBQUcsS0FBSyxDQUFDOzs7Ozs7UUFPdkIsZUFBVSxHQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7UUFzQ3hCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO0lBK0YvQixDQUFDO0lBOUhDLHNCQUNJLHlDQUFVO1FBTmQ7Ozs7V0FJRzs7Ozs7Ozs7UUFDSCxVQUNlLE1BQW9EO1lBQ2pFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO2dCQUN0QixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ2hGO2FBQ0Y7WUFDRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVIOzs7Ozs7Ozs7T0FTRzs7Ozs7Ozs7Ozs7SUFDSSw2Q0FBaUI7Ozs7Ozs7Ozs7SUFBeEI7UUFDRSxPQUFPLGFBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsY0FBVyxDQUFDO0lBQzFFLENBQUM7SUFlRCxzQkFDSSw2Q0FBYztRQUxsQjs7O1dBR0c7Ozs7OztR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SSxDQUFDLHdCQUF3QixFQUFFLG9CQUMvQixNQUFNLG9CQUNOLEtBQUsscURBR0wsYUFBYSxpVEFPTixJQUFJLENBQUMsVUFBVSw4SUFLcEIsQ0FBQyxDQUFDO1FBQ1osUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDOztnQkFyS0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7aUNBVUUsS0FBSzs2QkFPTCxLQUFLO2lDQU9MLEtBQUs7NkJBT0wsS0FBSzs2QkFPTCxLQUFLO2lDQXFDTCxLQUFLO3dCQWtETCxZQUFZLFNBQUMsT0FBTzs7SUF1Q3ZCLHdCQUFDO0NBQUEsQUF0S0QsSUFzS0M7U0FuS1ksaUJBQWlCOzs7SUFFNUIsd0NBQXdCOzs7Ozs7O0lBT3hCLDJDQUFnQzs7Ozs7OztJQU9oQyx1Q0FBNEI7Ozs7Ozs7SUFPNUIsMkNBQWdDOzs7Ozs7O0lBT2hDLHVDQUFnQzs7Ozs7Ozs7OztJQXNDaEMsNENBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IFwiYnV0dG9uW25neFByaW50XVwiXG59KVxuZXhwb3J0IGNsYXNzIE5neFByaW50RGlyZWN0aXZlIHtcblxuICBwdWJsaWMgX3ByaW50U3R5bGUgPSBbXTtcblxuICAvKipcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIE5neFByaW50RGlyZWN0aXZlXG4gICAqL1xuICBASW5wdXQoKSBwcmludFNlY3Rpb25JZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4UHJpbnREaXJlY3RpdmVcbiAgICovXG4gIEBJbnB1dCgpIHByaW50VGl0bGU6IHN0cmluZztcblxuICAvKipcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIE5neFByaW50RGlyZWN0aXZlXG4gICAqL1xuICBASW5wdXQoKSB1c2VFeGlzdGluZ0NzcyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGRlbGF5IGluIG1pbGxpc2Vjb25kcyB0byBmb3JjZSB0aGUgcHJpbnQgZGlhbG9nIHRvIHdhaXQgYmVmb3JlIG9wZW5lZC4gRGVmYXVsdDogMFxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4UHJpbnREaXJlY3RpdmVcbiAgICovXG4gIEBJbnB1dCgpIHByaW50RGVsYXk6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hQcmludERpcmVjdGl2ZVxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHByaW50U3R5bGUodmFsdWVzOiB7IFtrZXk6IHN0cmluZ106IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfSkge1xuICAgIGZvciAobGV0IGtleSBpbiB2YWx1ZXMpIHtcbiAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdGhpcy5fcHJpbnRTdHlsZS5wdXNoKChrZXkgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXNba2V5XSkpLnJlcGxhY2UoL1snXCJdKy9nLCAnJykpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJldHVyblN0eWxlVmFsdWVzKCk7XG4gIH1cblxuLyoqXG4gKlxuICpcbiAqIEByZXR1cm5zIHRoZSBzdHJpbmcgdGhhdCBjcmVhdGUgdGhlIHN0eWxlc2hlZXQgd2hpY2ggd2lsbCBiZSBpbmplY3RlZFxuICogbGF0ZXIgd2l0aGluIDxzdHlsZT48L3N0eWxlPiB0YWcuXG4gKlxuICogLWpvaW4vcmVwbGFjZSB0byB0cmFuc2Zvcm0gYW4gYXJyYXkgb2JqZWN0cyB0byBjc3Mtc3R5bGVkIHN0cmluZ1xuICpcbiAqIEBtZW1iZXJvZiBOZ3hQcmludERpcmVjdGl2ZVxuICovXG5wdWJsaWMgcmV0dXJuU3R5bGVWYWx1ZXMoKSB7XG4gIHJldHVybiBgPHN0eWxlPiAke3RoaXMuX3ByaW50U3R5bGUuam9pbignICcpLnJlcGxhY2UoLywvZywnOycpfSA8L3N0eWxlPmA7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICpcbiAgICogQHJldHVybnMgaHRtbCBmb3IgdGhlIGdpdmVuIHRhZ1xuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4UHJpbnREaXJlY3RpdmVcbiAgICovXG4gIHByaXZhdGUgX3N0eWxlU2hlZXRGaWxlID0gJyc7XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBOZ3hQcmludERpcmVjdGl2ZVxuICAgKiBAcGFyYW0gY3NzTGlzdFxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHN0eWxlU2hlZXRGaWxlKGNzc0xpc3Q6IHN0cmluZykge1xuICAgIGxldCBsaW5rVGFnRm4gPSBmdW5jdGlvbihjc3NGaWxlTmFtZSkge1xuICAgICAgcmV0dXJuIGA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIiR7Y3NzRmlsZU5hbWV9XCI+YDtcbiAgICB9XG4gICAgaWYgKGNzc0xpc3QuaW5kZXhPZignLCcpICE9PSAtMSkge1xuICAgICAgY29uc3QgdmFsdWVBcnIgPSBjc3NMaXN0LnNwbGl0KCcsJyk7XG4gICAgICBmb3IgKGxldCB2YWwgb2YgdmFsdWVBcnIpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVTaGVldEZpbGUgPSB0aGlzLl9zdHlsZVNoZWV0RmlsZSArIGxpbmtUYWdGbih2YWwpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zdHlsZVNoZWV0RmlsZSA9IGxpbmtUYWdGbihjc3NMaXN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgc3RyaW5nIHdoaWNoIGNvbnRhaW5zIHRoZSBsaW5rIHRhZ3MgY29udGFpbmluZyB0aGUgY3NzIHdoaWNoIHdpbGxcbiAgICogYmUgaW5qZWN0ZWQgbGF0ZXIgd2l0aGluIDxoZWFkPjwvaGVhZD4gdGFnLlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZXR1cm5TdHlsZVNoZWV0TGlua1RhZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0eWxlU2hlZXRGaWxlO1xuICB9XG4gIHByaXZhdGUgZ2V0RWxlbWVudFRhZyh0YWc6IGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcCk6IHN0cmluZyB7XG4gICAgY29uc3QgaHRtbDogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGVsZW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaHRtbC5wdXNoKGVsZW1lbnRzW2luZGV4XS5vdXRlckhUTUwpO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbC5qb2luKCdcXHJcXG4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBodG1sIHNlY3Rpb24gdG8gYmUgcHJpbnRlZCBhbG9uZyB3aXRoIHNvbWUgYXNzb2NpYXRlZCBpbnB1dHNcbiAgICogXG4gICAqL1xuICBwcml2YXRlIGdldEh0bWxDb250ZW50cygpIHtcbiAgICBsZXQgcHJpbnRDb250ZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucHJpbnRTZWN0aW9uSWQpO1xuICAgIGxldCBpbm5hcmRzID0gcHJpbnRDb250ZW50cy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW5uYXJkcy5sZW5ndGg7IGkrKykge1xuICAgICAgaW5uYXJkc1tpXS5kZWZhdWx0VmFsdWUgPSBpbm5hcmRzW2ldLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcHJpbnRDb250ZW50cy5pbm5lckhUTUw7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIE5neFByaW50RGlyZWN0aXZlXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIHB1YmxpYyBwcmludCgpOiB2b2lkIHtcbiAgICBsZXQgcHJpbnRDb250ZW50cywgcG9wdXBXaW4sIHN0eWxlcyA9ICcnLCBsaW5rcyA9ICcnO1xuICAgIGNvbnN0IGJhc2VUYWcgPSB0aGlzLmdldEVsZW1lbnRUYWcoJ2Jhc2UnKTtcblxuICAgIGlmKHRoaXMudXNlRXhpc3RpbmdDc3MpIHtcbiAgICAgIHN0eWxlcyA9IHRoaXMuZ2V0RWxlbWVudFRhZygnc3R5bGUnKTtcbiAgICAgIGxpbmtzID0gdGhpcy5nZXRFbGVtZW50VGFnKCdsaW5rJyk7XG4gICAgfVxuXG4gICAgcHJpbnRDb250ZW50cyA9IHRoaXMuZ2V0SHRtbENvbnRlbnRzKCk7XG4gICAgcG9wdXBXaW4gPSB3aW5kb3cub3BlbihcIlwiLCBcIl9ibGFua1wiLCBcInRvcD0wLGxlZnQ9MCxoZWlnaHQ9YXV0byx3aWR0aD1hdXRvXCIpO1xuICAgIHBvcHVwV2luLmRvY3VtZW50Lm9wZW4oKTtcbiAgICBwb3B1cFdpbi5kb2N1bWVudC53cml0ZShgXG4gICAgICA8aHRtbD5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgPHRpdGxlPiR7dGhpcy5wcmludFRpdGxlID8gdGhpcy5wcmludFRpdGxlIDogXCJcIn08L3RpdGxlPlxuICAgICAgICAgICR7YmFzZVRhZ31cbiAgICAgICAgICAke3RoaXMucmV0dXJuU3R5bGVWYWx1ZXMoKX1cbiAgICAgICAgICAke3RoaXMucmV0dXJuU3R5bGVTaGVldExpbmtUYWdzKCl9XG4gICAgICAgICAgJHtzdHlsZXN9XG4gICAgICAgICAgJHtsaW5rc31cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgICAke3ByaW50Q29udGVudHN9XG4gICAgICAgICAgPHNjcmlwdCBkZWZlcj5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRyaWdnZXJQcmludChldmVudCkge1xuICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRyaWdnZXJQcmludCwgZmFsc2UpO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5wcmludCgpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHdpbmRvdy5jbG9zZSgpOyB9LCAwKTtcbiAgICAgICAgICAgICAgfSwgJHt0aGlzLnByaW50RGVsYXl9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdHJpZ2dlclByaW50LCBmYWxzZSk7XG4gICAgICAgICAgPC9zY3JpcHQ+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvaHRtbD5gKTtcbiAgICBwb3B1cFdpbi5kb2N1bWVudC5jbG9zZSgpO1xuICB9XG59XG4iXX0=