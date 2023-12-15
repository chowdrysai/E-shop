"use client"

import { CartProductType } from "@/app/product/[productId]/productDetails";

interface SetQuantityProps{
    cartCounter?:boolean;
    cartProduct:CartProductType;
    handleQuantitIncrease:()=>void;
    handleQauntitDecrease:()=>void;

}
const btnStyle='border-[1.2px] border-slate-300 px-2 rounded';
const SetQuantity: React.FC<SetQuantityProps> = ({
    cartCounter,cartProduct,handleQuantitIncrease,handleQauntitDecrease
}) => {
    return ( 
        <div className="flex gap-4 items-center">
            {cartCounter? null : 
            <div className="font-semibold">QUANTITY</div>}
            <div className="flex gap-4 items-center text-base">
                <button onClick={handleQauntitDecrease} className={btnStyle}>-</button>
                <div>{cartProduct.quantity}</div>
                <button onClick={handleQuantitIncrease} className={btnStyle}>+</button>
            </div>
        </div>
     );
}
 
export default SetQuantity;