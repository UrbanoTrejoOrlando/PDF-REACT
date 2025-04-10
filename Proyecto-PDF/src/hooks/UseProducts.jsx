const {useEffect} = from `react`;
import {useProductContext} from "../context/ProductContext";

const useProducts  = () =>{
    const {products, fetchProducts} = useProductContext();

    useEffect(()=>{
        fetchProducts();
    },[fetchProducts]);
    
    return products;

}

export default useProducts;