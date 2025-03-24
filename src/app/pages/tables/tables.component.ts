import { Component, effect, signal, ViewChild } from '@angular/core';
import { StockTableComponent } from '../../components/stock-table/stock-table.component';
import { AlphaVantageService } from '../../services/alpha-vantage.service';
import { YahooFinanceService } from '../../services/yahoo-finance.service';
import { CommonModule } from '@angular/common';
import { StockInputComponent } from '../../components/stock-input/stock-input.component';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, StockTableComponent, StockInputComponent],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent {
  yahooData = signal<any[]>([]);
  alphaData = signal<any[]>([]);
  symbols: string[] = ['AAPL']; // default symbols list
  @ViewChild('stockInput') stockInput!: StockInputComponent;
  @ViewChild('inputRef') inputRef!: StockInputComponent;
  constructor(private readonly alphaService: AlphaVantageService, private readonly yahooService: YahooFinanceService) {
    effect(() => {
      const symbol = this.inputRef?.symbolAdded();
      if (symbol && !this.symbols.includes(symbol)) {
        this.addSymbol(symbol);
      }
    });
  }
  ngAfterViewInit() {
    // effect(() => {
    //   const symbol = this.inputRef?.symbolAdded();
    //   if (symbol && !this.symbols.includes(symbol)) {
    //     this.addSymbol(symbol);
    //   }
    // });

    this.fetchAll();
  }

  // async ngOnInit() {
  //   const inputComponent = document.querySelector('app-stock-input') as any;
  //   effect(() => {
  //     const newSymbol = inputComponent?.symbolAdded();
  //     if (newSymbol) {
  //       this.addSymbol(newSymbol);
  //     }
  //   });
  //   this.fetchAll();
  //   /*
  //   * this.yahooData = [await this.yahooService.getStock()];
  //   * this.alphaData = [await this.alphaService.getStock('AAPL')];
  //   */
  // }
  async fetchAll() {
    const yahooList: any[] = [];
    const alphaList: any[] = [];
    for (let symbol of this.symbols) {
      const yahoo = await this.yahooService.getStock(symbol);
      const alpha = await this.alphaService.getStock(symbol);
      yahooList.push(...yahoo);
      alphaList.push(...alpha);
    }
    this.yahooData.set(yahooList);
    this.alphaData.set(alphaList);
  }

  // async fetchAll() {
  //   this.yahooData = [];
  //   this.alphaData = [];
  //   for (let symbol of this.symbols) {
  //     const yahoo = await this.yahooService.getStock(symbol);
  //     const alpha = await this.alphaService.getStock(symbol);
  //     this.yahooData.push(yahoo);
  //     this.alphaData.push(alpha);
  //   }
  // }
  addSymbol(symbol: string) {
    if (!this.symbols.includes(symbol)) {
      this.symbols.push(symbol);
      this.fetchAll();
    }
  }
}
