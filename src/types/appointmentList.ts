interface Doctor {
  name: string;
  profilePicture: string;
}

interface Slots {
  startTime: string;
  endTime: string;
}

export interface Appointment {
  _id: string;
  consultationType: "video" | "in-person";
  date: string;
  doctor: Doctor;
  status: "scheduled" | "completed" | "cancelled";
  slots: Slots;
  amount: number;
  orderId: string;
  paymentMethod: string;
  paymentThrough: string;
}
