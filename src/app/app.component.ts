import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { DashboardData, Transaction } from './models/api.models';
import { FinpayApiService } from './services/finpay-api.service';
import { FRONTEND_VERSION } from './app.version';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly api = inject(FinpayApiService);

  readonly frontendVersion = FRONTEND_VERSION;
  data: DashboardData | null = null;
  loading = true;
  error = false;

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.error = false;
    this.api.getDashboard().pipe(finalize(() => (this.loading = false))).subscribe({
      next: (data) => (this.data = data),
      error: () => {
        this.data = null;
        this.error = true;
      },
    });
  }

  currencyLocale(currency: string): string {
    return currency === 'BRL' ? 'pt-BR' : 'en-US';
  }

  trackTransaction(_: number, transaction: Transaction): string {
    return transaction.id;
  }
}
