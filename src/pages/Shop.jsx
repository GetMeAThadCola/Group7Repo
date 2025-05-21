import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");

  const [filterList, setFilterList] = useState([]);

  useWindowScrollToTop();

  useEffect(() => {
    if (categoryFromURL && categoryFromURL !== "all") {
      const matchedProducts = products.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === categoryFromURL.toLowerCase()
      );
      setFilterList(matchedProducts);
    } else {
      setFilterList(products); // fallback to all products
    }
  }, [categoryFromURL]);

  return (
    <Fragment>
      <Banner title="Product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} />
            </Col>
          </Row>
        </Container>
        <Container>
          {filterList.length > 0 ? (
            <ShopList productItems={filterList} />
          ) : (
            <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
              No products found
            </h2>
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
