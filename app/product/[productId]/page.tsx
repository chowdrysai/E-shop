import Container from "@/app/components/Container";
import ProductDetails from "./productDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";

interface IParams{
    productId?:string
}
const product = ({params}:{params:IParams}) => {
    const product=products.find((item)=>item.id===params.productId)
    // console.log("product",product);
    return (  
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
                <div className="flex flex-col gap-4 mt-20">
                    <div>Add rating</div>
                    <ListRating product={product}/>
                </div>
            </Container>
        </div>
     );
}
export default product;