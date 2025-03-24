import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YahooFinanceService {
  rapidApiKey = environment.rapidApi_02.rapidApiKey;
  rapidApiHost = environment.rapidApi_02.rapidApiHost;
  private readonly baseUrl = `https://${this.rapidApiHost}/`;

  private readonly headers = new HttpHeaders({
    'X-RapidAPI-Key': this.rapidApiKey,
    'X-RapidAPI-Host': this.rapidApiHost
  });

  constructor(private readonly http: HttpClient) {}

  async getStock(symbol: string) {
    const url = `${this.baseUrl}${this.getSymbols(symbol)}`;
    const response: any = await firstValueFrom(this.http.get(url, { headers: this.headers }));
    return response.body.map((item: any) => {
      return {
        symbol: item.symbol,
        price: item.regularMarketPrice,
        change: item.regularMarketChange,
        changePercent: item.regularMarketChangePercent
      };
    });
  }

  getSymbols(symbol: string) {
    const ticker = 'AAPL%2CMSFT%2C%5ESPX%2C%';
    return `api/v1/markets/stock/quotes?ticker=${ticker}`;
    // return 'api/news/list-by-symbol?s=AAPL&snippetCount=1';
  }
}
