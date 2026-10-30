export interface HealthStatus {
  status: string;
  timestamp: string;
  version: string;
}

export interface ApplicationVersion {
  name: string;
  version: string;
}

export type TransactionStatus = 'approved' | 'declined';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  createdAt: string;
}

export interface TransactionMetrics {
  total: number;
  approved: number;
  declined: number;
  approvalRate: number;
}

export interface DashboardData {
  health: HealthStatus;
  version: ApplicationVersion;
  transactions: Transaction[];
  metrics: TransactionMetrics;
}
