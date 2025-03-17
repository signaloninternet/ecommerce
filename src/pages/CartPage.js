import Cart from "../features/cart/Cart";
import NavBar from "../features/navbar/NavbarServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {

  const navigate = useNavigate();
  return (
    <div>
      <NavBar>
        <Cart></Cart>
      </NavBar>
    </div>
  );
}

export default CartPage;
