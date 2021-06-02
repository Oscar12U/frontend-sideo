import React from "react";
import { Nav, Card, Button } from "react-bootstrap";

const MenuJugador = () => {


    return (
        <Card>
            <Card.Header>
                <Nav fill variant="pills">
                    <Nav.Item>
                        <Nav.Link href="#first">Añadir Jugador</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link">Ver Lista de Jugadores</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
    </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default MenuJugador;