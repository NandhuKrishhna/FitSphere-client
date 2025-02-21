export type RazorpayOrder = {
    id: string;
    amount: number;
    currency: string;
  }

  export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string; 
    razorpay_signature: string;  
  }
  
  export interface RazorpayErrorResponse {
    error:{
    code : string;
    description : string;
    metadata :{
      order_id:string;
      payment_id:string;
    }
    reason : string;
    source :string;
    step:string;
  }
  }

  export interface Order {
    id: string; 
    amount: number;
    currency: string;
    receipt?: string;
  }
  