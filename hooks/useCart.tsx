import { CartProductType } from "@/app/product/[productid]/productDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";

type CartContextType={
    cartTotalQty:number,
    cartProducts:CartProductType[] | null,
    handleAddProductToCart : (product: CartProductType) => void,
}

export const CartContext=createContext<CartContextType|null>(null);

interface Props{
    [propName:string]:any;
}
export const CartContextProvider = (props: Props)=>{
    const [cartProducts,setCartProducts]=useState<CartProductType[] | null>(null)
    const [cartTotalQty,setCartTotalQty]=useState(10)

    useEffect(()=>{
        const cartItems=localStorage.getItem("E-shopCartItem");
        const cartProducts: CartProductType[] | null = cartItems ? JSON.parse(cartItems) : null

        setCartProducts(cartProducts);
    },[])
    const handleAddProductToCart=useCallback((product:CartProductType)=>{
        setCartProducts((prev)=>{
            let updatedCart;
            if(prev){
                updatedCart=[...prev,product]
            }else{
                updatedCart=[product]
            }
            toast.success(`${product.name} added to cart`)
            localStorage.setItem("E-shopCartItem", JSON.stringify(updatedCart));
            return updatedCart
        })
            
    },[]);
    const value={
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    }
    return <CartContext.Provider value={value} {...props}/>
}

export const  useCart=()=>{
    const context=useContext(CartContext);

    if(context===null){
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context;
}