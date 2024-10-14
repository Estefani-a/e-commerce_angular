export interface CartDetails {
    id: number;
    state: string;
    type: string;
    total: number;
    totalWithDiscount: number;
    products: any[];
    discountAmount?: number;
    discountDescription?: string;
}
