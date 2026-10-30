import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { ApplicationVersion, DashboardData, HealthStatus, Transaction, TransactionMetrics } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class FinpayApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api';

  getHealth(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>(`${this.baseUrl}/health`);
  }

  getVersion(): Observable<ApplicationVersion> {
    return this.http.get<ApplicationVersion>(`${this.baseUrl}/version`);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`);
  }

  getMetrics(): Observable<TransactionMetrics> {
    return this.http.get<TransactionMetrics>(`${this.baseUrl}/metrics`);
  }

  getDashboard(): Observable<DashboardData> {
    return forkJoin({
      health: this.getHealth(),
      version: this.getVersion(),
      transactions: this.getTransactions(),
      metrics: this.getMetrics(),
    });
  }
}
