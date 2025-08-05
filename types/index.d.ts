export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  profileImage: string;
}
export interface IRoom {
  _id: string;
  name: string;
  capacity: number;
  price: number;
  description: string;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  customerName: string;
  date: string;
  createdAt: string;
}

export interface BookingFormData {
  customerName: string;
  date: string;
}
