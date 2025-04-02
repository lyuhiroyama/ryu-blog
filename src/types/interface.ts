export interface Package {
    id: number;
    tracking_number: string;
    sender: string;
    recipient: string,
    status: string;
    estimated_delivery_date?: string; // # optional field
    created_at: string;
    user_id: number;
}

export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}