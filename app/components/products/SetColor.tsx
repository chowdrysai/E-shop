"use client"

import { CartProductType, selectedImgType } from "@/app/product/[productid]/productDetails";

interface SetColorProps{
    images:selectedImgType[],
    cartProduct:CartProductType,
    handColorSelect:{value:selectedImgType} => void

}
const SetColor:React.FC<SetColorProps> = ({
    images,cartProduct,handColorSelect
}) => {
    return ( 
        <div></div>
     );
}
 
export default SetColor;