import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FinpayApiService } from './finpay-api.service';

describe('FinpayApiService', () => {
  let service: FinpayApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(FinpayApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests all dashboard endpoints under /api', () => {
    service.getDashboard().subscribe((data) => expect(data.metrics.total).toBe(1));
    http.expectOne('/api/health').flush({ status: 'ok', timestamp: '2026-01-01T00:00:00.000Z', version: '1.0.0' });
    http.expectOne('/api/version').flush({ name: 'finpay-backend', version: '1.0.0' });
    http.expectOne('/api/transactions').flush([{ id: 'txn_001', amount: 10, currency: 'BRL', status: 'approved', createdAt: '2026-01-01T00:00:00.000Z' }]);
    http.expectOne('/api/metrics').flush({ total: 1, approved: 1, declined: 0, approvalRate: 100 });
  });
});
