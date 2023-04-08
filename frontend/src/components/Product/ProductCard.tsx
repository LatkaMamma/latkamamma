import Image from "next/image";
import { Product } from "@prisma/client";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { addItem, removeAmount } from "@features/cart";

export interface ProductCardProps {
    product: Product;
    onDetail: (product: Product) => void;
}

export default function ProductCard({ product, onDetail }: ProductCardProps) {
    const { name, description, images, tags } = product;
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    return (
        <div className="card w-96 glass">
            <figure>
                <Image fill src={images[0]} alt={name} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="card-actions flex-col">
                    <div
                        className="flex justify-center"
                    >
                        <button onClick={() => onDetail(product)} className="btn btn-primary">
                            Read More
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => dispatch(addItem({
                            id: product.id,
                            quantity: 1,
                        }))} className="btn btn-primary">
                            <IconPlus />
                        </button>
                        {cart[product.id] || 0}
                        <button onClick={() => dispatch(removeAmount({
                            id: product.id,
                            quantity: 1,
                        }))} className="btn btn-primary">
                            <IconMinus />
                        </button>
                    </div>
                    <div className="flex justify-end">
                        {tags.map((tag) => (
                            <span key={tag} className="badge badge-outline">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

