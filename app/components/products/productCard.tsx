"use client"

import { FormatPrice } from "@/utils/formatPrice"
import { truncateText } from "@/utils/truncateText"
import { Rating } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ProductCardProps {
    data: any
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router=useRouter()
    const porductRating=data.reviews.reduce((acc:number,curr:any)=> curr.rating + acc,0)/ data.reviews.length
    return (
        <div onClick={()=>router.push(`/product/${data.id}`)}
        className="col-span-1 cursor-pointer 
        border-[1.2px] border-slate-200
        bg-slate-50 rounded-sm p-2
        transition hover:scale-105
        text-center text-sm">
            <div className="flex flex-col items-center w-full gap-1">
                <div className="aspect-square w-full overflow-hidden relative">
                    <Image
                        fill
                        src={data.images[0].image}
                        className="w-full h-full object-contain" alt={""} />
                </div>
                <div className="mt-4">
                    {truncateText(data.name)}
                </div>
                <div>
                    <Rating value={porductRating} readOnly />
                </div>
                <div>{data.reviews.length} reviews</div>
                <div className="font-bold">{FormatPrice(data.price)}</div>
            </div>
        </div>
    )
}
export default ProductCard