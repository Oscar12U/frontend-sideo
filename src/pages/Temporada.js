import { Button, Col, Row, Container } from "react-bootstrap";
import React from "react";
const Temporada = () => {
  return (
    <>
      <Container fluid="md">
        <br></br>
        <Row>
        <Col className="justify-content-md-center"></Col>
          <Col className="justify-content-md-center">
            <label> Buscar: </label>
            <Button variant="primary">Buscar</Button>
          </Col>
          <Col className="justify-content-md-center"></Col>
        </Row>
      </Container>
      <br></br>
      <Container fluid="md">
        <Row>
        <Col className="justify-content-md-center"></Col>
          <Col className="justify-content-md-center">Aquí va la Tabla</Col>
          <Col className="justify-content-md-center"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Temporada;
