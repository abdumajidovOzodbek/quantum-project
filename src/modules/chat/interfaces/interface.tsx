export interface Message {
    sender: string;
    receiverId: string;
    type: string;
    content: string;
    mediaUrl?: string;
}