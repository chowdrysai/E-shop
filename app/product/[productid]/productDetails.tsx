"use client"

import { Rating } from "@mui/material";
import { useState } from "react";

interface ProductDetailsProps {
    product: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: selectedImgType,
    quantity: number,
    price: number
}
export type selectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {

    const [CartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: {...product.images[0]},
        quantity: 1,
        price: product.price
    })

    const porductRating = product.reviews.reduce((acc: number, curr: any) => curr.rating + acc, 0) / product.reviews.length
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>Images</div>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={porductRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal />
                <div className="text-justify">{product.description}</div>
                <Horizontal />
                <div>
                    <span className="font-bold">CATEGORY:</span>
                    {product.category}
                </div>
                <div>
                    <span className="font-bold">BRAND:</span>
                    {product.brand}
                </div>
                <div className={product.inStock ? "text-green-400" : "text-rose-400"}>{product.inStock ? "In Stock" : "Out of Stock"}</div>
                <Horizontal />
                <div>color</div>
                <Horizontal />
                <div>quality</div>
                <Horizontal />
                <div>add to cart</div>
            </div>

        </div>
    );
}

export default ProductDetails;