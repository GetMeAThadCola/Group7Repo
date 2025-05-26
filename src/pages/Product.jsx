import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Set the selected product when ID changes
  useEffect(() => {
    const found = products.find((item) => item.id === id);

    setSelectedProduct(found);
    window.scrollTo(0, 0);
  }, [id]);

  // Set related products once selectedProduct is updated
  useEffect(() => {
    if (selectedProduct) {
      const related = products.filter(
        (item) =>
          item.category === selectedProduct.category &&
          item.id !== selectedProduct.id
      );
      setRelatedProducts(related);
    }
  }, [selectedProduct]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName || "Product"} />
      {selectedProduct && (
        <>
          <ProductDetails selectedProduct={selectedProduct} />
          <ProductReviews selectedProduct={selectedProduct} />
        </>
      )}
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
          <ShopList productItems={relatedProducts} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Product;
