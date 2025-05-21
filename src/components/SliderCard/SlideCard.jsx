import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // 👈 Add navigation hook
import "./slidercard.css";

const SlideCard = ({ title, desc, cover, category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <Container className="box">
      <Row>
        <Col md={6}>
          <h1>{title}</h1>
          <p>{desc}</p>
          <button className="btn-primary" onClick={handleClick}>
            Visit Collections
          </button>
        </Col>
        <Col md={6}>
          <img src={cover} alt={title} />
        </Col>
      </Row>
    </Container>
  );
};

export default SlideCard;
