export interface PrismaPublicProfile {
    id: string;
    fname: string;
    lname: string;
    orders: {
        id: string;
        items: {
            id: string;
            name: string;
            price: number;
            quantity: number;
            vat: number;
            thumbnail: string;
        }[];
        total: number;
    }[];
    user_id: string;
    image: string | null;
}