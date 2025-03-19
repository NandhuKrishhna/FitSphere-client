export type WalletTransactionQuery = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
    status?: string;
    description?: string;
  }