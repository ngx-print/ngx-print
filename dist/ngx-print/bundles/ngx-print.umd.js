(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-print', ['exports', '@angular/core'], factory) :
    (factory((global['ngx-print'] = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
             */ function (values) {
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
             */ function (cssList) {
                var e_1, _a;
                /** @type {?} */
                var linkTagFn = ( /**
                 * @param {?} cssFileName
                 * @return {?}
                 */function (cssFileName) {
                    return "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + cssFileName + "\">";
                });
                if (cssList.indexOf(',') !== -1) {
                    /** @type {?} */
                    var valueArr = cssList.split(',');
                    try {
                        for (var valueArr_1 = __values(valueArr), valueArr_1_1 = valueArr_1.next(); !valueArr_1_1.done; valueArr_1_1 = valueArr_1.next()) {
                            var val = valueArr_1_1.value;
                            this._styleSheetFile = this._styleSheetFile + linkTagFn(val);
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (valueArr_1_1 && !valueArr_1_1.done && (_a = valueArr_1.return))
                                _a.call(valueArr_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
            { type: core.Directive, args: [{
                        selector: "button[ngxPrint]"
                    },] }
        ];
        NgxPrintDirective.propDecorators = {
            printSectionId: [{ type: core.Input }],
            printTitle: [{ type: core.Input }],
            useExistingCss: [{ type: core.Input }],
            printDelay: [{ type: core.Input }],
            printStyle: [{ type: core.Input }],
            styleSheetFile: [{ type: core.Input }],
            print: [{ type: core.HostListener, args: ['click',] }]
        };
        return NgxPrintDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPrintModule = /** @class */ (function () {
        function NgxPrintModule() {
        }
        NgxPrintModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NgxPrintDirective],
                        imports: [],
                        exports: [NgxPrintDirective]
                    },] }
        ];
        return NgxPrintModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgxPrintDirective = NgxPrintDirective;
    exports.NgxPrintModule = NgxPrintModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-print.umd.js.map