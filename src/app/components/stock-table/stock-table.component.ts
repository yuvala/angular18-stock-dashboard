import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stock-table',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.scss'
})
export class StockTableComponent {
  @Input() data: any[] = [];
  @Input() title: string = '';
}
