import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPrintService } from './ngx-print.service';
import { Component, CSP_NONCE, inject, provideZonelessChangeDetection } from '@angular/core';
import { PrintOptions } from './print-options';

const testNonce = 'dummy-nonce-value';

@Component({
  template: `
    <div id="print-section">
      <h1>Welcome to ngx-print</h1>
      <img
        width="300"
        alt="Angular Logo"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==" />
      <h2>Here are some links to help you start:</h2>
      <ul>
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
      <table border="1">
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
  `,
})
class TestNgxPrintServiceComponent {
  private printService = inject(NgxPrintService);

  printMe(printOptions: PrintOptions) {
    this.printService.print(printOptions);
  }
}

describe('NgxPrintService', () => {
  let service: NgxPrintService;
  let component: TestNgxPrintServiceComponent;
  let fixture: ComponentFixture<TestNgxPrintServiceComponent>;

  const styleSheet: { [key: string]: { [key: string]: string } } = {
    'h2': { 'border': 'solid 1px' },
    'h1': { 'color': 'red', 'border': '1px solid' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestNgxPrintServiceComponent],
      providers: [{ provide: CSP_NONCE, useValue: testNonce }, NgxPrintService, provideZonelessChangeDetection()],
    });
    service = TestBed.inject(NgxPrintService);
    // Create a fixture object (that is going to allows us to create an instance of that component)
    fixture = TestBed.createComponent(TestNgxPrintServiceComponent);

    // Create a component instance ( ~ new Component)
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should print', () => {
    spyOn(service, 'print');

    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
    });

    component.printMe(customPrintOptions);

    expect(service.print).toHaveBeenCalledWith(customPrintOptions);
  });

  it('should print with title', () => {
    spyOn(service, 'print');

    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
      printTitle: 'Test Title',
    });

    component.printMe(customPrintOptions);

    expect(service.print).toHaveBeenCalledWith(customPrintOptions);
  });

  it('should print with existing css', () => {
    spyOn(service, 'print');

    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
      useExistingCss: true,
    });

    component.printMe(customPrintOptions);

    expect(service.print).toHaveBeenCalledWith(customPrintOptions);
  });

  it('should print with delay', () => {
    spyOn(service, 'print');

    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
      printDelay: 2000,
    });

    component.printMe(customPrintOptions);

    expect(service.print).toHaveBeenCalledWith(customPrintOptions);
  });

  it('should print with previewOnly', () => {
    spyOn(service, 'print');

    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
      previewOnly: true,
    });

    component.printMe(customPrintOptions);

    expect(service.print).toHaveBeenCalledWith(customPrintOptions);
  });

  it('should not close', () => {
    spyOn(service, 'print');

    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
      closeWindow: false,
    });

    component.printMe(customPrintOptions);

    expect(service.print).toHaveBeenCalledWith(customPrintOptions);
  });

  it('should open new tab', () => {
    spyOn(service, 'print');

    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
      printMethod: 'tab',
    });

    component.printMe(customPrintOptions);

    expect(service.print).toHaveBeenCalledWith(customPrintOptions);
  });

  it('should test the printStyle', () => {
    // Create a spy on the instance's method
    spyOn(service, 'returnStyleValues').and.callThrough();

    // Call the function before checking if it has been called
    service.returnStyleValues();

    // Check if returnStyleValues has been called
    expect(service.returnStyleValues).toHaveBeenCalled();
  });

  it('should return a string from array of objects', () => {
    service.printStyle = styleSheet;

    // Ensure the print styles are correctly formatted in the document
    expect(service.returnStyleValues()).toEqual('<style nonce="' + testNonce + '"> h2{border:solid 1px} h1{color:red;border:1px solid} </style>');
  });

  it('should emit on print completion (void)', done => {
    // Subscribe to the observable
    service.printComplete$.subscribe(() => {
      expect(true).toBeTrue(); // Just ensure it emits
      done();
    });

    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
    });

    component.printMe(customPrintOptions);

    // Simulate the popup sending the print complete message
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'print-complete' } }));
  });
});
