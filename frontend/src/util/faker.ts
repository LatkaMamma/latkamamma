import { faker } from '@faker-js/faker';
import { Product, Review, Order, OrderItem, Profile } from '@prisma/client';


type Base = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};

const base = (): Base => ({
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
});

export default class Faker {
    products: Product[] = [];
    reviews: Review[] = [];
    profiles: Profile[] = [];
    constructor() {
        this.products = this.stuff(this.product, 100);
        this.profiles = this.stuff(this.profile, 100);
        this.reviews = this.stuff(this.review, 1000);
    }
    public stuff<T extends (...args: any) => any> (
        stuffFn: T,
        count: number,
        params?: Parameters<T>,
        ): ReturnType<T>[]  {
        const objs = [];
        for (let i = 0; i < count; i++) {
            objs.push(stuffFn(params));
        }
        return objs;
    };

    private product = (): Product => ({
        ...base(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price().replace('.', '')),
        images: this.stuff(faker.image.imageUrl, Math.floor(Math.random() * 5) + 1),
        tags: this.stuff(faker.commerce.productAdjective, Math.floor(Math.random() * 5) + 1),
    });

    private review = (): Review => ({
        ...base(),
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        rating: Math.floor(Math.random() * 5) + 1,
        productId: this.products[Math.floor(Math.random() * this.products.length)].id,
        authorId: this.profiles[Math.floor(Math.random() * this.profiles.length)].id,
    });

    private profile = (): Profile => ({
        ...base(),
        user_id: faker.datatype.uuid(),
        fname: faker.name.firstName(),
        lname: faker.name.lastName(),
        image: Math.random() > 0.4 ? faker.image.imageUrl() : null,
        role: 'USER'
    });
}