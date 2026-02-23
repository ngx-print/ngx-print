[![](https://badgen.net/npm/dt/ngx-print)](https://www.npmjs.com/package/ngx-print) [![](https://travis-ci.org/selemxmn/ngx-print.svg?branch=master)](https://travis-ci.org/selemxmn/ngx-print) [![Coverage Status](https://coveralls.io/repos/github/selemxmn/ngx-print/badge.svg?branch=unit-tests)](https://coveralls.io/github/selemxmn/ngx-print?branch=unit-tests)

# ngx-print : *plug n' play Angular directive to print your stuff*
This directive makes printing your HTML sections smooth and easy in your Angular application. It is inspired from the old [AngularJS ngPrint](https://github.com/gilf/ngPrint) directive.
***Enjoy! Contributions are so welcomed :)***

## Dependencies

| ngx-print | Angular        |
|-----------|----------------|
| 1.2.1     | 7.0.0 - 14.1.0 |
| 1.3.x     | 15.0.0         |
| 1.4.x     | 16.0.0         |
| 1.5.x     | 17.0.0         |
| 2.x.x     | 18.0.0         |
| 3.x.x     | 19.0.0         |
| 20.x.x    | 20.0.0         |
| 21.x.x    | 21.0.0         |

## Version Alignment Notice

Starting with version 20.0.0, this package aligns its major version with the Angular framework version for better
clarity and compatibility tracking. Version 20 is intended for Angular 20 and so on.

## Setup

**1-** In your root application folder run:

```bash
$ npm install ngx-print
```

**2-** Once `ngx-print` is installed, you need to import the directive `NgxPrintDirective`:

```ts
import { NgxPrintDirective } from 'ngx-print';

@Component({
  ...
  imports: [NgxPrintDirective]
  ...
})
export class PrintExampleComponent {}
```

**3-** Then plug n' play with it:

- Assuming you want to print the following HTML section:

```html
<div>
  <!--Your html stuff that you want to print-->
</div>
<button>print</button> <!--Your relevant print button-->
```

- Now, what you have to do is tagging your *wanted-to-print* section by an `id` attribute, then link that `id` to a directive parameter in your button:

```html
 <!--
   1)- Add an ID here
 -->
<div id="print-section"> 
  <!--Your html stuff that you want to print-->
</div>

 <!--
   2)- Add the directive name in your button (ngxPrint),
   3)- Affect your ID to printSectionId
 -->
<button printSectionId="print-section" ngxPrint>print</button> 
```

## Optional properties

- You want a customized title for your printing window? Add `printTitle`:

```html
<div id="print-section">
  <!-- ... -->
</div>

<button printTitle="MyTitle"  
        printSectionId="print-section"
        ngxPrint>print</button>
```

- Customize the printing stylesheet (CSS) by adding styles to `printStyle`:

```html
<div id="print-section">
  <!-- ... -->
</div>

<button [printStyle]="{h1 : {'color': 'red'}, h2 : {'border': 'solid 1px'}}"
        printSectionId="print-section"
        ngxPrint>print</button>
```

Here some simple styles were added to every `h1` & `h2` tags within the `div` where `print-section` is tagged to its `id` attribute.

- If you would like to use your existing CSS with media print you can add the `useExistingCss` attribute:

```html
<div id="print-section">
  <!-- ... -->
</div>

<button [useExistingCss]="true"
        printSectionId="print-section"
        ngxPrint>print</button>
```

- Import external stylesheets with `styleSheetFile` (comma-separated list):

```html
<div id="print-section">
  <!-- ... -->
</div>

<button styleSheetFile="assets/css/custom1.css,assets/css/custom2.css"
        printSectionId="print-section"
        ngxPrint>print</button>
```

- Show a preview without opening the print dialog using `previewOnly`:

```html
<div id="print-section">
  <!-- ... -->
</div>

<button [previewOnly]="true"
        printSectionId="print-section"
        ngxPrint>print</button>
```

- Some print operations open a second dialog, and automatically closing the popup window happens before the second dialog opens. Set `closeWindow` to false to handle print operations that open a second dialog, like "Microsoft Print to PDF", or "Print using system dialog...":

```html
<div id="print-section">
  <!-- ... -->
</div>

<button [closeWindow]="false"
        printSectionId="print-section"
        ngxPrint>print</button>
```

- Set `bodyClass` to whatever class values are needed for some of your CSS rules that expect an ancestor to have a certain class. For example, a theme selector:

```html
<div id="print-section">
  <!-- ... -->
</div>

<button bodyClass="theme-dark"
        printSectionId="print-section"
        ngxPrint>print</button>
```

- Use `printMethod` to control how the print window is opened. The default is `'window'` (a new popup window). Set it to `'tab'` to open a new browser tab instead, or to `'iframe'` to print silently in the background using a hidden iframe (no popup at all):

```html
<!-- Default: opens a new popup window -->
<button printMethod="window"
        printSectionId="print-section"
        ngxPrint>print</button>

<!-- Opens a new browser tab -->
<button printMethod="tab"
        printSectionId="print-section"
        ngxPrint>print</button>

<!-- Prints silently via a hidden iframe (no popup) -->
<button printMethod="iframe"
        printSectionId="print-section"
        ngxPrint>print</button>
```

- To run a function after printing completes, subscribe to the `printCompleted` event. Please note it is impossible to differentiate between the Cancel or Print button being clicked on the print window. This event will fire regardless of which button was clicked:

```html
<button (printCompleted)="onPrintComplete()"
        printSectionId="print-section"
        ngxPrint>print
</button>
```

## Using NgxPrint as a service (v1.5+)

Inject the `NgxPrintService` into your component or service:

```ts
import { inject } from '@angular/core';
import { NgxPrintService, PrintOptions } from 'ngx-print';

private readonly printService = inject(NgxPrintService);
```

### Printing a Section

```ts
import { PrintOptions } from 'ngx-print';

printMe(): void {
  const customPrintOptions = new PrintOptions({
    printSectionId: 'print-section',
    // add any other print options as needed
  });
  this.printService.print(customPrintOptions);
}
```

### Print Options Object

The `PrintOptions` object allows you to specify how the print job should be handled. All properties have default values and are optional, although `printSectionId` is required. It contains the following properties:

```typescript
printSectionId: string = '';
printTitle: string = '';
useExistingCss: boolean = false;
bodyClass: string = '';
printMethod: 'window' | 'tab' | 'iframe' = 'window';
previewOnly: boolean = false;
closeWindow: boolean = true;
printDelay: number = 0;
```

| Property | Type | Default | Description |
|---|---|---|---|
| `printSectionId` | `string` | `''` | **Required.** The `id` of the element to print. |
| `printTitle` | `string` | `''` | Title shown in the print document. |
| `useExistingCss` | `boolean` | `false` | Copies `<style>` and `<link>` tags from the host page. |
| `bodyClass` | `string` | `''` | CSS class(es) applied to the print `<body>`. |
| `printMethod` | `'window' \| 'tab' \| 'iframe'` | `'window'` | Controls how printing is triggered: popup window, new tab, or silent iframe. |
| `previewOnly` | `boolean` | `false` | Opens the print target without triggering the print dialog. |
| `closeWindow` | `boolean` | `true` | Closes the popup window after printing (ignored for `iframe`). |
| `printDelay` | `number` | `0` | Delay in milliseconds before the print dialog is opened. |

### Setting PrintStyles or StyleSheets

```ts
// Optional: CSS as a key-value pair
this.printService.printStyle = styleSheet;

// Optional: path to a CSS file
this.printService.styleSheetFile = fileLocation;
```

### Subscribing to the print event

```ts
this.printService.printComplete$.pipe(take(1)).subscribe(() => {
  console.log('Print completed!');
});
```

## Content-Security-Policy (CSP) Support

If Angular is configured to use a [CSP Nonce](https://angular.io/api/core/CSP_NONCE), ngx-print will automatically inject the `[printStyle]` CSS rules and stylesheet `<link>` tags with this nonce so they are permitted by the browser's Content Security Policy.

## Contributors :1st_place_medal:

Huge thanks to: [deeplotia](https://github.com/deeplotia), [Ben L](https://github.com/broem), [Gavyn McKenzie](https://github.com/gavmck), [silenceway](https://github.com/silenceway), [Muhammad Ahsan Ayaz](https://github.com/AhsanAyaz), [Core121](https://github.com/Core121), [Andreas Dorner](https://github.com/endlacer) and to all `ngx-print` users

## Donation

Did this project help you reduce time? I won't say no to a cup of coffee 🍵 :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/selemxmn/2)
