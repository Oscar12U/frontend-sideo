import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import PartidoIcon from "@material-ui/icons/SportsSoccer";
import TeamIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import GestorJugador from "../containers/GestorJugador";
import Swal from "sweetalert2";
import TopMenuBar from "../components/TopMenuBar";
import Divider from "@material-ui/core/Divider";

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
  paper: {
    justifyContent: "center",
    alignItems: "center",
  },
  pr: {
    top: "100px",
  },
}));

const useStyles2 = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MenuJugador = () => {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    axiosConsulta();
  }, []);

  function axiosConsulta() {
    axios
      .get(`https://backend-sideo.herokuapp.com/api/jugadores/`)
      .then((resultado) => {
        const jugadoresList = resultado.data.data;

        setJugadores(jugadoresList);
        //console.log(jugadores[0].nombre);
        //console.log("variablex: " + listaJugadores);
      })
      .catch((err) => { });
  }

  const [jugadores, setJugadores] = React.useState([]);
  const classes = useStyles();
  const [value, setValue] = React.useState(3);
  const [jugador, setJugador] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const EnviarJugador = () => {
    gestorJugador.crearJugador(jugador);

    //console.log(jugador);
  };

  const EliminarJugdador = (jugador) => {
    gestorJugador.eliminarJugador(jugador);
    setTimeout(() => {
      axiosConsulta();
    }, 1000);

    //window.location.reload();
    //console.log("lo borro", jugador);
  };
  //axiosConsulta();
  //prueba

  const notificacionEliminar = (jugador) => {
    Swal.fire({
      title: "¿Esta seguro de borrar este jugador?",
      showDenyButton: true,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        EliminarJugdador(jugador);
        Swal.fire("Jugador Borrado", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Cancelado", "", "error");
      }
    });
  };

  const notificacionAgregar = () => {
    Swal.fire({
      title: "¿Esta seguro de agregar este jugador?",
      showDenyButton: true,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        EnviarJugador();
        Swal.fire("Jugador Agregado", "", "success");
        setJugador("");
      } else if (result.isDenied) {
        Swal.fire("Cancelado", "", "error");
      }
    });
  };

  const bull = <span className={classes.bullet}>•</span>;
  const classes2 = useStyles2();
  let gestorJugador = new GestorJugador();

  return (
    <Box sx={{ pb: 7 }}>
      <TopMenuBar></TopMenuBar>
      <AppBar style={{ position: "relative", bottom: 0 }} color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab label="Añadir Jugador" icon={<PartidoIcon />} />
          <Tab
            label="Lista Jugadores"
            icon={<TeamIcon />}
            onClick={axiosConsulta}
          />
          <Tab label="Volver" icon={<HomeIcon />} href="/" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container
          fluid="md"
          style={{
            margin: "60px auto",
          }}
        >
          <Container
            style={{
              backgroundImage: "linear-gradient(#005da4, #00233D)",
              borderTopRightRadius: "15px",
              borderTopLeftRadius: "15px",
              //backgroundColor: "#005da4",
              maxWidth: "700px",
            }}
          >
            <br />
            <Typography
              style={{
                color: "#FFFFFF",
                fontSize: "25px",
                fontFamily: "Arial",
                fontWeight: "bold",
              }}
              align="center"
            >
              Ingrese el nombre del nuevo jugador a incluir al equipo
            </Typography>
            <br />
          </Container>
          <Container
            style={{
              backgroundImage: "linear-gradient( #00233D, #33A7FF)",
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              //backgroundColor: "#8ed8f8",
              maxWidth: "700px",
            }}
          >
            <Row>
              <Col sm="12">
                <Form align="center">
                  <Form.Label
                    style={{
                      color: "#ffffff",
                      fontSize: "20px",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                    }}
                  >
                    <br />
                    Nombre del Jugador:
                  </Form.Label>

                  {/* <Form.Control
                    controlId="nombreJugador"
                    placeholder="Nombre"
                    style={{
                      width: "55%",
                      align: "center",
                      display: "flex",
                      margin: "10px auto",
                    }}
                    onChange={(event) => setJugador(event.target.value)}
                  /> */}

                  <TextField
                    id="filled-full-width"
                    style={{
                      width: "55%",
                      display: "flex",
                      textColor: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                      marginBottom: "10px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                    //placeholder="Nombre"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    value={jugador}
                    onChange={(event) => setJugador(event.target.value)}
                  />

                  <Button
                    style={{
                      background: "#E6E8E6",
                      color: "#000000",
                      textTransform: "none",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                    onClick={notificacionAgregar}
                  >
                    Agregar
                  </Button>
                </Form>
              </Col>
            </Row>
            <br />
          </Container>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container
          fluid="md"
          style={{
            marginTop: "40px",
            backgroundImage: "linear-gradient( #00233D, #33A7FF)",
            borderRadius: "15px",
          }}
        >
          <Row style={{}}>
            {jugadores
              .filter((jugador) => jugador.activo === true)
              .map((jugador, index) => {
                return (
                  <Card
                    style={{
                      margin: "30px auto",
                      backgroundColor: "#FFFFFF",
                      maxWidth: "250px",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    className={classes2.root}
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
                      <Typography
                        className={classes2.title}
                        color="textSecondary"
                        gutterBottom
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color: "black",
                          fontSize: "20px",
                          fontFamily: "Arial",
                          fontWeight: "bold",
                        }}
                      >
                        {jugador.nombre}
                      </Typography>
                      <Divider />
                      <br />
                      <Link
                        to={{
                          pathname: `/verJugador`,
                          state: { IDJugador: jugador._id },
                        }}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <a
                          style={{
                            backgroundColor: "#005da4",
                          }}
                          href="#"
                          className="btn btn-secondary"
                          id="botton1"
                        >
                          Ver
                        </a>
                      </Link>
                    </CardContent>
                    <CardActions
                      style={{
                        backgroundColor: "#FFFFFF",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="default"
                        onClick={() => notificacionEliminar(jugador._id)}
                        style={{
                          backgroundColor: "#DE1A1A",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color: "#FFFFFF",
                        }}
                      >
                        Eliminar
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
          </Row>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Volviendo a la pagina principal...
      </TabPanel>
      <TabPanel value={value} index={3}>
        Bienvenido a la Sección de Jugadores
      </TabPanel>
    </Box>
  );
};

export default MenuJugador;
