// In Cart.js
"use client"
import { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons';
import { clearCart, removeItem, subtotal } from '@/app/features/cart/cartSlice';
import { isAuthenticated } from "@/app/middleware/protectedRoute";
function Cart() {
  const [authenticated, setAuthenticated] = useState("loading");
  const [show, setShow] = useState(false);
  const cartItems = useSelector((state:any) => state.cart.items);
  const subtotalValue = useSelector((state:any) => state.cart.subtotal);
  console.log(subtotalValue)
  const dispatch = useDispatch();


  const handleClearCart = () => {
    dispatch(clearCart());
    handleClose();
  };

  const handleRemoveItem = (itemId:number) => {
    dispatch(removeItem(itemId));
  };

  const handleSubtotal = () => {
    dispatch(subtotal()); // Dispatch the action to calculate subtotal
  };

  const handleCheckout = async () => {
    await dispatch(subtotal()); // Wait for subtotal calculation
    window.location.href = `/payment/stripe?subtotal=${subtotalValue}`; // Redirect to the checkout page with subtotal as a query parameter
  };
  
  
  const checkAuthentication = async () => {
    try {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated");
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuthenticated("not authenticated");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (authenticated === "loading") {
    return <div>Loading...</div>;
  }

  if (authenticated === 'accessing') {
    return (
      <>
        <FontAwesomeIcon icon={faCartShopping} style={{ color: "white" }} onClick={handleShow} />
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul>
              {cartItems.map((item:any) => (
                <li key={item._id}>
                  <div>{item.name}</div>
                  <div>{item.price}</div>
                  <div>{item.subtotal}</div>

                  <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </li>
              ))}
            </ul>
            {cartItems.length === 0 && <p>Your cart is empty.</p>}
            {(
              <Button variant="danger" onClick={handleClearCart}>
                <FontAwesomeIcon icon={faTrash} /> Clear Cart
              </Button>
            )}
            <hr /> 
            { (
              <div ><Button variant="danger" onClick={handleSubtotal}>
                Subtotal
              </Button></div>
            )}
            {subtotalValue && (
              <div>
                Subtotal : {subtotalValue}
              </div>
            )}
             <hr /> 
            { (
             <Button onClick={handleCheckout}>
             <span>Checkout</span>
             <ShoppingCartIcon /> 
           </Button>
            )}

          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  return null;
}

export default Cart;
