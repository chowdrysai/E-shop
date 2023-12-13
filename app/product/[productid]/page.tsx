import Container from "@/app/components/Container";
import ProductDetails from "./productDetails";
import { products } from "@/utils/product";
import ListRating from "./ListRating";

interface IParams{
    product?:string
}
const product = ({params}:{params:IParams}) => {
    console.log("params",params);
    return (  
        <div className="p-8">
            <Container>
                <ProductDetails product={products}/>
                <div className="flex flex-col gap-4 mt-20">
                    <div>Add rating</div>
                    <ListRating product={products}/>
                </div>
            </Container>
        </div>
     );
}
 
export default product;