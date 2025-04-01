export interface Package {
    id: number;
    trackingNumber: string;
    sender: string;
    recipient: string,
    status: string;
    estimatedDeliveryDate?: string; // # optional field
    createdAt: string;
    userId: number;
}

export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}