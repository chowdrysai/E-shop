import { CartProductType } from "@/app/product/[productId]/productDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";

type CartContextType={
    cartTotalQty:number,
    cartTotalAmount:number,
    cartProducts:CartProductType[] | null,
    handleAddProductToCart : (product: CartProductType) => void,
    handleRemoveProductFromCart : (product: CartProductType) => void,
    handleCartQtyIncrease : (product: CartProductType) => void;
    handleCartQtyDecrease : (product: CartProductType) => void;
    handleClearCart : () => void;
}

export const CartContext=createContext<CartContextType|null>(null);

interface Props{
    [propName:string]:any;
}
export const CartContextProvider = (props: Props)=>{
    const [cartProducts,setCartProducts]=useState<CartProductType[] | null>(null)
    const [cartTotalQty,setCartTotalQty]=useState(0)
    const [cartTotalAmount,setCartTotalAmount]=useState(0)

    console.log('qty',cartTotalQty)
    console.log('amount',cartTotalAmount)
    useEffect(()=>{
        const cartItems=localStorage.getItem("E-shopCartItem");
        const cartProducts: CartProductType[] | null = cartItems ? JSON.parse(cartItems) : null

        setCartProducts(cartProducts);
    },[])

    useEffect(()=>{

        const getTotals=()=>{   
            console.log("sai") 
        if(cartProducts){
            const {total,qty} = cartProducts?.reduce((acc,item)=>{
                const itemTotal=item.price * item.quantity
                acc.total=acc.total+itemTotal
                acc.qty=acc.qty+item.quantity
                return acc;
            },{
                total:0,
                qty:0
            })
            setCartTotalQty(qty);
            setCartTotalAmount(total)
        }
        }
        getTotals()
    },[cartProducts])

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

    const handleRemoveProductFromCart = useCallback((product:CartProductType)=>{
        
        if(cartProducts){
            const filteredProducts=cartProducts.filter((item)=>item.id!==product.id)
            setCartProducts(filteredProducts);
            toast.success(`${product.name} remove`)
            localStorage.setItem("E-shopCartItem", JSON.stringify(filteredProducts));
        }
    },[cartProducts])

    const handleCartQtyIncrease=useCallback(( product:CartProductType)=>{
    let updatedCart;
    if(product.quantity===99){
        return toast.error("Maximum quantity reached")
    }
    if(cartProducts){
        updatedCart=[...cartProducts]
        const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
        if (existingIndex > -1) {
            updatedCart[existingIndex].quantity++;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("E-shopCartItem", JSON.stringify(updatedCart));
    }

    },[cartProducts])

    const handleCartQtyDecrease=useCallback(( product:CartProductType)=>{
        let updatedCart;
        if(product.quantity===1){
            return toast.error("Minimun quantity reached")
        }
        if(cartProducts){
            updatedCart=[...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity--;
            }
            setCartProducts(updatedCart);
            localStorage.setItem("E-shopCartItem", JSON.stringify(updatedCart));
        }
    
        },[cartProducts])

    const handleClearCart=useCallback(()=>{
        console.log("clear cart")
        setCartProducts(null);
        setCartTotalQty(0)
        localStorage.setItem("E-shopCartItem", JSON.stringify(null));

    },[])

    const value={
        cartTotalQty,
        cartProducts,   
        cartTotalAmount,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        
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