[![](https://badgen.net/npm/dt/ngx-print)](https://www.npmjs.com/package/ngx-print) [![](https://travis-ci.org/selemxmn/ngx-print.svg?branch=master)](https://travis-ci.org/selemxmn/ngx-print) [![Coverage Status](https://coveralls.io/repos/github/selemxmn/ngx-print/badge.svg?branch=unit-tests)](https://coveralls.io/github/selemxmn/ngx-print?branch=unit-tests)

# ngx-print : *plug n' play Angular (2++) directive to print your stuff*
This directive makes printing your HTML sections smooth and easy in your Angular application. It is inspired from the old [AngularJS ngPrint](https://github.com/gilf/ngPrint) directive, thus it is intendend to be used with the new Angular -2/4/5/6/7-... ***Enjoy ! contributions are so welcomed :)***

## Setup

 **1-** In your root application folder run:
```bash
$ npm install ngx-print
```

 **2-** Once `ngx-print` is installed, you need to import the main module `NgxPrintModule` :

   ```js
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  ...
  imports: [NgxPrintModule, ...],
  ...
})
export class YourAppModule {
}
```

 **3-** Then plug n' play with it: 

 - Assuming you want to print the following HTML section:

```html
<div>
  <!--Your html stuff that you want to print-->
</div>
<button>print</button> <!--Your relevant print button-->

```

 - Now, what you have to do is tagging your *wanted-to-print* section by an `id` attribute, then link that `id` to a directive parameter in your button :

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

- You want a customized title for your printing window ? you have the choice by adding a new attribute to your print button `printTitle`:


```html

<div  id="print-section">

<!-- ... -->

</div>

<button  
	printTitle="MyTitle"  
	printSectionId="print-section"  
	ngxPrint>print</button>

```

  
- Also, would you like to customize the printing window style sheet (CSS) ? Hence you can do so by adding infinite styles to another attribute called `printStyle`:

  
```html

<div  id="print-section">

<!-- ... -->

</div>

<button
	[printStyle]="{h1 : {'color': 'red'}, h2 : {'border': 'solid 1px'}}"
	printSectionId="print-section"
	ngxPrint>print</button>

```

Here some simple styles were added to every `h1` & `h2` tags within the `div` where `print-section` is tagged to its `id` attribute.
  
- If you would like to use your existing CSS with media print you can add the `useExistingCss` attribute:

```html

<div  id="print-section">

<!-- ... -->

</div>

<button
  [useExistingCss]="true"
	printSectionId="print-section"
	ngxPrint>print</button>

```

- If you want to customize the printing window style sheet (CSS) by importing the css provided in assets/css use `styleSheetFile`:


```html

<div  id="print-section">

<!-- ... -->

</div>

<button
  styleSheetFile="assets/css/custom1.css,assets/css/custom2.css"
  printSectionId="print-section"
  ngxPrint>print</button>

```
## Contributors :1st_place_medal: 

Huge thanks to: [deeplotia](https://github.com/deeplotia) , [Ben L](https://github.com/broem) , [Gavyn McKenzie](https://github.com/gavmck) , [silenceway](https://github.com/silenceway), [Muhammad Ahsan Ayaz](https://github.com/AhsanAyaz) and to all  `ngx-print` users 

## Donation

Did this project help you reducing time? I won't say no to a cup of coffee 🍵 :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/selemxmn/2)
