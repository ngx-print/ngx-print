export declare class NgxPrintDirective {
    _printStyle: any[];
    /**
     *
     *
     * @memberof NgxPrintDirective
     */
    printSectionId: string;
    /**
     *
     *
     * @memberof NgxPrintDirective
     */
    printTitle: string;
    /**
     *
     *
     * @memberof NgxPrintDirective
     */
    useExistingCss: boolean;
    /**
     * A delay in milliseconds to force the print dialog to wait before opened. Default: 0
     *
     * @memberof NgxPrintDirective
     */
    printDelay: number;
    /**
     *
     *
     * @memberof NgxPrintDirective
     */
    printStyle: {
        [key: string]: {
            [key: string]: string;
        };
    };
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
    returnStyleValues(): string;
    /**
     *
     *
     * @returns html for the given tag
     *
     * @memberof NgxPrintDirective
     */
    private _styleSheetFile;
    /**
     * @memberof NgxPrintDirective
     * @param cssList
     */
    styleSheetFile: string;
    /**
     * @returns string which contains the link tags containing the css which will
     * be injected later within <head></head> tag.
     *
     */
    private returnStyleSheetLinkTags;
    private getElementTag;
    /**
     * @returns html section to be printed along with some associated inputs
     *
     */
    private getHtmlContents;
    /**
     *
     *
     * @memberof NgxPrintDirective
     */
    print(): void;
}
