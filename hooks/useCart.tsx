import { createContext } from "react";

type CartContextType={
    cartTotalQty:number
}

export const CartContext=createContext<CartContextType|null>(null)