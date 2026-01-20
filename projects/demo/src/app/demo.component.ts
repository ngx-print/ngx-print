import { afterNextRender, Component, ElementRef, inject, viewChild } from '@angular/core';
import { NgxPrintService } from '../../../../src/lib/ngx-print.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
})
export class DemoComponent {
  private _printService = inject(NgxPrintService);
  private _fb = inject(FormBuilder);

  canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('drawingCanvas');

  form = this._fb.group({
    name: ['Angular Developer'],
    role: ['developer'],
    bio: ['This text will be preserved in the print view.'],
    agree: [true],
  });

  constructor() {
    // Draw on canvas once it is ready (SSR safe)
    afterNextRender(() => {
      this.initCanvas();
    });
  }

  onPrint() {
    this._printService.print({
      printSectionId: 'print-demo-section',
      printTitle: 'Demo Component Print',
      printMethod: 'iframe',
      useExistingCss: true,
    });
  }

  private initCanvas() {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Draw a background and some shapes to prove canvas printing works
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
      ctx.moveTo(110, 75);
      ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
      ctx.moveTo(65, 65);
      ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
      ctx.moveTo(95, 65);
      ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
      ctx.stroke();

      ctx.font = '20px Arial';
      ctx.fillStyle = 'blue';
      ctx.fillText('Canvas Content', 150, 85);
    }
  }
}
