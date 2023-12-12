import Container from "@/app/components/Container";
import ProductDetails from "./productDetails";
import { products } from "@/utils/product";

interface IParams{
    product?:string
}
const product = ({params}:{params:IParams}) => {
    console.log("params",params);
    return (  
        <div className="p-8">
            <Container>
                <ProductDetails product={products}/>
            </Container>
        </div>
     );
}
 
export default product;