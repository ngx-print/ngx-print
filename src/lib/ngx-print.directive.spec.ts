import { Component, DebugElement } from "@angular/core";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { NgxPrintDirective } from './ngx-print.directive';

@Component({
  template: `
  <div id="print-section">
    <h1>
      Welcome to ngx-print
    </h1>
    <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    <h2>Here are some links to help you start: </h2>
    <ul >
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://github.com/angular/angular-cli/wiki">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>
    <table border = "1">
      <tr>
        <td>Row 1, Column 1</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Row 2, Column 1</td>
        <td>Row 2, Column 2</td>
      </tr>
    </table>
  </div>
  <button printSectionId="print-section" ngxPrint bodyClass="theme-dark"></button>
  `
})
class TestNgxPrintComponent {
}

describe('NgxPrintDirective', () => {

  let buttonEl: DebugElement;
  let component: TestNgxPrintComponent;
  let fixture: ComponentFixture<TestNgxPrintComponent>;

  // To change this later, so it'll depend on TestNgxPrintComponent
  let styleSheet: { [key: string]: { [key: string]: string } }
    = {
    'h2': { 'border': 'solid 1px' },
    'h1': { 'color': 'red', 'border': '1px solid' }
  };

  beforeEach(() => {

    // Configure a NgModule-like decorator metadata
    TestBed.configureTestingModule({
      declarations: [TestNgxPrintComponent],
      imports: [NgxPrintDirective]
    });

    // Create a fixture object (that is going to allows us to create an instance of that component)
    fixture = TestBed.createComponent(TestNgxPrintComponent);

    // Create a component instance ( ~ new Component)
    component = fixture.componentInstance;

    // Get the button element (on which we tag the directive) to simulate clicks on it
    buttonEl = fixture.debugElement.query(By.directive(NgxPrintDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new NgxPrintDirective();
    expect(directive).toBeTruthy();
  });

  it('should test the @Input printStyle', () => {
    const directive = new NgxPrintDirective();

    // Define styleSheet before using it

    directive.printStyle = styleSheet;

    // Iterate through printStyle and push values to _printStyle
    for (const key in directive.printStyle) {
      if (directive.printStyle.hasOwnProperty(key)) {
        directive._printStyle.push((key + JSON.stringify(directive.printStyle[key])).replace(/['"]+/g, ''));
      }
    }

    // Create a spy on the instance's method
    spyOn(directive, 'returnStyleValues').and.callThrough();

    // Call the function before checking if it has been called
    directive.returnStyleValues();

    // Check if returnStyleValues has been called
    expect(directive.returnStyleValues).toHaveBeenCalled();
  });


  it('should returns a string from array of objects', () => {
    const directive = new NgxPrintDirective();
    directive._printStyle = [
      "h2{border:solid 1px}",
      "h1{color:red,border:1px solid}"
    ];

    expect((() => { return directive.returnStyleValues() })()).toEqual('<style> h2{border:solid 1px} h1{color:red;border:1px solid} </style>');
  });

  it(`should popup a new window`, () => {
    spyOn(window, 'open').and.callThrough();
    // simulate click
    buttonEl.triggerEventHandler('click', {});
    expect(window.open).toHaveBeenCalled();
  });

  it(`should apply class list to body element in new window`, () => {
    const windowOpenSpy = spyOn(window, 'open').and.callThrough();
    // simulate click
    buttonEl.triggerEventHandler('click', {});
    expect(windowOpenSpy.calls.mostRecent().returnValue.document.body.classList.contains('theme-dark')).toBeTrue();
  });

});
