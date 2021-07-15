import React, { useState } from "react";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { auth } from "../firebase";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

export default function IniciarSesion() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = useState(null);
  const emailSend = email;
  const signInWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();

    auth
      .setPersistence("session")
      .then(() => {
        return auth
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            auth.onAuthStateChanged(async (userAuth) => {
              sessionStorage.setItem("token", userAuth);
            });

            window.location.href = "/";
          })
          .catch((error) => {
            setError("Error al iniciar sesión. Por favor verifique los datos");
            console.error("Error signing in with password and email", error);
          });
      })
      .catch((error) => {
        setError("Error al iniciar sesión. Por favor verifique los datos");
        console.error("Error al iniciar sesión: ", error);
      });
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  const recuperarContrasena = async () => {
    auth
      .sendPasswordResetEmail(emailSend)
      .then(function (user) {
        console.log("RECUPERÓ");
        setError(
          "Por favor verifique su correo electrónico para poder recuperar la contraseña"
        );
      })
      .catch(function (e) {
        setError("Por favor digite su correo");
      });
  };

  return (
    <>
      <Row>
        <Col sm={2}></Col>

        <Col sm={8}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      className="my-1 p-1 w-full"
                      name="userEmail"
                      value={email}
                      placeholder="E.g: faruq123@gmail.com"
                      id="userEmail"
                      onChange={(event) => onChangeHandler(event)}
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      className="mt-1 mb-3 p-1 w-full"
                      name="userPassword"
                      value={password}
                      placeholder="Your Password"
                      id="userPassword"
                      onChange={(event) => onChangeHandler(event)}
                    />
                  </Form.Group>

                  <Button
                    className="w-100"
                    type="Submit"
                    onClick={(event) => {
                      signInWithEmailAndPasswordHandler(event, email, password);
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <br></br>
                  <br></br>
                  <Button
                    className="w-100"
                    type="Submit"
                    size="sm"
                    onClick={() => recuperarContrasena(email)}
                  >
                    Olvidé la contraseña
                  </Button>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </>
  );
}
IniciarSesion.propTypes = {
  setToken: PropTypes.func.isRequired,
};
