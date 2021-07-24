import React, { memo, useEffect } from "react";
import Jugador from "./Jugador";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Container, Row, Col, Form } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";

const JugadoresJuego = ({ partido }) => {
  const [jugadoresTitulares, setJugadoresTitulares] = React.useState([]);
  const [jugadoresSustitutos, setJugadoresSustitutos] = React.useState([]);
  const [jugadoresFuera, setJugadoresFuera] = React.useState([]);
  const [nombrePartido, setNombrePartido] = React.useState(partido);

  useEffect(() => {
    actualizarJugadoresBD();
    console.log("actualizando JugadoresBD");
  }, []);

  function actualizarJugadoresBD() {
    axios
      .get(`https://backend-sideo.herokuapp.com/api/jugadores`)
      .then((resultado) => {
        let jugadoresList = resultado.data.data;
        let listEnJuego = [];
        let listSustitutos = [];
        let listNoConvocados = [];
        jugadoresList.forEach((element) => {
          if (element.jugando) {
            listEnJuego.push(element.nombre);
          } else if (element.convocado) {
            listSustitutos.push(element.nombre);
          } else {
            listNoConvocados.push(element.nombre);
          }
        });
        setJugadoresTitulares(listEnJuego);
        setJugadoresSustitutos(listSustitutos);
        setJugadoresFuera(listNoConvocados);
      })
      .catch((err) => { });
  }

  const actualizarJugadoresJuego = (newJugador, recienAgregado) => {
    setJugadoresTitulares([...jugadoresTitulares, newJugador]);

    if (recienAgregado) {
      let pos = jugadoresFuera.indexOf(newJugador);
      jugadoresFuera.splice(pos, 1);
    } else {
      let pos = jugadoresSustitutos.indexOf(newJugador);
      jugadoresSustitutos.splice(pos, 1);
    }
  };
  const QuitJugadorTitular = (newJugador) => {
    setJugadoresSustitutos([...jugadoresSustitutos, newJugador]);
    let pos = jugadoresTitulares.indexOf(newJugador);
    jugadoresTitulares.splice(pos, 1);

    axios
      .post(`https://backend-sideo.herokuapp.com/api/quitJugador`, {
        nombreJugador: newJugador,
      })
      .then((resultado) => { })
      .catch((err) => { });
  };

  const AddJugadorTitular = (jugador, recienAgregado) => {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/addJugador`, {
        nombreJugador: jugador,
        nombrePartido: nombrePartido,
        titular: true,
      })
      .then((resultado) => { })
      .catch((err) => { });

    actualizarJugadoresJuego(jugador, recienAgregado);
  };

  const AddJugadorSustituto = (newJugador) => {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/addJugador`, {
        nombreJugador: newJugador,
        nombrePartido: nombrePartido,
        titular: false,
      })
      .then((resultado) => { })
      .catch((err) => { });

    setJugadoresSustitutos([...jugadoresSustitutos, newJugador]);
    let pos = jugadoresFuera.indexOf(newJugador);
    jugadoresFuera.splice(pos, 1);
  };

  const RemoveJugador = (newJugador, titular) => {
    setJugadoresFuera([...jugadoresFuera, newJugador]);
    if (titular) {
      let pos = jugadoresTitulares.indexOf(newJugador);
      jugadoresTitulares.splice(pos, 1);
    } else {
      let pos = jugadoresSustitutos.indexOf(newJugador);
      jugadoresSustitutos.splice(pos, 1);
    }

    axios
      .post(`https://backend-sideo.herokuapp.com/api/removeJugadorPartido`, {
        nombreJugador: newJugador,
        nombrePartido: nombrePartido,
      })
      .then((resultado) => { })
      .catch((err) => { });
  };

  return (
    <>
      <Container
        fluid="md"
        style={{
          marginTop: "40px",
          backgroundImage: "linear-gradient( #00233D, #33A7FF)",
          borderRadius: "15px",
        }}
      >
        <Container
          fluid="md"
          style={{
            marginTop: "40px",
          }}
        >
          <br />
          <h2
            style={{
              margin: "30px auto",
              color: "#ffffff",
              maxWidth: "500px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontWeight: "Bold",
            }}
          >
            Jugadores Titulares
          </h2>
        </Container>
        <Row style={{}}>
          {jugadoresTitulares.map((jugador, index) => {
            return (
              <Card
                style={{
                  margin: "30px auto",
                  backgroundColor: "#ffffff",
                  maxWidth: "250px",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <CardContent
                  style={{
                    backgroundColor: "#FFFFFF",
                    maxWidth: "250px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <>
                    <Jugador
                      style={{
                        backgroundColor: "#DE1A1A",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        display: "flex",
                        color: "#FFFFFF",
                      }}
                      key={index}
                      jugador={jugador}
                    />
                    <Divider
                      style={{
                        backgroundColor: "#000000",
                      }}
                    />
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#005da4",
                      }}
                      className="btn btn-secondary"
                      variant="contained"
                      onClick={() => QuitJugadorTitular(jugador)}
                    >
                      Agregar Jugador Sustituto
                    </Button>
                    <br />
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#DE1A1A",
                        alignItems: "center",
                        color: "#FFFFFF",
                      }}
                      className="btn btn-secondary"
                      variant="contained"
                      onClick={() => RemoveJugador(jugador, true)}
                    >
                      Sacar de la Convocatoria
                    </Button>
                  </>

                  <br />

                  {/* <a
                    style={{
                      backgroundColor: "#005da4",
                    }}
                    href="#"
                    className="btn btn-secondary"
                    id="botton1"
                  >
                    Ver
                  </a> */}
                </CardContent>
                <CardActions
                  style={{
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {/* <Button
                    variant="contained"
                    color="default"
                    // onClick={() => notificacionEliminar(jugador._id)}
                    style={{
                      backgroundColor: "#DE1A1A",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      color: "#FFFFFF",
                    }}
                  >
                    Eliminar
                  </Button> */}
                </CardActions>
              </Card>
            );
          })}
        </Row>
      </Container>
      <Container
        fluid="md"
        style={{
          marginTop: "40px",
          backgroundImage: "linear-gradient( #00233D, #33A7FF)",
          borderRadius: "15px",
        }}
      >
        <Container
          fluid="md"
          style={{
            marginTop: "40px",
          }}
        >
          <br />
          <h2
            style={{
              margin: "30px auto",
              color: "#ffffff",
              maxWidth: "500px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontWeight: "Bold",
            }}
          >
            Jugadores Sustitutos
          </h2>
        </Container>
        <Row style={{}}>
          {jugadoresSustitutos.map((jugador, index) => {
            return (
              <Card
                style={{
                  margin: "30px auto",
                  backgroundColor: "#ffffff",
                  maxWidth: "250px",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <CardContent
                  style={{
                    backgroundColor: "#FFFFFF",
                    maxWidth: "250px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <>
                    <Jugador key={index} jugador={jugador} />
                    <Divider
                      style={{
                        backgroundColor: "#000000",
                      }}
                    />
                    <br />

                    <Button
                      style={{
                        backgroundColor: "#005da4",
                      }}
                      className="btn btn-secondary"
                      variant="contained"
                      onClick={() => AddJugadorTitular(jugador, false)}
                    >
                      Agregar Jugador Titular
                    </Button>
                    <br />
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#DE1A1A",
                        alignItems: "center",
                        color: "#FFFFFF",
                      }}
                      className="btn btn-secondary"
                      variant="contained"
                      onClick={() => RemoveJugador(jugador, false)}
                    >
                      Sacar de la Convocatoria
                    </Button>
                  </>

                  <br />
                </CardContent>
                <CardActions
                  style={{
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                ></CardActions>
              </Card>
            );
          })}
        </Row>
      </Container>
      {/* <h2>Jugadores Titulares</h2>
      {jugadoresTitulares.map((jugador, index) => {
        return (
          <>
            <Jugador key={index} jugador={jugador} />
            <Button
              variant="contained"
              color="gray"
              onClick={() => QuitJugadorTitular(jugador)}
            >
              Agregar Jugador Sustituto
            </Button>
            <Button
              variant="contained"
              color="gray"
              onClick={() => RemoveJugador(jugador, true)}
            >
              Sacar de la Convocatoria
            </Button>
          </>
        );
      })} */}
      {/* <h2>Jugadores Sustitutos</h2>
      {jugadoresSustitutos.map((jugador, index) => {
        return (
          <>
            <Jugador key={index} jugador={jugador} />
            <Button
              variant="contained"
              color="gray"
              onClick={() => AddJugadorTitular(jugador, false)}
            >
              Agregar Jugador Titular
            </Button>
            <Button
              variant="contained"
              color="gray"
              onClick={() => RemoveJugador(jugador, false)}
            >
              Sacar de la Convocatoria
            </Button>
          </>
        );
      })} */}

      <Container
        fluid="md"
        style={{
          marginTop: "40px",
          backgroundImage: "linear-gradient( #00233D, #33A7FF)",
          borderRadius: "15px",
        }}
      >
        <Container
          fluid="md"
          style={{
            marginTop: "40px",
          }}
        >
          <br />
          <h2
            style={{
              margin: "30px auto",
              color: "#ffffff",
              maxWidth: "500px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontWeight: "Bold",
            }}
          >
            Jugadores No Convocados
          </h2>
        </Container>
        <Row style={{}}>
          {jugadoresFuera.map((jugador, index) => {
            return (
              <Card
                style={{
                  margin: "30px auto",
                  backgroundColor: "#ffffff",
                  maxWidth: "250px",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <CardContent
                  style={{
                    backgroundColor: "#FFFFFF",
                    maxWidth: "250px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <>
                    <Jugador key={index} jugador={jugador} />
                    <Divider
                      style={{
                        backgroundColor: "#000000",
                      }}
                    />
                    <br />

                    <Button
                      style={{
                        backgroundColor: "#005da4",
                      }}
                      className="btn btn-secondary"
                      variant="contained"
                      onClick={() => AddJugadorTitular(jugador, true)}
                    >
                      Agregar Jugador Titular
                    </Button>
                    <br />
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#DE1A1A",
                        alignItems: "center",
                        color: "#FFFFFF",
                      }}
                      className="btn btn-secondary"
                      variant="contained"
                      onClick={() => AddJugadorSustituto(jugador)}
                    >
                      Agregar Jugador Sustituto
                    </Button>
                  </>

                  <br />
                </CardContent>
                <CardActions
                  style={{
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                ></CardActions>
              </Card>
            );
          })}
        </Row>
      </Container>

      {/* <h2>Jugadores No Convocados</h2>
      {jugadoresFuera.map((jugador, index) => {
        return (
          <>
            <Jugador key={index} jugador={jugador} />
            <Button
              variant="contained"
              color="gray"
              onClick={() => AddJugadorTitular(jugador, true)}
            >
              Agregar Jugador Titular
            </Button>
            <Button
              variant="contained"
              color="gray"
              onClick={() => AddJugadorSustituto(jugador)}
            >
              Agregar Jugador Sustituto
            </Button>
          </>
        );
      })} */}
    </>
  );
};

export default withRouter(JugadoresJuego);
