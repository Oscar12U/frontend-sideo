import React, { useState, useEffect } from "react";
import Timer from "../components/Timer";
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
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Divider,
  Paper,
  Typography,
  Tab,
  Tabs,
  AppBar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  FormGroup,
} from "@material-ui/core";
import axios from "axios";
import { useStopwatch } from "react-timer-hook";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Swal from "sweetalert2";
import GestorEntrenamiento from "../containers/GestorEntrenamiento";
import * as moment from "moment";
import Stopwatch from "../components/Stopwatch";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
    font: "Bold",
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

export default function Entrenamiento() {
  useEffect(() => {
    axiosConsulta();
    axiosConsulta2(IDEntrenamiento);
    rellenarActividadesAuto();
    inicializarTiemposJugadores();
    //console.log(IDEntrenamiento);
  }, []);

  let { IDEntrenamiento } = useLocation().state;
  const classes2 = useStyles2();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tiempo, setTiempo] = React.useState(false);
  const [entrenamiento, setEntrenamiento] = React.useState([]);
  const [jugadores, setJugadores] = React.useState([]);
  const [jugadoresID, setJugadoresID] = React.useState([]);
  const [actividades, setActividades] = React.useState([]);
  const [actividadesAuto, setActividadesAuto] = React.useState([]);
  const [actividadesDisponibles, setActividadesDisponibles] = React.useState(
    []
  );
  const [actividadesDisponiblesBO, setActividadesAutoBO] = React.useState([]);

  const [tiemposJugadores, setTiemposJugadores] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();
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

  function axiosConsulta2(entrenamietoID) {
    axios
      .get(`https://backend-sideo.herokuapp.com/api/entrenamientos/${entrenamietoID}`)
      .then((resultado) => {
        const entrenamieto = resultado.data.data;
        setEntrenamiento(entrenamieto);
        setJugadoresID(entrenamieto.jugadores);
        consultaLesiones(entrenamieto.actividades);
        obtenerActividades(entrenamieto.actividades);
      })
      .catch((err) => { });
  }
  function rellenarActividadesAuto() {
    setActividadesAuto([]);
    actividades.map((actividad) => {
      //console.log("dasdasd");
      setActividadesAuto((actividadesAuto) => [...actividadesAuto, false]);
    });
  }

  function rellenarActividadesDisponibles(actividad1) {
    actividad1.map((actividad) => {
      //console.log("ingreso aqui asedasd");
      setActividadesAutoBO((actividadesDisponiblesBO) => [
        ...actividadesDisponiblesBO,
        false,
      ]);
    });
  }

  function inicializarTiemposJugadores() {
    actividades.map((actividad) => {
      //console.log("dasdasd");
      jugadores
        .filter(
          (jugador) => jugador.activo === true && jugador.entrenando === true
        )
        .map((jugador) => {
          let jugadorTiempo = {
            actividad: actividad.nombre,
            idJugador: jugador._id,
            estado: false,
            tiempoMin: 0,
            tiempoSeg: 0,
            tiempoMili: 0,
          };
          setTiemposJugadores((tiemposJugadores) => [
            ...tiemposJugadores,
            jugadorTiempo,
          ]);
        });
    });
  }

  const iniciarDetenerTiempoJugador = (actividad, idJugador) => {
    tiemposJugadores.map((datos, index) => {
      if (actividad === datos.actividad && idJugador === datos.idJugador) {
        let items = [...tiemposJugadores];
        let item = { ...items[index] };
        item.estado = !item.estado;
        items[index] = item;
        setTiemposJugadores(items);
      }
    });
  };

  function cambiarActividadesAuto(index) {
    let items = [...actividadesAuto];
    let item = { ...items[index] };
    item = true;
    items[index] = item;
    setActividadesAuto(items);

    setTimeout(() => {
      let items = [...actividadesAuto];
      let item = { ...items[index] };
      item = false;
      items[index] = item;
      setActividadesAuto(items);
    }, 1000);
    //document.getElementById("iniciarBTN").style.visibility = "hidden";
  }

  function consultaLesiones(actividades) {
    //console.log("metodos para salsacarasf asf")

    //console.log("Contenido ID", lesionId);
    setActividades([]);
    actividades.map((actividad) => {
      //console.log(lesion);
      axios
        .get(`https://backend-sideo.herokuapp.com/api/actividad/${actividad}`)
        .then((resultado) => {
          const actividades1 = resultado.data.data;
          //setLesiones(listLesiones);
          //console.log("Lista de lesiones", listLesiones);
          //lesionesTotales.push(listLesiones);
          //Lesion.push(listLesiones);
          setActividades((actividades) => [...actividades, actividades1]);
        })
        .catch((err) => { });
    });
  }

  function obtenerActividades(actividades) {
    axios
      .get(`https://backend-sideo.herokuapp.com/api/actividades`)
      .then((resultado) => {
        const actividades1 = resultado.data.data;
        let actividadesNuevas = [];
        actividades1.map((actividad1) => {
          let repetido = 0;
          actividades.map((actividad2) => {
            //console.log("segunda lista", actividad2);
            if (actividad1._id === actividad2) {
              repetido++;
            }
          });

          if (repetido === 0) {
            //console.log("actividad lista nueva", actividad1.nombre);
            actividadesNuevas.push(actividad1);
            //console.log("recien agregada:", actividadesNuevas);
          }
        });
        rellenarActividadesDisponibles(actividadesNuevas);
        setActividadesDisponibles(actividadesNuevas);
      })
      .catch((err) => { });
  }

  const incluirJugador = (jugador) => {
    actividades.map((actividad) => {
      //console.log("dasdasd");

      let jugadorTiempo = {
        actividad: actividad.nombre,
        idJugador: jugador,
        estado: false,
        tiempoMin: 0,
        tiempoSeg: 0,
        tiempoMili: 0,
      };
      setTiemposJugadores((tiemposJugadores) => [
        ...tiemposJugadores,
        jugadorTiempo,
      ]);
    });

    gestorEntrenamiento.agregarJugadorEntrenamiento(jugador, IDEntrenamiento);
    gestorEntrenamiento.entrenandoJugador(jugador);
    setTimeout(() => {
      axiosConsulta();
      axiosConsulta2(IDEntrenamiento);
    }, 1000);
    //window.location.reload();
    //console.log("lo borro", jugador);
  };

  const agregarEntrenamiento = (jugador) => {
    Swal.fire({
      title: "¿Seguro de agregar a este jugador al entrenamiento?",
      showDenyButton: true,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        incluirJugador(jugador);
        Swal.fire("Jugador Agregado", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Cancelado", "", "error");
      }
    });
  };

  const cambioAuto = () => {
    setTiempo(true);
    setTimeout(() => {
      setTiempo(false);
    }, 1000);
  };

  const [open, setOpen] = React.useState(false);
  const [openComentario, setOpenComentarion] = React.useState(false);
  const [openActividad, setOpenActividad] = React.useState(false);

  const [openComentarioActividad, setOpenComentarioActividad] =
    React.useState(false);

  const [incorrecto, setIncorrecto] = React.useState("");
  const [incorrectoSelect1, setIncorrectoSelect1] = React.useState("");

  const [incorrectoSelect2, setIncorrectoSelect2] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIncorrecto("");
    setIncorrectoSelect1("");
    setJugadorLesionado("");
    setDesJugadorLesionado("");
  };

  const handleClickOpenComentario = () => {
    setOpenComentarion(true);
  };

  const handleComentario = () => {
    setOpenComentarion(false);
    setIncorrecto("");
  };

  const handleClickOpenActividad = () => {
    setOpenActividad(true);
  };

  const handleActividad = () => {
    setOpenActividad(false);
    setIncorrectoSelect1("");
    setIncorrectoSelect2("");
    setIncorrecto("");
  };

  const handleClickOpenCometarioActividad = () => {
    setOpenComentarioActividad(true);
  };

  const handleComentarioActividad = () => {
    setOpenComentarioActividad(false);
    setActividadSelecionada("");
    setJugadorLesionado("");
    setComentarioActividad("");
    setIncorrectoSelect1("");
    setIncorrectoSelect2("");
    setIncorrecto("");
  };

  const agregarActividad = () => {
    setOpenActividad(false);
  };

  const enviarLesion = () => {
    if (desJugadorLesionado.length >= 1 && jugadorLesionado.length >= 1) {
      gestorEntrenamiento.enviarLesionJugador(
        desJugadorLesionado,
        jugadorLesionado
      );
      setJugadorLesionado("");
      setDesJugadorLesionado("");
      setIncorrectoSelect1("");
      setIncorrecto("");
      setOpen(false);
    } else {
      if (jugadorLesionado.length >= 1) {
        setIncorrectoSelect1("");
      } else {
        setIncorrectoSelect1("Por Favor Completar todos los Espacios");
      }
      if (desJugadorLesionado.length >= 1) {
        setIncorrecto("");
      } else {
        setIncorrecto("Por Favor Completar todos los Espacios");
      }
    }
  };

  const enviarComentario = () => {
    if (comentarioEntrenamieto.length >= 1) {
      gestorEntrenamiento.enviarComentario(
        IDEntrenamiento,
        comentarioEntrenamieto
      );
      setComentarioEntrenamieto("");
      setOpenComentarion(false);
      setIncorrecto("");
    } else {
      setIncorrecto("Por Favor Completar todos los Espacios");
    }
  };

  const [jugadorLesionado, setJugadorLesionado] = React.useState("");
  const [actividadSelecionada, setActividadSelecionada] = React.useState("");

  const [desJugadorLesionado, setDesJugadorLesionado] = React.useState("");

  const [comentarioEntrenamieto, setComentarioEntrenamieto] =
    React.useState("");
  const [comentarioActividad, setComentarioActividad] = React.useState("");

  const handleJugadorLesionado = (event) => {
    setJugadorLesionado(event.target.value);
    console.log("jugador lesionado: ", jugadorLesionado);
  };

  const handleActividadSelecionada = (event) => {
    setActividadSelecionada(event.target.value);
    //console.log("jugador lesionado: ", jugadorLesionado);
  };

  const handleDesJugadorLesionado = (event) => {
    setDesJugadorLesionado(event.target.value);
    console.log("jugador lesionado: ", desJugadorLesionado);
  };

  const handleDesComentario = (event) => {
    setComentarioEntrenamieto(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const handleDesComentarioActividad = (event) => {
    setComentarioActividad(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const agregarActividadNueva = (actividad) => {
    actividadesDisponiblesBO.map((actividad1, index) => {
      if (actividad1 === true) {
        gestorEntrenamiento.agregarActividadNueva(
          IDEntrenamiento,
          actividadesDisponibles[index]
        );
      }
    });
    setOpenActividad(false);

    setTimeout(() => {
      axiosConsulta();
      axiosConsulta2(IDEntrenamiento);
      rellenarActividadesAuto();
    }, 1000);

    //gestorEntrenamiento.agregarActividadNueva(IDEntrenamiento, actividad);
    //axiosConsulta2(IDEntrenamiento);
  };

  const enviarComentarioActividad = () => {
    //console.log("la actividad es: ", actividad);
    if (
      actividadSelecionada.length >= 1 &&
      jugadorLesionado.length >= 1 &&
      comentarioActividad.length >= 1
    ) {
      gestorEntrenamiento.crearNuevoComentarioActividad(
        IDEntrenamiento,
        actividadSelecionada,
        jugadorLesionado,
        comentarioActividad
      );
      setActividadSelecionada("");
      setJugadorLesionado("");
      setComentarioActividad("");
      setOpenComentarioActividad(false);
      setIncorrecto("");
      setIncorrectoSelect1("");
      setIncorrectoSelect2("");
    } else {
      if (comentarioActividad.length >= 1) {
        setIncorrecto("");
      } else {
        setIncorrecto("Por Favor Completar todos los Espacios");
      }
      if (jugadorLesionado.length >= 1) {
        setIncorrectoSelect1("");
      } else {
        setIncorrectoSelect1("Por Favor Completar todos los Espacios");
      }
      if (actividadSelecionada.length >= 1) {
        setIncorrectoSelect2("");
      } else {
        setIncorrectoSelect2("Por Favor Completar todos los Espacios");
      }
    }
  };

  const finalizarEntrenamieto = () => {
    Swal.fire({
      title: "¿Seguro de terminar el entrenamiento actual?",
      showDenyButton: true,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        gestorEntrenamiento.finalizarEntrenamiento(IDEntrenamiento);
        //window.location.href = "/";
        history.push("/")
      }
    });
  };

  const enviarJustificada = (jugador) => {
    Swal.fire({
      title: "¿Seguro de poner a este jugador en Ausencia Justificada?",
      showDenyButton: true,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        gestorEntrenamiento.ausenciaJustificada(jugador, IDEntrenamiento);
        gestorEntrenamiento.actualizarAusenciaJugador(jugador);
        setTimeout(() => {
          axiosConsulta();
          axiosConsulta2(IDEntrenamiento);
        }, 1000);
      }
    });
  };

  const enviarInjustificada = (jugador) => {
    Swal.fire({
      title: "¿Seguro de poner a este jugador en Ausencia Injustificada?",
      showDenyButton: true,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        gestorEntrenamiento.ausenciaInjustificada(jugador, IDEntrenamiento);
        gestorEntrenamiento.actualizarAusenciaJugador(jugador);
        setTimeout(() => {
          axiosConsulta();
          axiosConsulta2(IDEntrenamiento);
        }, 1000);
      }
    });
  };

  const cambiarActividadesDisponible = (index) => {
    //console.log("lista:", actividadesDisponiblesBO[index]);
    let items = [...actividadesDisponiblesBO];
    let item = { ...items[index] };
    //console.log("me llega un ", item);
    item = !actividadesDisponiblesBO[index];
    //console.log("se va un ", item);
    items[index] = item;
    setActividadesAutoBO(items);
    //console.log(actividadesDisponiblesBO);
  };

  const useStyles3 = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const useStyles8 = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));
  const classes5 = useStyles3();
  const classes8 = useStyles8();

  let gestorEntrenamiento = new GestorEntrenamiento();
  return (
    <Box sx={{ pb: 7 }}>
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
          <Tab label="Entrenamiento" icon={<PartidoIcon />} />
          <Tab label="Actividades" icon={<TeamIcon />} />
          <Tab label="Asistencia" icon={<HowToRegIcon />} />
          <Tab label="Volver" icon={<HomeIcon />} href="/" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container
          fluid="md"
          style={{
            margin: "60px auto",
            backgroundImage: "linear-gradient(#005da4, #00233D)",
            borderRadius: "15px",
          }}
          elevation={3}
        >
          <br></br>
          <Paper
            elevation={3}
            borderRadius={50}
            style={{
              backgroundColor: "#FFFFFF",
            }}
          >
            <Row
              style={{
                margin: "auto 20px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#FFFFFF",
              }}
            >
              <Col sm="6" style={{}}>
                <div className={classes.p1}>
                  Entrenamiento: {entrenamiento.nombre}
                </div>
                <br></br>
                <div className={classes.p2}>
                  Descripcion:<br></br> {entrenamiento.descripcion}
                </div>
                <div className={classes.p3}>
                  Fecha:<br></br>{" "}
                  {moment(entrenamiento.fechaEntrenamiento).format(
                    "DD/MM/YYYY"
                  )}
                </div>
              </Col>
            </Row>
          </Paper>
          <br></br>
          <Container elevation={3}>
            <Row
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#FFFFFF",
                margin: "auto",
              }}
            >
              <Col
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                  backgroundColor: "#00070",
                  borderRadius: "15px",
                }}
              >
                <div
                  className={classes.p1}
                  style={{
                    color: "#FFFFFF",
                  }}
                >
                  Añadir Actividad
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleClickOpenActividad}
                >
                  Actividad Nueva
                </Button>{" "}
                <Dialog
                  open={openActividad}
                  onClose={handleActividad}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  >
                    {"Actividades Nuevas"}
                  </DialogTitle>
                  <DialogContent
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      margin: "10px",
                    }}
                  >
                    <FormControl
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        margin: "10px",
                      }}
                      className={classes8.formControl}
                    ></FormControl>
                    {/* aqui va el checkbox */}
                    <FormControl
                      component="fieldset"
                      className={classes8.formControl}
                    >
                      <FormLabel component="legend">
                        Actividades Disponibles
                      </FormLabel>
                      <FormGroup>
                        {actividadesDisponibles.map((actividad, index) => {
                          return (
                            <>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={actividadesDisponiblesBO[index]}
                                    onChange={() =>
                                      cambiarActividadesDisponible(index)
                                    }
                                    name={actividad.nombre}
                                  />
                                }
                                label={actividad.nombre}
                              />
                            </>
                          );
                        })}
                      </FormGroup>
                    </FormControl>
                  </DialogContent>

                  <DialogActions
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      margin: "10px",
                    }}
                  >
                    <Button onClick={agregarActividadNueva} color="primary">
                      Aceptar
                    </Button>
                    <Button onClick={handleActividad} color="primary">
                      Cancelar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Col>

              <Col
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Container
                  fluid="md"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <div
                    className={classes.p1}
                    style={{
                      color: "#FFFFFF",
                    }}
                  >
                    Comentarios
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleClickOpenComentario}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "25px",
                    }}
                  >
                    Comentario del Entrenamiento
                  </Button>{" "}
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleClickOpenCometarioActividad}
                  >
                    {" "}
                    Comentario de Actividad
                  </Button>{" "}
                  <Dialog
                    open={openComentarioActividad}
                    onClose={handleComentarioActividad}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      {"Comentario Nuevo"}
                    </DialogTitle>
                    <DialogContent
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        margin: "10px",
                      }}
                    >
                      <FormControl className={classes5.formControl}>
                        <Typography
                          style={{
                            alignItems: "center",
                            justifyContent: "center",

                            color: "black",
                            fontSize: "15px",
                            fontFamily: "Arial",
                            textAlign: "center",
                            textJustify: "inter-word",
                            margin: "10px",
                          }}
                        >
                          Seleccione un jugador:
                        </Typography>

                        <InputLabel
                          id="demo-simple-select-label"
                          style={{
                            display: "inline-block",
                            margin: "47px 0",
                          }}
                        >
                          Jugador
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          displayEmpty
                          helperText={incorrectoSelect1}
                          error={incorrectoSelect1}
                          value={jugadorLesionado}
                          onChange={handleJugadorLesionado}
                        >
                          {jugadores
                            .filter(
                              (jugador) =>
                                jugador.activo === true &&
                                jugador.entrenando === true
                            )
                            .map((jugador) => {
                              return (
                                <MenuItem value={jugador._id}>
                                  {jugador.nombre}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                      <FormControl className={classes5.formControl}>
                        <Typography
                          style={{
                            alignItems: "center",
                            justifyContent: "center",

                            color: "black",
                            fontSize: "15px",
                            fontFamily: "Arial",
                            textAlign: "center",
                            textJustify: "inter-word",
                            margin: "10px",
                          }}
                        >
                          Seleccione una actividad:
                        </Typography>

                        <InputLabel
                          id="demo-simple-select-label"
                          style={{
                            display: "inline-block",
                            margin: "47px 0",
                          }}
                        >
                          Actividad
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          displayEmpty
                          helperText={incorrectoSelect2}
                          error={incorrectoSelect2}
                          value={actividadSelecionada}
                          onChange={handleActividadSelecionada}
                        >
                          {actividades.map((actividad) => {
                            return (
                              <MenuItem value={actividad._id}>
                                {actividad.nombre}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <FormControl
                        className={classes5.formControl}
                      ></FormControl>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Comentario de la Actividad"
                        type="email"
                        fullWidth
                        helperText={incorrecto}
                        error={incorrecto}
                        value={comentarioActividad}
                        onChange={handleDesComentarioActividad}
                      />
                    </DialogContent>

                    <DialogActions
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        margin: "10px",
                      }}
                    >
                      <Button
                        onClick={handleComentarioActividad}
                        color="primary"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={enviarComentarioActividad}
                        color="primary"
                      >
                        Aceptar
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={openComentario}
                    onClose={handleComentario}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      {"Comentario Nuevo"}
                    </DialogTitle>
                    <DialogContent
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        margin: "10px",
                      }}
                    >
                      <FormControl
                        className={classes5.formControl}
                      ></FormControl>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Comentario del Entrenamiento"
                        type="email"
                        fullWidth
                        helperText={incorrecto}
                        error={incorrecto}
                        value={comentarioEntrenamieto}
                        onChange={handleDesComentario}
                      />
                    </DialogContent>

                    <DialogActions
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        margin: "10px",
                      }}
                    >
                      <Button onClick={handleComentario} color="primary">
                        Cancelar
                      </Button>
                      <Button
                        onClick={enviarComentario}
                        color="primary"
                        autoFocus
                      >
                        Aceptar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Container>
              </Col>
              <Col>
                <Container
                  fluid="md"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <Col
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  >
                    <div
                      className={classes.p1}
                      style={{
                        color: "#FFFFFF",
                      }}
                    >
                      Añadir Lesion a Jugador
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleClickOpen}
                    >
                      Lesion
                    </Button>{" "}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          margin: "auto",
                        }}
                      >
                        {"Lesion Nueva"}
                      </DialogTitle>
                      <DialogContent
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          margin: "10px",
                        }}
                      >
                        <FormControl className={classes5.formControl}>
                          <Typography
                            style={{
                              alignItems: "center",
                              justifyContent: "center",

                              color: "black",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              textAlign: "center",
                              textJustify: "inter-word",
                              margin: "10px",
                            }}
                          >
                            Seleccione un jugador:
                          </Typography>

                          <InputLabel
                            id="demo-simple-select-label"
                            style={{
                              display: "inline-block",
                              margin: "47px 0",
                            }}
                          >
                            Jugador
                          </InputLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            displayEmpty
                            helperText={incorrectoSelect1}
                            error={incorrectoSelect1}
                            value={jugadorLesionado}
                            onChange={handleJugadorLesionado}
                          >
                            {jugadores
                              .filter(
                                (jugador) =>
                                  jugador.activo === true &&
                                  jugador.entrenando === true
                              )
                              .map((jugador) => {
                                return (
                                  <MenuItem value={jugador._id}>
                                    {jugador.nombre}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Descripcion de la lesion"
                          type="email"
                          fullWidth
                          helperText={incorrecto}
                          error={incorrecto}
                          value={desJugadorLesionado}
                          onChange={handleDesJugadorLesionado}
                        />
                      </DialogContent>

                      <DialogActions
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          margin: "10px",
                        }}
                      >
                        <Button onClick={handleClose} color="primary">
                          Cancelar
                        </Button>
                        <Button
                          onClick={enviarLesion}
                          color="primary"
                          autoFocus
                        >
                          Aceptar
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Col>
                </Container>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <Row
              style={{
                margin: "auto 20px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#FFFFFF",
              }}
            >
              <Container
                fluid="md"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Button
                  variant="warning"
                  size="lg"
                  onClick={finalizarEntrenamieto}
                >
                  {" "}
                  Finalizar Entrenamiento
                </Button>{" "}
              </Container>
            </Row>
          </Container>
          <br></br>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {actividades.map((actividad, index) => {
          return (
            <>
              <Container
                fluid="md"
                style={{
                  margin: "60px auto",
                  backgroundColor: "lightblue",
                  borderRadius: "15px",
                  backgroundImage: "linear-gradient(#005da4, #00233D)",
                }}
              >
                <Row
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    borderRadius: "15px",
                    font: "bold",
                  }}
                >
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      fontSize: "25px",
                      fontFamily: "Arial",
                      textAlign: "center",
                      textJustify: "inter-word",
                      fontWeight: "bold",
                      color: "#FFFFFF",
                    }}
                  >
                    Actividad: {actividad.nombre}
                  </Typography>
                </Row>
                <Row
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    borderRadius: "15px",
                    font: "bold",
                    marginBottom: "15px",
                  }}
                >
                  <br />
                  <button
                    style={{
                      background: "lightblue",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      fontWeight: "bold",
                    }}
                    id="iniciarBTN"
                    onClick={() => cambiarActividadesAuto(index)}
                  >
                    Iniciar Todos
                  </button>
                  <br />
                </Row>
                {/* {this.state.finalizar === false && (
                      <button
                        style={{
                          margin: "5px ",
                        }}
                        onClick={this.reset}
                      >
                        Reiniciar
                      </button>
                    )} */}

                {jugadores
                  .filter(
                    (jugador) =>
                      jugador.activo === true && jugador.entrenando === true
                  )
                  .map((jugador) => {
                    return (
                      <>
                        <Divider
                          variant="middle"
                          style={{
                            border: "1px solid",
                            height: "100%",
                          }}
                        />
                        <Row
                          style={{
                            borderRadius: "15px",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          <Col
                            sm="6"
                            style={{
                              font: "bold",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              gutterBottom
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                color: "#FFFFFF",
                                fontSize: "30px",
                                fontFamily: "Arial",
                                textAlign: "center",
                                textJustify: "inter-word",
                              }}
                            >
                              {jugador.nombre}
                            </Typography>
                          </Col>
                          <Col
                            sm="6"
                            style={{
                              font: "bold",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <Stopwatch
                                iniciar={actividadesAuto[index]}
                                actividad={actividad._id}
                                entrenamiento={entrenamiento._id}
                                jugador={jugador._id}
                                limite={actividad.tiempoMinutos}
                                nombre={actividad.nombre}
                              />
                            </div>
                          </Col>
                        </Row>
                      </>
                    );
                  })}
              </Container>
            </>
          );
        })}
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Container fluid="md" style={{ margin: "60px auto" }}>
          <Row
            style={{
              borderTopRightRadius: "15px",
              borderTopLeftRadius: "15px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              backgroundColor: "#00c0f3",
            }}
          >
            <Typography
              gutterBottom
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Arial",
                textAlign: "center",
                textJustify: "inter-word",
                color: "#FFFFFF",
                margin: "10px",
              }}
            >
              Jugadores Presentes en el Entrenamiento
            </Typography>
          </Row>
          <Row
            style={{
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              border: "2px solid #00c0f3",
            }}
          >
            {jugadores
              .filter(
                (jugador) =>
                  jugador.activo === true && jugador.entrenando === true
              )
              .map((jugador, index) => {
                return (
                  <Card
                    style={{ margin: "60px auto" }}
                    className={classes2.root}
                  >
                    <CardContent
                      style={{
                        backgroundColor: "#FFFFFF",
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
                          fontSize: "25px",
                          fontFamily: "Arial",
                        }}
                      >
                        {jugador.nombre}
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        backgroundColor: "#00c0f3",
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

        <Container fluid="md" style={{ margin: "60px auto" }}>
          <Row
            style={{
              borderTopRightRadius: "15px",
              borderTopLeftRadius: "15px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              backgroundColor: "#00c0f3",
            }}
          >
            <Typography
              gutterBottom
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Arial",
                textAlign: "center",
                textJustify: "inter-word",
                color: "#FFFFFF",
                margin: "10px",
              }}
            >
              Jugadores Disponibles para el Entrenamiento
            </Typography>
          </Row>
          <Row
            style={{
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              border: "2px solid #00c0f3",
            }}
          >
            {jugadores
              .filter(
                (jugador) =>
                  jugador.activo === true &&
                  jugador.entrenando === false &&
                  jugador.ausente === false
              )
              .map((jugador, index) => {
                return (
                  <Card
                    style={{ margin: "60px auto" }}
                    className={classes2.root}
                  >
                    <CardContent
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        margin: "auto",
                        color: "#FFFFFF",
                        fontSize: "25px",
                        fontFamily: "Arial",
                        backgroundColor: "#FFFFFF",
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
                        }}
                      >
                        {jugador.nombre}
                      </Typography>

                      <Button
                        style={{
                          background: "#0F98C2",
                          color: "#FFFFFF",
                          textTransform: "none",
                          fontSize: 18,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => agregarEntrenamiento(jugador._id)}
                      >
                        Presente
                      </Button>
                      <Typography
                        className={classes2.title}
                        color="textSecondary"
                        gutterBottom
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          color: "black",
                          fontSize: "20px",
                          fontFamily: "Arial",
                          margin: "10px",
                        }}
                      >
                        Ausencias:
                      </Typography>
                      <Button
                        style={{
                          background: "#0F98C2",
                          color: "white",
                          textTransform: "none",
                          fontSize: 18,
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "15px",
                        }}
                        onClick={() => enviarJustificada(jugador._id)}
                      >
                        Justificada
                      </Button>
                      <Button
                        style={{
                          background: "#0F98C2",
                          color: "white",
                          textTransform: "none",
                          fontSize: 18,
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "15px",
                        }}
                        onClick={() => enviarInjustificada(jugador._id)}
                      >
                        Injustificada
                      </Button>

                      {/* {jugadoresID
                        .filter((jugador1) => jugador1 === jugador._id)
                        .map((jugador, index) => {
                          return (
                            <>
                             
                            </>
                          );
                        })} */}
                    </CardContent>
                    <CardActions
                      style={{
                        backgroundColor: "#00c0f3",
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
      </TabPanel>
    </Box>
  );
}
