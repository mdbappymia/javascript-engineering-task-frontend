import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ScreenA from "../ScreenA/ScreenA";
import ScreenB from "../ScreenB/ScreenB";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <ScreenA></ScreenA>
        </Col>
        <Col>
          <ScreenB />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
