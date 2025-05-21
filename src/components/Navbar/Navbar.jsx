import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginRegisterModal from "../LoginRegisterModal/loginregistermodal";
import { Auth } from "aws-amplify";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY >= 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, [showLoginModal]);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      window.location.reload();
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  return (
    <>
      <Navbar
        fixed="top"
        expand="md"
        className={isFixed ? "navbar fixed" : "navbar"}
      >
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to="/">
            <ion-icon name="bag"></ion-icon>
            <h1 className="logo">BiteRunners</h1>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpand(expand ? false : "expanded")}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Item>
                <Link
                  to="/"
                  className="navbar-link"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Home</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/shop"
                  className="navbar-link"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Shop</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/cart"
                  className="navbar-link"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Cart</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                {user ? (
                  <Link
                    to="/account"
                    className="navbar-link"
                    onClick={() => setExpand(false)}
                  >
                    <span className="nav-link-label">
                      {user.attributes?.email || "Account"}
                    </span>
                  </Link>
                ) : (
                  <div
                    onClick={() => setShowLoginModal(true)}
                    className="navbar-link"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="nav-link-label">Login</span>
                  </div>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>

          <div className="media-cart">
            {user ? (
              <Link to="/account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="nav-icon"
                  style={{ marginRight: "1rem" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ) : (
              <div
                onClick={() => setShowLoginModal(true)}
                style={{ cursor: "pointer", marginRight: "1rem" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="nav-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            <Link
              to="/cart"
              className="cart"
              data-num={cartList.length}
              aria-label="Go to Cart Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="nav-icon"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </Link>
          </div>
        </Container>
      </Navbar>

      <LoginRegisterModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default NavBar;
