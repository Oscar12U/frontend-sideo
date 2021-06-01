import { Button, Col, Row, Container } from "react-bootstrap";
import React from "react";
import TopMenuBar from "../components/TopMenuBar"

const Temporada = () => {
  return (
    <>
  <TopMenuBar></TopMenuBar>
      <br></br>
      <Container fluid="md">
        <input md="auto" type="text" id="fname" name="fname"></input>
        <Button variant="primary ml-2" md="auto">
          Guardar
        </Button>
        <br></br>
      </Container>
      <br></br>
      <br></br>
      <Container fluid="md">
        <Row>
          <Col></Col>
          <Col md="center">
            <Button variant="primary ml-2" md="auto">
              Crear Partido
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <Row>
          <Col></Col>
          <Col md="center">
            <Button variant="primary ml-2" md="auto">
              Estadisticas de Temporada
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <Row>
          <Col></Col>
          <Col md="center">
            <Button variant="primary ml-2" md="auto">
              Crear Entrenamiento
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <Row>
          <Col></Col>
          <Col md="center">
            <Button variant="primary ml-2" md="auto">
              Gestionar Partido
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default Temporada;
