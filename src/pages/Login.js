import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import 'firebase/auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IniciarSesion from '../components/IniciarSesion';

const Login = () => {
    return (
        <>
            <Container className="d-flex align-items.center
            justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Router>
                        <Switch>
                            {/* <Route path="/login" component={LoginComponent} /> */}
                            <Route path="/iniciarSesion" component={IniciarSesion} />
                            {/* <Route path="recuperarContrasena" component={RecuperarContrasena}></Route> */}
                        </Switch>
                    </Router>

                    {/* <IniciarSesion></IniciarSesion> */}
                </div>

            </Container>


        </>
    );
};

export default Login;