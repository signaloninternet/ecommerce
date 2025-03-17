import NavBar from "../features/navbar/Navbar";
import ProductDetail from "../features/prioduct-list/Components/ProductDetail";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductDetailPage() {

    const navigate = useNavigate();

    return ( <div>
        <NavBar>
            <ProductDetail></ProductDetail>
        </NavBar>
    </div> );
}

export default ProductDetailPage;