import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { auth } from '../firebase';
import { Container } from 'react-bootstrap';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
            return setError('La contraseña no coincide')
        }

        try {
            setError('')
            setLoading(true)
            await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            window.location.href = ("/iniciarSesion")
        } catch {
            setError('Fallo al crear una cuenta')
        }
        setLoading(false)
    }

    return (
        <>
            <Container style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",

            }}>
                <Row>
                    <Col sm={4}>

                    </Col>
                    <Col sm={4}>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Registrarse</h2>
                                {error && <Alert variant='danger'>{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" ref={emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" ref={passwordRef} required />
                                    </Form.Group>
                                    <Form.Group id="password-confirm">
                                        <Form.Label>Confirmación de contraseña</Form.Label>
                                        <Form.Control type="password" ref={passwordConfirmRef} required />
                                    </Form.Group>
                                    <Button disabled={loading} className="w-100" type="Submit">Registrarse</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={4}>

                    </Col>
                </Row>

            </Container>
        </>
    )
}