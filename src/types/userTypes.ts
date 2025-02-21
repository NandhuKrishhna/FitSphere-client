export interface ErrorResponse {
    data: {
      errors?: Array<{ path: string; message: string }>;
      message?: string;
    };
    status: number;
  }
  
