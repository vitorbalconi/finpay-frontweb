import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('renders the dashboard after loading API data', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('/api/health').flush({ status: 'ok', timestamp: '2026-01-01T00:00:00.000Z', version: '1.0.0' });
    http.expectOne('/api/version').flush({ name: 'finpay-backend', version: '1.0.0' });
    http.expectOne('/api/transactions').flush([]);
    http.expectOne('/api/metrics').flush({ total: 0, approved: 0, declined: 0, approvalRate: 0 });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Total de transações');
    expect(fixture.nativeElement.textContent).toContain('Nenhuma transação encontrada');
  });
});
