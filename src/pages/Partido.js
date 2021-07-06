import React, { useEffect } from "react";
import Timer from "../components/Timer";
import axios from "axios";
import JugadoresJuego from "../components/JugadoresJuego";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import TopMenuBar from "../components/TopMenuBar";
import PartidoIcon from "@material-ui/icons/SportsSoccer";
import TeamIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Divider,
  Paper,
  Typography,
  Tab,
  Tabs,
  AppBar,
} from "@material-ui/core";
import GestorPartido from "../containers/GestorPartido";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  pr: {
    top: "100px",
  },
  p1: {
    fontSize: "25px",
    color: "#000000",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  p2: {
    fontSize: "20px",
    color: "#000000",
    font: "Bold",
  },
  p3: {
    fontSize: "15px",
    color: "#000000",
    font: "Bold",
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [periodo, setPeriodo] = React.useState(0);
  const [counter, setCounter] = React.useState(null);
  const [selectIndexTitular, setSelectIndexTitular] = React.useState(-1);
  const [selectIndexSustituto, setSelectIndexSustituto] = React.useState(-1);
  const [selectIndexEntra, setSelectIndexEntra] = React.useState(-1);
  const [selectIndexAsistente, setSelectIndexAsistente] = React.useState(-1);
  let gestorPartido = new GestorPartido("Partido 1");
  const [jugadoresTitulares, setJugadoresTitulares] = React.useState([]);
  const [jugadoresSustitutos, setJugadoresSustitutos] = React.useState([]);
  const [timeJugadores, setTimeJugadores] = React.useState([]);
  const [partidoObjct, setPartidoObjct] = React.useState([]);

  useEffect(() => {
    actualizarJugadoresBD();
    obtenerDetallesPartido();
    console.log("enta a pedir");
  }, []);

  function actualizarJugadoresBD() {
    axios
      .get(`http://localhost:3000/api/jugadores`)
      .then((resultado) => {
        let jugadoresList = resultado.data.data;
        let listEnJuego = [];
        let listFueraJuego = [];
        jugadoresList.forEach((element) => {
          if (element.jugando) {
            listEnJuego.push(element.nombre);
          } else if (element.convocado) {
            listFueraJuego.push(element.nombre);
          }
        });
        setJugadoresTitulares(listEnJuego);
        setJugadoresSustitutos(listFueraJuego);
      })
      .catch((err) => {});
  }

  function obtenerDetallesPartido() {
    axios
      .get(
        `http://localhost:3000/api/detallesPartido/${gestorPartido._nombrePartido}`
      )
      .then((resultado) => {
        setPartidoObjct(resultado.data.data);
      })
      .catch((err) => {});
  }
  function obtenerTiempoJugadores() {
    let listTiempos = [];
    let storedListTiempos = localStorage.getItem("listaTiempos");
    if (storedListTiempos != null) {
      let lista = JSON.parse(storedListTiempos);

      lista.forEach((element) => {
        listTiempos.push(element);
        console.log(element);
      });
      //this.setState({ listComentario: listaComenatriosObject });
      console.log(listTiempos);
    }
    return listTiempos;
  }

  const agregarTiempoJugador = (jugador, tiempoCambiado) => {
    let tiemposJugadores = timeJugadores;

    let objctTiempoJugador = { nombre: jugador, tiempo: tiempoCambiado };
    tiemposJugadores.push(objctTiempoJugador);
    this.setState({
      timeJugadores: tiemposJugadores,
    });
    localStorageListTiempos(tiemposJugadores);
    setTimeJugadores(tiemposJugadores);
  };

  const localStorageListTiempos = (listComentarios) => {
    localStorage.setItem("listaTiempos", JSON.stringify(listComentarios));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("listaTiempos");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInitTimer = () => {
    if (counter) {
      pauseTimer();
    } else {
      setCounter(
        setInterval(() => {
          setTime((time) => time + 1);
        }, 1000)
      );
    }
  };

  const handleEndPeriodo = () => {
    setPeriodo(periodo + 1);
    //(time) => time + 1
  };

  const CrearPartido = () => {
    gestorPartido.crearPartido();
  };

  const ActionGolFavor = () => {
    Notification.fire({
      icon: "success",
      title: `Gol agregado a ${jugadoresTitulares[selectIndexTitular]} `,
    }).then((result) => {
      if (result.isConfirmed) {
        AddGolFavor();
      } else if (result.isDenied) {
        console.log("Goooool Cancelado");
      } else {
        AddGolFavor();
      }
    });
  };

  const ActionGolContra = () => {
    Notification.fire({
      icon: "success",
      title: `Gol en contra agregado`,
    }).then((result) => {
      if (result.isConfirmed) {
        AddGolContra();
      } else if (result.isDenied) {
        //
        console.log("Goooool en Contra Cancelado");
      } else {
        AddGolContra();
      }
    });
  };

  const ActionLesion = () => {
    Notification.fire({
      icon: "success",
      title: `Lesión agregada a ${jugadoresTitulares[selectIndexTitular]} `,
    }).then((result) => {
      if (result.isConfirmed) {
        AddLesion();
      } else if (result.isDenied) {
        console.log("Lesioooooooon Cancelada");
      } else {
        AddLesion();
      }
    });
  };

  const ActionFalta = () => {
    Notification.fire({
      icon: "success",
      title: `Falta agregada a ${jugadoresTitulares[selectIndexTitular]} `,
    }).then((result) => {
      if (result.isConfirmed) {
        AddFalta();
      } else if (result.isDenied) {
        console.log("Lesioooooooon Cancelada");
      } else {
        AddFalta();
      }
    });
  };

  const ActionCambio = () => {
    Notification.fire({
      icon: "success",
      title: `Entra: ${jugadoresSustitutos[selectIndexEntra]} Sale: ${jugadoresTitulares[selectIndexSustituto]}`,
    }).then((result) => {
      if (result.isConfirmed) {
        CambioJugador();
      } else if (result.isDenied) {
        console.log("Cambio Cancelado");
      } else {
        CambioJugador();
      }
    });
  };

  const Notification = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: true,
    showCancelButton: false,
    showDenyButton: true,
    denyButtonText: `Cancelar`,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const pauseTimer = () => {
    clearInterval(counter);
    setCounter(null);
  };

  const handleClearTimer = () => {
    console.log("Handle Clear desde Partido");
    setTime(0);
    clearInterval(counter);
    setCounter(null);
  };

  //Cambios en los DropDowns
  const handleMenuTitularClick = (event, index) => {
    setSelectIndexTitular(index);
  };
  const handleMenuSustitutoClick = (event, index) => {
    setSelectIndexSustituto(index);
  };
  const handleMenuEntraClick = (event, index) => {
    setSelectIndexEntra(index);
  };
  const handleMenuAsistenteClick = (event, index) => {
    setSelectIndexAsistente(index);
  };

  const getAsistentes = (option, index) => {
    if (index !== selectIndexTitular) {
      return (
        <Dropdown.Item
          key={index}
          selected={index === selectIndexAsistente}
          onClick={(event) => handleMenuAsistenteClick(event, index)}
        >
          {option}
        </Dropdown.Item>
      );
    }
  };

  const CambioJugador = () => {
    gestorPartido.cambiarJugador(
      jugadoresSustitutos[selectIndexEntra],
      jugadoresTitulares[selectIndexSustituto]
    );
  };

  const AddGolFavor = () => {
    gestorPartido.agregarGolFavor(
      jugadoresTitulares[selectIndexTitular],
      jugadoresTitulares[selectIndexAsistente],
      time,
      periodo
    );
  };

  const AddGolContra = () => {
    gestorPartido.agregarGolContra();
  };

  const VerificarGol = () => {
    if (document.getElementById("A favor").checked) {
      ActionGolFavor();
    } else if (document.getElementById("En contra").checked) {
      ActionGolContra();
    }
  };

  const AddFalta = () => {
    gestorPartido.agregarFalta(jugadoresTitulares[selectIndexTitular]);
  };

  const AddLesion = () => {
    //Validar que index sea diferente de -1

    gestorPartido.agregarLesion(
      jugadoresTitulares[selectIndexTitular],
      document.getElementById("descLesion").value
    );
  };

  return (
    <Box
      sx={{ pb: 7 }}
      style={{
        //border: "3px solid #456990",
        backgroundColor: "#FFFFFF",
      }}
    >
      <TopMenuBar></TopMenuBar>

      <AppBar style={{ position: "relative" }} color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab label="Partido" icon={<PartidoIcon />} />
          <Tab label="Equipo" icon={<TeamIcon />} />
          <Tab
            label="Notificaciones"
            icon={
              <Badge badgeContent={3} color="primary">
                <NotificationsIcon />
              </Badge>
            }
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container
          style={{
            //border: "3px solid #456990",
            margin: "30px auto",
            backgroundColor: "#005da4",
            borderRadius: "15px",
          }}
          elevation={3}
        >
          <br />
          <div>
            <Paper
              elevation={0}
              borderRadius={50}
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: "15px",
              }}
            >
              <Row style={{ margin: "auto 20px" }}>
                <Col sm="6" style={{}}>
                  <div className={classes.p1}>Detalles del Partido</div>
                  <br></br>
                  <div className={classes.p2}>
                    Partido Contra:<br></br> {partidoObjct.descripcion}
                  </div>
                  <div className={classes.p3}>
                    Temporada:<br></br> 1
                  </div>
                  <div className={classes.p3}>
                    Periodo Actual Partido:<br></br> {periodo}
                  </div>
                  <div className={classes.p3}>
                    UCR Tacares:<br></br> {partidoObjct.cantGolesFavor}
                    Universidad Nacional {partidoObjct.cantGolesContra}
                  </div>
                  <div className={classes.p3}>
                    Cantidad de Faltas:<br></br> {partidoObjct.faltas}
                  </div>
                </Col>
                <Col
                  sm="6"
                  style={{
                    font: "bold",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className={classes.p1}>Tiempo del partido</div>
                  <br></br>
                  <Timer
                    handleTime={handleInitTimer}
                    handleClearTimer={handleClearTimer}
                    handleEndPeriodo={handleEndPeriodo}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  />
                  <br></br>
                </Col>
              </Row>
            </Paper>
          </div>
          <br />
          <Row
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#000000",
              fontWeight: "bold",
              margin: "auto",
            }}
          >
            <Container
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",
                backgroundColor: "#FFFFFF",
                borderRadius: "15px",
              }}
            >
              <br />

              <br />
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Col>
                  <div
                    className={classes.p1}
                    style={{
                      color: "#000000",
                    }}
                  >
                    Seleccionar Jugador
                  </div>
                  <Dropdown as={ButtonGroup}>
                    <Button id="btnMenuTitular">
                      {""}
                      {selectIndexTitular === -1
                        ? "Seleccionar Jugador"
                        : jugadoresTitulares[selectIndexTitular]}
                    </Button>
                    <Dropdown.Toggle split id="dropdown-custom-2" />
                    <Dropdown.Menu className="super-colors">
                      {jugadoresTitulares.map((option, index) => (
                        <Dropdown.Item
                          key={index}
                          selected={index === selectIndexTitular}
                          onClick={(event) =>
                            handleMenuTitularClick(event, index)
                          }
                        >
                          {option}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <br />
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Col>
                  <div
                    className={classes.p1}
                    style={{
                      color: "#000000",
                    }}
                  >
                    Seleccionar Jugador Asistente
                  </div>
                  <Dropdown as={ButtonGroup}>
                    <Button id="btnAsistente">
                      {""}
                      {selectIndexAsistente === -1
                        ? "Seleccionar Jugador"
                        : jugadoresTitulares[selectIndexAsistente]}
                    </Button>
                    <Dropdown.Toggle split id="dropdown-custom-2" />
                    <Dropdown.Menu className="super-colors">
                      {jugadoresTitulares.map((option, index) =>
                        getAsistentes(option, index)
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>

              <br />
              <Divider variant="middle" />

              <Row>
                <Col
                  md={3}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "center",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "15px",
                  }}
                >
                  <br></br>
                  <Button variant="primary" size="lg" onClick={VerificarGol}>
                    Gol
                  </Button>{" "}
                  <br></br>
                  <Form
                    style={{
                      marginTop: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "center",
                    }}
                  >
                    {["A favor", "En contra"].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          name="group1"
                          type={"radio"}
                          id={`${type}`}
                          label={`${type}`}
                        />
                      </div>
                    ))}
                  </Form>
                </Col>

                <Col
                  md={3}
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "center",
                  }}
                >
                  <br />
                  <Button
                    variant="primary"
                    style={{
                      margin: "5px",
                    }}
                    size="lg"
                    onClick={ActionFalta}
                  >
                    Falta
                  </Button>
                  <Form
                    style={{
                      marginTop: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "center",
                    }}
                  >
                    {["A favor", "En contra"].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          name="group1"
                          type={"radio"}
                          id={`${type}`}
                          label={`${type}`}
                        />
                      </div>
                    ))}
                  </Form>
                </Col>
                <Col
                  md={6}
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "center",
                  }}
                >
                  <Container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <br />
                    <br />
                    <Form>
                      <Form.Group>
                        <Form.Label>Descripción Lesión</Form.Label>
                        <Form.Control
                          id="descLesion"
                          placeholder="Descripción de la lesión"
                        />
                      </Form.Group>
                    </Form>

                    <Button
                      variant="primary"
                      style={{
                        margin: "5px",
                      }}
                      size="lg"
                      onClick={ActionLesion}
                    >
                      Lesion
                    </Button>
                  </Container>
                </Col>
              </Row>
              <br />
            </Container>
            <br />

            <Container
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",
              }}
            >
              <br />
              <Row>
                <Col
                  md={6}
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "center",
                  }}
                >
                  <div
                    className={classes.p1}
                    style={{
                      color: "#FFFFFF",
                    }}
                  >
                    Jugador Entra
                  </div>
                  <Dropdown as={ButtonGroup}>
                    <Button id="btnMenuEntra">
                      {""}
                      {selectIndexEntra === -1
                        ? "Seleccionar Jugador"
                        : jugadoresSustitutos[selectIndexEntra]}
                    </Button>
                    <Dropdown.Toggle split id="dropdown-custom-2" />
                    <Dropdown.Menu className="super-colors">
                      {jugadoresSustitutos.map((option, index) => (
                        <Dropdown.Item
                          key={index}
                          selected={index === selectIndexEntra}
                          onClick={(event) =>
                            handleMenuEntraClick(event, index)
                          }
                        >
                          {option}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <br></br>
                </Col>
                <Col
                  md={6}
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "center",
                  }}
                >
                  <div
                    className={classes.p1}
                    style={{
                      color: "#FFFFFF",
                    }}
                  >
                    Jugador Sale
                  </div>
                  <Dropdown as={ButtonGroup}>
                    <Button id="btnMenuSale">
                      {""}
                      {selectIndexSustituto === -1
                        ? "Seleccionar Jugador"
                        : jugadoresTitulares[selectIndexSustituto]}
                    </Button>
                    <Dropdown.Toggle split id="dropdown-custom-2" />
                    <Dropdown.Menu className="super-colors">
                      {jugadoresTitulares.map((option, index) => (
                        <Dropdown.Item
                          key={index}
                          selected={index === selectIndexSustituto}
                          onClick={(event) =>
                            handleMenuSustitutoClick(event, index)
                          }
                        >
                          {option}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <br />

              <Button
                variant="primary"
                style={{
                  margin: "5px",
                }}
                size="lg"
                onClick={ActionCambio}
              >
                Ejecutar Cambio
              </Button>
            </Container>
          </Row>
          <br></br>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JugadoresJuego />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
