import { Timestamp } from 'firebase/firestore';

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: Timestamp;
  attachmentUrl?: string;
}
