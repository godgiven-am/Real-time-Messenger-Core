
export type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
  isHidden?: boolean;
};

export type User = {
  id: string;
  name: string;
  role: 'user' | 'admin';
};