export interface CartDetails {
    id: number;
    state: string;
    type: string;
    total: number; // Asegúrate de que esto sea del tipo correcto (number)
    totalWithDiscount: number; // Asegúrate de que esto sea del tipo correcto (number)
    products: any[]; // Cambia 'any' por el tipo específico de tus productos si es posible
    discountAmount?: number; // Opcional si no siempre está presente
    discountDescription?: string;
}