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
import GestorJugadorTimer from "../containers/GestorJugadorTimer";
import JugadorClass from "../containers/JugadorClass";
import TiempoJugadoresPartido from "../components/TiempoJugadoresPartido";
import NotificacionJugadores from "../components/NotificacionJugadores";
import { useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
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

let timeMin = 0;
let timeSec = 0;
let timeMls = 0;

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [changeTab, setChangeTab] = React.useState(false);
  const [cambio, setCambio] = React.useState(false);
  const [notifyFaltas, setNotifyFaltas] = React.useState(false);
  const [actualizarDetalles, setActualizarDetalles] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [periodo, setPeriodo] = React.useState(1);
  const [counter, setCounter] = React.useState(null);
  const [selectIndexTitular, setSelectIndexTitular] = React.useState(-1);
  const [selectIndexSustituto, setSelectIndexSustituto] = React.useState(-1);
  const [selectIndexEntra, setSelectIndexEntra] = React.useState(-1);
  const [selectIndexAsistente, setSelectIndexAsistente] = React.useState(-1);
  let { nombrePartido, descTemporada } = useLocation().state;
  let gestorPartido = new GestorPartido(nombrePartido);
  const [notification, setNotification] = React.useState(0);
  const [listNotificaciones, setListNotificaciones] = React.useState([]);
  const [gestorTimersTitulares, setGestorTimersTitulares] = React.useState([]);
  const [jugadoresTitulares, setJugadoresTitulares] = React.useState([]);
  const [jugadoresSustitutos, setJugadoresSustitutos] = React.useState([]);
  const history = useHistory();

  useEffect(() => {
    function actualizarJugadoresBD() {
      axios
        .get(`https://backend-sideo.herokuapp.com/api/jugadores`)
        .then((resultado) => {
          let jugadoresList = resultado.data.data;
          let listEnJuego = [];
          let listFueraJuego = [];
          let objctJugador;

          jugadoresList.forEach((element) => {
            objctJugador = new JugadorClass(element.nombre);

            if (element.jugando) {
              listEnJuego.push(objctJugador);
            } else if (element.convocado) {
              listFueraJuego.push(objctJugador);
            }
          });

          setJugadoresTitulares(listEnJuego);
          setJugadoresSustitutos(listFueraJuego);
        })
        .catch((err) => {});
    }

    actualizarJugadoresBD();
  }, [changeTab]);

  useEffect(() => {
    function actualizarGestores() {
      axios
        .get(`https://backend-sideo.herokuapp.com/api/jugadores`)
        .then((resultado) => {
          let jugadoresList = resultado.data.data;
          let listGestoresTimers = [];
          let gestorTimer;
          let lista;
          let storedListTiempos = localStorage.getItem("listaTiempos");
          if (storedListTiempos != null) {
            lista = JSON.parse(storedListTiempos);
          }

          jugadoresList.forEach((element) => {
            if (storedListTiempos != null) {
              gestorTimer = lista.find((gestorStored) => {
                return gestorStored.nombre === element.nombre;
              });
            } else {
              gestorTimer = new GestorJugadorTimer(element.nombre);
            }

            listGestoresTimers.push(gestorTimer);
          });

          setGestorTimersTitulares(listGestoresTimers);
        })
        .catch((err) => {});
    }

    actualizarGestores();
  }, []);

  const [partidoObjct, setPartidoObjct] = React.useState(null);
  useEffect(() => {
    function obtenerDetallesPartido() {
      axios
        .get(
          `https://backend-sideo.herokuapp.com/api/detallesPartido/${gestorPartido._nombrePartido}`
        )
        .then((resultado) => {
          setTimeout(function () {
            setPartidoObjct(resultado.data.data);
          }, 1000);
        })
        .catch((err) => {});
    }

    obtenerDetallesPartido();
  }, [gestorPartido._nombrePartido, actualizarDetalles]);

  useEffect(() => {}, [cambio]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) setChangeTab(!changeTab);
  };

  //Gestionar Tiempos

  const handleInitTimer = () => {
    if (!running) {
      setRunning(true);
      iniciarTiempoLocal();
      iniciarTiemposJugadores();
    } else {
      pauseTimerLocal();
      detenerTiemposJugadores();
      setRunning(false);
    }
  };

  const iniciarTiempoLocal = () => {
    setCounter(setInterval(() => pace(), 10));
  };

  const pace = () => {
    timeMls += 10;

    if (timeMls >= 1000) {
      timeSec += 1;
      timeMls = 0;
    }
    if (timeSec >= 60) {
      timeMin += 1;
      timeSec = 0;
    }
  };

  const handleEndPeriodo = () => {
    setPeriodo(periodo + 1);
    timeSec = 0;
    timeMin = 0;
    timeMls = 0;
    clearInterval(counter);
    detenerTiemposJugadores();
    setRunning(false);
  };

  const pauseTimerLocal = () => {
    clearInterval(counter);
  };

  //Tiempo de jugadadores
  const iniciarTiemposJugadores = () => {
    gestorTimersTitulares.map((gestor) => {
      if (
        jugadoresTitulares.find(
          (element) => element.nombre === gestor.nombre
        ) !== undefined
      ) {
        gestor.start();
        gestor.running = true;
      }
    });
  };

  const detenerTiemposJugadores = () => {
    gestorTimersTitulares.map((gestor) => {
      if (
        jugadoresTitulares.find(
          (element) => element.nombre === gestor.nombre
        ) !== undefined
      ) {
        gestor.stop();
        gestor.running = false;
      }
    });
  };

  //Notificaciones

  const handleNotificacion = (jugador) => {
    //Se debería de obtener el jugador que cumplio con ese tiempo
    let listaNotificaciones = listNotificaciones;
    let notify = {
      descripcion:
        "El jugador " + jugador + " ha alcanzado el tiempo límite de juego",
      id: listaNotificaciones.length,
    };
    listaNotificaciones.push(notify);

    setListNotificaciones(listaNotificaciones);
    setNotification(notification + 1);

    gestorTimersTitulares.find(
      (element) => element.nombre === jugador
    ).notificacion = true;
  };

  const handleEliminarNotif = (notify) => {
    let listaNotificaciones = listNotificaciones;
    let pos = listaNotificaciones.indexOf(notify);
    listaNotificaciones.splice(pos, 1);
    setListNotificaciones(listaNotificaciones);
    setNotification(notification - 1);
  };

  //Acciones de eventos del partido y la generación de
  //las notificaciones
  const ActionGolFavor = () => {
    if (selectIndexTitular === -1) {
      ErrorNotify("Se debe seleccionar el jugador anotador del gol");
    } else {
      Notification.fire({
        icon: "success",
        title: `Gol agregado a ${jugadoresTitulares[selectIndexTitular].nombre} `,
      }).then((result) => {
        if (result.isConfirmed) {
          AddGolFavor();
        } else if (!result.isDenied) {
          AddGolFavor();
        }
      });
    }
  };

  const ActionGolContra = () => {
    Notification.fire({
      icon: "success",
      title: `Gol en contra agregado`,
    }).then((result) => {
      if (result.isConfirmed) {
        AddGolContra();
      } else if (!result.isDenied) {
        AddGolContra();
      }
    });
  };

  const ActionLesion = () => {
    let descLesion = document.getElementById("descLesion").value;
    if (selectIndexTitular === -1) {
      ErrorNotify("Se debe seleccionar el jugador que se ha lesionado");
      document.getElementById("descLesion").placeholder =
        "Descripción de la lesión";
    } else if (descLesion.trim() === "") {
      ErrorNotify("Se debe agregar una descripción de la lesión");
      document.getElementById("descLesion").placeholder =
        "Descripción de la lesión";
    } else {
      Notification.fire({
        icon: "success",
        title: `Lesión agregada a ${jugadoresTitulares[selectIndexTitular].nombre} `,
      }).then((result) => {
        if (result.isConfirmed) {
          AddLesion();
        } else if (!result.isDenied) {
          AddLesion();
        }
      });
    }
  };

  const ActionFaltaContra = () => {
    Notification.fire({
      icon: "success",
      title: `Falta del equipo contrario agregada`,
    }).then((result) => {
      if (result.isConfirmed) {
        AddFaltaContra();
      } else if (!result.isDenied) {
        AddFaltaContra();
      }
    });
  };

  const ActionFaltaFavor = () => {
    if (selectIndexTitular === -1) {
      ErrorNotify("Se debe seleccionar el jugador que ha realizado la falta");
    } else {
      Notification.fire({
        icon: "success",
        title: `Falta agregada a ${jugadoresTitulares[selectIndexTitular].nombre} `,
      }).then((result) => {
        if (result.isConfirmed) {
          AddFaltaFavor();
        } else if (!result.isDenied) {
          AddFaltaFavor();
        }
      });
    }
  };

  const ActionCambio = () => {
    if (selectIndexEntra === -1 || selectIndexSustituto === -1) {
      ErrorNotify("Se debe seleccionar los jugadores para realizar el cambio");
    } else {
      Notification.fire({
        icon: "success",
        title: `Entra: ${jugadoresSustitutos[selectIndexEntra].nombre} Sale: ${jugadoresTitulares[selectIndexSustituto].nombre}`,
      }).then((result) => {
        if (result.isConfirmed) {
          CambioJugador();
        } else if (!result.isDenied) {
          CambioJugador();
        }
      });
    }
  };

  //Estructura de notificaciones
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

  const ErrorNotify = (text) => {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: text,
    });
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

  //Controlar los cambios del partido
  const CambioJugador = () => {
    let jugadorEntra = jugadoresSustitutos[selectIndexEntra];
    let jugadorSale = jugadoresTitulares[selectIndexSustituto];

    let sustitutosNew = actualizarListaCambioAdd(
      jugadoresSustitutos,
      jugadorSale
    );

    sustitutosNew = actualizarListaCambioRemove(sustitutosNew, jugadorEntra);

    let titularesNew = actualizarListaCambioAdd(
      jugadoresTitulares,
      jugadorEntra
    );

    titularesNew = actualizarListaCambioRemove(titularesNew, jugadorSale);

    gestorPartido.cambiarJugador(jugadorEntra.nombre, jugadorSale.nombre);

    if (running) {
      // gestorTimersTitulares
      //   .find((element) => element.nombre === jugadorSale.nombre)
      //   .stop();
      // gestorTimersTitulares.find(
      //   (element) => element.nombre === jugadorSale.nombre
      // ).running = false;
      detenerTiemposCambio(jugadorSale.nombre);
      iniciarTiemposCambio(jugadorEntra.nombre);

      setJugadoresSustitutos(sustitutosNew);
      setJugadoresTitulares(titularesNew);
      setSelectIndexEntra(-1);
      setSelectIndexSustituto(-1);
      setGestorTimersTitulares(sortByRunningStateTimers());
      setCambio(!cambio);
    }
  };

  const actualizarListaCambioAdd = (lista, jugadorAdd) => {
    let listJugadores = lista;
    listJugadores.push(jugadorAdd);

    return listJugadores;
  };

  const detenerTiemposCambio = (nombreJugadorSale) => {
    gestorTimersTitulares.map((gestor) => {
      if (gestor.nombre === nombreJugadorSale) {
        gestor.stop();
        gestor.sumTimePlayed();
        gestor.running = false;
        gestor.reset();
      }
    });
  };

  const iniciarTiemposCambio = (nombreJugadorEntra) => {
    gestorTimersTitulares.map((gestor) => {
      if (gestor.nombre === nombreJugadorEntra) {
        gestor.start();
        gestor.running = true;
      }
    });
  };

  const sortByRunningStateTimers = () => {
    let listGestores = gestorTimersTitulares;
    //listGestores.splice(indexJugador, 1, gestorTitular);
    //console.log(pos);
    listGestores.sort(function (jugadorA, jugadorB) {
      if (!jugadorA.running && jugadorB.running) return 1;
      if (jugadorA.running && !jugadorB.running) return -1;
      return 0;
    });
    return listGestores;
  };

  const actualizarListaCambioRemove = (lista, jugadorRemove) => {
    let listJugadores = lista;
    let pos = listJugadores.indexOf(jugadorRemove);
    listJugadores.splice(pos, 1);

    return listJugadores;
  };

  const AddGolFavor = () => {
    let asistente = null;
    let asistenciaBoolean = false;
    if (selectIndexAsistente !== -1) {
      asistente = jugadoresTitulares[selectIndexAsistente].nombre;
      asistenciaBoolean = true;
    }

    gestorPartido.agregarGolFavor(
      jugadoresTitulares[selectIndexTitular].nombre,
      asistente,
      timeMin,
      periodo,
      asistenciaBoolean
    );

    actualizarDetallesPartidoLento();
    setSelectIndexTitular(-1);
    setSelectIndexAsistente(-1);
  };

  function actualizarDetallesPartidoLento() {
    setTimeout(function () {
      setActualizarDetalles(!actualizarDetalles);
    }, 600);
  }

  function actualizarDetallesPartidoRapido() {
    setTimeout(function () {
      setActualizarDetalles(!actualizarDetalles);
    }, 300);
  }

  const AddGolContra = () => {
    gestorPartido.agregarGolContra();
    actualizarDetallesPartidoRapido();
  };

  const VerificarGol = () => {
    if (document.getElementById("A favor").checked) {
      ActionGolFavor();
    } else if (document.getElementById("En contra").checked) {
      ActionGolContra();
    }
  };

  const VerificarFalta = () => {
    if (document.getElementById("A Favor").checked) {
      ActionFaltaFavor();
    } else if (document.getElementById("En Contra").checked) {
      ActionFaltaContra();
    }
  };

  const AddFaltaFavor = () => {
    gestorPartido.agregarFaltaFavor(
      jugadoresTitulares[selectIndexTitular].nombre
    );
    actualizarDetallesPartidoRapido();

    setSelectIndexTitular(-1);

    if (partidoObjct.faltasAFavor + 1 >= 4 && !notifyFaltas) {
      setNotifyFaltas(true);
      let listaNotificaciones = listNotificaciones;
      let notify = {
        descripcion:
          "El equipo ha alcanzado " +
          (partidoObjct.faltasAFavor + 1) +
          " faltas en el partido",
        id: listaNotificaciones.length,
      };
      listaNotificaciones.push(notify);

      setListNotificaciones(listaNotificaciones);
      setNotification(notification + 1);
    }
  };

  const AddFaltaContra = () => {
    gestorPartido.agregarFaltaContra();
    actualizarDetallesPartidoRapido();
  };

  const AddLesion = () => {
    gestorPartido.agregarLesion(
      jugadoresTitulares[selectIndexTitular].nombre,
      document.getElementById("descLesion").value
    );

    setSelectIndexTitular(-1);
    document.getElementById("descLesion").value = "Descripción de la lesión";
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

  const getTiemposJugadores = () => {
    let arrayTiempos = [];

    gestorTimersTitulares.map((gestor) => {
      gestor.stop();
      gestor.running = false;

      let minPlayed = 0;
      //Jugador que nunca se cambio
      if (gestor.minPlayed === 0) {
        minPlayed = gestor.min;
      } else {
        //Jugador que fue cambiado al menos una ves
        minPlayed = gestor.minPlayed + gestor.min;
      }
      const objTiempo = {
        nombreJugador: gestor.nombre,
        tiempoMin: minPlayed,
      };
      arrayTiempos.push(objTiempo);
    });
    return arrayTiempos;
  };

  function actualizarFinalizar() {
    //setTimeout(() => {
    //window.location.href = "/"
    // }, 2000);
  }

  const finalizarPartido = () => {
    Swal.fire({
      title: "¿Seguro de terminar el partido actual?",
      showDenyButton: true,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        gestorPartido.finalizarPartido(partidoObjct._id, getTiemposJugadores());
        history.push("/");
        actualizarFinalizar();
      }
    });
  };

  const getProgress = () => {
    if (partidoObjct === null) {
      return (
        <div
          id="progress"
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <Row style={{ margin: "auto 20px" }}>
          <Col sm="3" style={{ marginLeft: "0px" }}>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Partido Contra:<br></br>
            </h1>
            <h1
              style={{
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {partidoObjct.descripcion}
            </h1>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Temporada
            </h1>
            <h1
              style={{
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {descTemporada}
            </h1>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Periodo Actual
            </h1>
            <h1
              style={{
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {periodo}
            </h1>
          </Col>
          <Col sm="4" style={{ marginRight: "0px" }}>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              UCR Tacares
            </h1>
            <h1
              style={{
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {partidoObjct.cantGolesFavor}
            </h1>

            <h1
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Equipo en Contra
            </h1>
            <h1
              style={{
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {partidoObjct.cantGolesContra}
            </h1>

            <Divider
              style={{
                marginBottom: "5px",
              }}
              variant="middle"
            />
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Faltas a Favor
            </h1>
            <h1
              style={{
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {partidoObjct.faltasAFavor}
            </h1>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Faltas en Contra:
            </h1>
            <h1
              style={{
                fontSize: "18px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {partidoObjct.faltasEnContra}
            </h1>
          </Col>
          <Col
            sm="5"
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
              handleEndPeriodo={handleEndPeriodo}
              min={timeMin}
              sec={timeSec}
              mls={timeMls}
              running={running}
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
      );
    }
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
              <Badge badgeContent={notification} color="primary">
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
              <div
                style={{
                  fontSize: "25px",
                  color: "#000000",
                  fontWeight: "bold",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: "5px",
                }}
              >
                Detalles del Partido
              </div>
              <Divider
                style={{
                  marginBottom: "5px",
                }}
                variant="middle"
              />
              {getProgress()}
            </Paper>
          </div>
          <br />
          <Row
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: "auto",
            }}
          >
            <Button
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",
              }}
              variant="warning"
              size="lg"
              onClick={finalizarPartido}
            >
              {" "}
              Finalizar Partido
            </Button>{" "}
          </Row>
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
                      {selectIndexTitular === -1 ||
                      selectIndexTitular === jugadoresTitulares.length
                        ? "Seleccionar Jugador"
                        : jugadoresTitulares[selectIndexTitular].nombre}
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
                          {option.nombre}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider />
                      <Dropdown.Item
                        key={jugadoresTitulares.length}
                        selected={
                          jugadoresTitulares.length === selectIndexTitular
                        }
                        onClick={(event) =>
                          handleMenuTitularClick(
                            event,
                            jugadoresTitulares.length
                          )
                        }
                      >
                        Cancelar Selección
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <br />
                  <br />
                  <Divider
                    style={{
                      marginBottom: "5px",
                    }}
                    variant="middle"
                  />
                </Col>
              </Row>

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
                  <div
                    className={classes.p3}
                    style={{
                      color: "#000000",
                    }}
                  >
                    Seleccionar Jugador {<br />} Asistente de Gol
                  </div>
                  <Dropdown
                    style={{
                      marginTop: "5px",
                    }}
                    as={ButtonGroup}
                  >
                    <Button id="btnAsistente">
                      {""}
                      {selectIndexAsistente === -1 ||
                      selectIndexAsistente === jugadoresTitulares.length
                        ? "Seleccionar Jugador"
                        : jugadoresTitulares[selectIndexAsistente].nombre}
                    </Button>
                    <Dropdown.Toggle split id="dropdown-custom-3" />
                    <Dropdown.Menu className="super-colors">
                      {jugadoresTitulares.map((option, index) =>
                        getAsistentes(option.nombre, index)
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item
                        key={jugadoresTitulares.length}
                        selected={
                          jugadoresTitulares.length === selectIndexAsistente
                        }
                        onClick={(event) =>
                          handleMenuAsistenteClick(
                            event,
                            jugadoresTitulares.length
                          )
                        }
                      >
                        Cancelar Selección
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
                    onClick={VerificarFalta}
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
                    {["A Favor", "En Contra"].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          name="group2"
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
                      {selectIndexEntra === -1 ||
                      selectIndexEntra === jugadoresSustitutos.length
                        ? "Seleccionar Jugador"
                        : jugadoresSustitutos[selectIndexEntra].nombre}
                    </Button>
                    <Dropdown.Toggle split id="dropdown-custom-1" />
                    <Dropdown.Menu className="super-colors">
                      {jugadoresSustitutos.map((option, index) => (
                        <Dropdown.Item
                          key={index}
                          selected={index === selectIndexEntra}
                          onClick={(event) =>
                            handleMenuEntraClick(event, index)
                          }
                        >
                          {option.nombre}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider />
                      <Dropdown.Item
                        key={jugadoresSustitutos.length}
                        selected={
                          jugadoresSustitutos.length === selectIndexEntra
                        }
                        onClick={(event) =>
                          handleMenuEntraClick(
                            event,
                            jugadoresSustitutos.length
                          )
                        }
                      >
                        Cancelar Selección
                      </Dropdown.Item>
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
                      {selectIndexSustituto === -1 ||
                      selectIndexSustituto === jugadoresTitulares.length
                        ? "Seleccionar Jugador"
                        : jugadoresTitulares[selectIndexSustituto].nombre}
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
                          {option.nombre}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider />
                      <Dropdown.Item
                        key={jugadoresTitulares.length}
                        selected={
                          jugadoresTitulares.length === selectIndexSustituto
                        }
                        onClick={(event) =>
                          handleMenuSustitutoClick(
                            event,
                            jugadoresTitulares.length
                          )
                        }
                      >
                        Cancelar Selección
                      </Dropdown.Item>
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
            <Container
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",
              }}
            >
              <br />
              <Divider
                style={{
                  marginBottom: "5px",
                }}
                variant="middle"
              />
              <br />
              <Typography
                style={{
                  fontSize: "30px",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Tiempo Jugadores
              </Typography>
              <br />
              {gestorTimersTitulares.map((jugador, index) => {
                return (
                  <Container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    <Divider
                      style={{
                        marginBottom: "5px",
                        color: "#FFFFFF",
                        backgroudColor: "#FFFFFF",
                      }}
                      variant="middle"
                    />
                    <h4
                      style={{
                        fontSize: "25px",
                        color: "#0000000",
                        fontWeight: "bold",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {jugador.nombre}
                    </h4>

                    <TiempoJugadoresPartido
                      iniciar={jugador.running}
                      notificacion={jugador.notificacion}
                      jugador={jugador.nombre}
                      handleNotificacion={(element) =>
                        handleNotificacion(element)
                      }
                      min={jugador.min}
                      sec={jugador.sec}
                      mls={jugador.mls}
                      minPlayed={jugador.minPlayed}
                      secPlayed={jugador.secPlayed}
                      mlsPlayed={jugador.mlsPlayed}
                    />
                  </Container>
                );
              })}
            </Container>
          </Row>
          <br></br>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JugadoresJuego partido={nombrePartido} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container
          fluid="md"
          style={{
            marginTop: "20px",
            backgroundImage: "linear-gradient( #00233D, #33A7FF)",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "15px",
          }}
        >
          <Row
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "15px",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
            <NotificacionJugadores
              notificaciones={listNotificaciones}
              handleEliminarNotif={(element) => handleEliminarNotif(element)}
            />
          </Row>
        </Container>
      </TabPanel>
    </Box>
  );
}
