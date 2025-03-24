import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-input.component.html',
  styleUrl: './stock-input.component.scss'
})
export class StockInputComponent {
  symbol: string = '';

  readonly symbolAdded = signal<string | null>(null);
  addSymbol() {
    if (this.symbol.trim()) {
      // this.symbolAdded.emit(this.symbol.trim().toUpperCase());
      this.symbolAdded.set(this.symbol.trim().toUpperCase());
      this.symbol = '';
    }
  }
}
