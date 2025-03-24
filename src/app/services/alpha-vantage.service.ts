import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {
  private readonly apiKey = 'YOUR_API_KEY'; // Place your API key here
  private readonly baseUrl = 'https://www.alphavantage.co/query';

  constructor(private readonly http: HttpClient) {}

  async getStock(symbol: string) {
    const url = `${this.baseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`;
    const response: any = await firstValueFrom(this.http.get(url));
    const stock = response['Global Quote'];

    return [{
      symbol: stock['01. symbol'],
      price: parseFloat(stock['05. price']),
      change: parseFloat(stock['09. change']),
      changePercent: stock['10. change percent']
    }];
  }
}
