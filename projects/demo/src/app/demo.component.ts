import { afterNextRender, Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgxPrintDirective, PrintOptions } from '../../../../src/public_api';

type PrintMethod = PrintOptions['printMethod'];
type OptionEntry = [keyof PrintOptions, string | number | boolean];

const SECTION_ID = 'print-section';

@Component({
  selector: 'app-root',
  imports: [NgxPrintDirective, CurrencyPipe, DatePipe],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  protected readonly sectionId = SECTION_ID;
  protected readonly today = new Date();
  protected readonly methods: PrintMethod[] = ['iframe', 'window', 'tab'];

  // Print options
  protected readonly printMethod = signal<PrintMethod>('iframe');
  protected readonly printTitle = signal('Invoice INV-2026-0142');
  protected readonly bodyClass = signal('');
  protected readonly useExistingCss = signal(true);
  protected readonly printStyle = signal('.print-only { display: block !important; }');
  protected readonly styleSheetFile = signal('');
  protected readonly previewOnly = signal(false);
  protected readonly closeWindow = signal(true);
  protected readonly printDelay = signal(0);
  protected readonly isIframe = computed(() => this.printMethod() === 'iframe');

  protected readonly lastCompleted = signal<Date | null>(null);

  // Invoice content
  protected readonly items = signal([
    { description: 'Printer paper, A4, 500 sheets', price: 6.9, qty: 4 },
    { description: 'Toner cartridge, black', price: 54, qty: 1 },
    { description: 'Desk stapler', price: 12.5, qty: 2 },
  ]);
  protected readonly total = computed(() => this.items().reduce((sum, item) => sum + item.price * item.qty, 0));

  // Generated code
  protected readonly codeTab = signal<'directive' | 'service'>('directive');
  protected readonly copied = signal(false);
  protected readonly directiveCode = computed(() => this.buildDirectiveCode());
  protected readonly serviceCode = computed(() => this.buildServiceCode());

  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('signature');
  private drawing = false;

  constructor() {
    afterNextRender(() => this.drawSampleSignature());
  }

  protected now() {
    return new Date();
  }

  protected setMethod(method: PrintMethod) {
    this.printMethod.set(method);
    if (method === 'iframe') this.previewOnly.set(false);
  }

  protected setQty(index: number, event: Event) {
    const qty = Math.max(0, Math.floor(Number((event.target as HTMLInputElement).value) || 0));
    this.items.update(items => items.map((item, i) => (i === index ? { ...item, qty } : item)));
  }

  protected text(event: Event): string {
    return (event.target as HTMLInputElement | HTMLTextAreaElement).value;
  }

  protected checked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  protected num(event: Event): number {
    return Math.max(0, Number((event.target as HTMLInputElement).value) || 0);
  }

  protected async copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission). The text is still selectable.
    }
  }

  //#region Signature canvas

  protected startDrawing(event: PointerEvent) {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.setPointerCapture(event.pointerId);
    this.drawing = true;
    const { x, y } = this.toCanvasPoint(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  protected draw(event: PointerEvent) {
    if (!this.drawing) return;
    const ctx = this.canvasRef().nativeElement.getContext('2d');
    if (!ctx) return;
    const { x, y } = this.toCanvasPoint(event);
    this.applyInk(ctx);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  protected stopDrawing() {
    this.drawing = false;
  }

  private toCanvasPoint(event: PointerEvent) {
    const canvas = this.canvasRef().nativeElement;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height,
    };
  }

  private applyInk(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  private drawSampleSignature() {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.applyInk(ctx);
    ctx.beginPath();
    ctx.moveTo(40, 75);
    ctx.bezierCurveTo(60, 10, 90, 10, 80, 65);
    ctx.bezierCurveTo(75, 95, 110, 30, 130, 58);
    ctx.bezierCurveTo(145, 80, 160, 40, 180, 54);
    ctx.bezierCurveTo(200, 68, 215, 36, 240, 50);
    ctx.stroke();
  }

  //#endregion

  /** Only options that differ from the library defaults end up in the snippets. */
  private changedOptions(): OptionEntry[] {
    const defaults = new PrintOptions();
    const current: Partial<PrintOptions> = {
      printMethod: this.printMethod(),
      printTitle: this.printTitle(),
      useExistingCss: this.useExistingCss(),
      bodyClass: this.bodyClass(),
      previewOnly: this.previewOnly(),
      closeWindow: this.closeWindow(),
      printDelay: this.printDelay(),
    };
    return (Object.entries(current) as OptionEntry[]).filter(
      ([key, value]) => value !== defaults[key] && !(this.isIframe() && (key === 'closeWindow' || key === 'previewOnly'))
    );
  }

  private buildDirectiveCode(): string {
    const attrs = ['ngxPrint', `printSectionId="${SECTION_ID}"`];
    for (const [key, value] of this.changedOptions()) {
      attrs.push(typeof value === 'string' ? `${key}="${value}"` : `[${key}]="${value}"`);
    }
    if (this.printStyle()) attrs.push('[printStyle]="printCss"');
    if (this.styleSheetFile()) attrs.push(`styleSheetFile="${this.styleSheetFile()}"`);

    let code = `<button\n  ${attrs.join('\n  ')}>\n  Print\n</button>`;
    if (this.printStyle()) code += `\n\n// in the component class\nprintCss = \`${this.printStyle()}\`;`;
    return code;
  }

  private buildServiceCode(): string {
    const lines = ['private printService = inject(NgxPrintService);', '', 'print() {'];
    if (this.printStyle()) lines.push(`  this.printService.printStyle = \`${this.printStyle()}\`;`);
    if (this.styleSheetFile()) lines.push(`  this.printService.styleSheetFile = '${this.styleSheetFile()}';`);
    lines.push('  this.printService.print({', `    printSectionId: '${SECTION_ID}',`);
    for (const [key, value] of this.changedOptions()) {
      lines.push(`    ${key}: ${typeof value === 'string' ? `'${value.replace(/'/g, "\\'")}'` : value},`);
    }
    lines.push('  });', '}');
    return lines.join('\n');
  }
}
