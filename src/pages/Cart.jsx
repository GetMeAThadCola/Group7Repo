import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
  clearCart,
} from "../app/features/cart/cartSlice";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user, token, loading } = useAuth();

  const [savedPaymentMethod, setSavedPaymentMethod] = useState("mock-card-0000");
  const [hasLoadedPayment, setHasLoadedPayment] = useState(false);

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    console.log("Cart useEffect loaded. User:", user);

    if (!loading && user?.email && !hasLoadedPayment) {
      console.log("Fetching payment method for:", user.email);

      fetch(`https://k3qissszlf.execute-api.us-west-2.amazonaws.com/get-profile?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched profile:", data);

          if (data && data.paymentMethod) {
            setSavedPaymentMethod(data.paymentMethod);
            console.log("Payment method set to:", data.paymentMethod);
          } else {
            toast.info("No saved payment method found. Using fallback.");
          }

          setHasLoadedPayment(true);
        })
        .catch((err) => {
          console.error("Failed to load payment method:", err);
          toast.error("Could not load saved payment method.");
          setHasLoadedPayment(true);
        });
    }
  }, [loading, user?.email, hasLoadedPayment]);

  const handleCheckout = async () => {
    const payload = {
      email: user?.email || "guest@example.com",
      items: cartList,
      total: totalPrice,
      paymentMethod: savedPaymentMethod,
    };

    console.log("Checkout payload:", payload);

    try {
      const response = await fetch(
        "https://k3qissszlf.execute-api.us-west-2.amazonaws.com/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(`Transaction successful! Charged to ${savedPaymentMethod}`);
        dispatch(clearCart());
      } else {
        toast.error(`Checkout failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to process checkout. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Loading cart...</p>;

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are added in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt={item.productName} />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price.toFixed(2)} × {item.qty}
                            <span> = ${productQty.toFixed(2)}</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className="d_flex">
                <h4>Total Price :</h4>
                <h3>${totalPrice.toFixed(2)}</h3>
              </div>
              {savedPaymentMethod && (
                <p style={{ fontStyle: "italic", marginTop: "1rem" }}>
                  Payment method: {savedPaymentMethod}
                </p>
              )}
              {cartList.length > 0 && (
                <button onClick={handleCheckout} className="checkout-button">
                  Checkout
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
