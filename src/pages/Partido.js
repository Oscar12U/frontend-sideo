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
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import TopMenuBar from "../components/TopMenuBar";
import PartidoIcon from "@material-ui/icons/SportsSoccer";
import TeamIcon from "@material-ui/icons/People";
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
import TiempoJugadoresPartido from "../components/TiempoJugadoresPartido";
import JugadorClass from "../containers/JugadorClass";
import NotificacionJugadores from "../components/NotificacionJugadores";
import GestorJugadorTimer from "../containers/GestorJugadorTimer";

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
  const [actualizarDetalles, setActualizarDetalles] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [periodo, setPeriodo] = React.useState(1);
  const [counter, setCounter] = React.useState(null);
  const [selectIndexTitular, setSelectIndexTitular] = React.useState(-1);
  const [selectIndexSustituto, setSelectIndexSustituto] = React.useState(-1);
  const [selectIndexEntra, setSelectIndexEntra] = React.useState(-1);
  const [selectIndexAsistente, setSelectIndexAsistente] = React.useState(-1);
  let gestorPartido = new GestorPartido("Partido 1");
  const [notification, setNotification] = React.useState(0);
  const [listNotificaciones, setListNotificaciones] = React.useState([]);
  const [gestorTimersTitulares, setGestorTimersTitulares] = React.useState([]);
  const [jugadoresTitulares, setJugadoresTitulares] = React.useState([]);
  const [jugadoresSustitutos, setJugadoresSustitutos] = React.useState([]);

  // useEffect(() => {
  //   function actualizarJugadoresCambio() {
  //     gestorTimersTitulares.map((gestor) => {
  //       if (
  //         jugadoresTitulares.find(
  //           (element) => element.nombre === gestor.nombre
  //         ) !== undefined &&
  //         gestor.running === false
  //       ) {
  //         if (running) {
  //           gestor.start();
  //           gestor.running = true;
  //         }
  //       } else if (
  //         jugadoresTitulares.find(
  //           (element) => element.nombre === gestor.nombre
  //         ) === undefined &&
  //         gestor.running === true
  //       ) {
  //         gestor.stop();
  //         gestor.running = false;
  //       }
  //     });
  //   }
  //   actualizarJugadoresCambio();
  //   console.log("Se llama el de cambio useEffect");
  // }, [cambio]);

  useEffect(() => {
    function actualizarJugadoresBD() {
      axios
        .get(`http://localhost:3000/api/jugadores`)
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
    console.log("entra actualizar BD");
    actualizarJugadoresBD();
  }, [changeTab]);

  useEffect(() => {
    function actualizarGestores() {
      axios
        .get(`http://localhost:3000/api/jugadores`)
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
              gestorTimer = new GestorJugadorTimer(element.nombre, 0, 0, 0);
            }

            // if (element.jugando) {
            //   listGestoresTimers.push(gestorTimer);
            // } else if (element.convocado) {
            //   listGestoresSustitutos.push(gestorTimer);
            // }
            listGestoresTimers.push(gestorTimer);
          });

          setGestorTimersTitulares(listGestoresTimers);
          //setGestorTimersSustitutos(listGestoresSustitutos);
        })
        .catch((err) => {});
    }
    console.log("entra actualizar Gestores Timers");
    actualizarGestores();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log("se desmonta actualizar Gestores Timers");
  //     // let listaGestores = [...gestorTimersTitulares];
  //     let listaGestores = [...listGestTitulares];
  //     console.log(listGestTitulares);
  //     localStorage.setItem("listaTiempos", JSON.stringify(listaGestores));
  //   };
  // }, []);

  const [partidoObjct, setPartidoObjct] = React.useState([]);
  useEffect(() => {
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

    obtenerDetallesPartido();
    console.log("enta a pedir al de detalles del partido");
  }, [gestorPartido._nombrePartido, actualizarDetalles]);

  // useEffect(() => {
  //   console.log("Se llamo el nuevo useEfecct");

  //   function obtenerTiempoJugadores() {
  //     let listTiempos = [];
  //     let storedListTiempos = localStorage.getItem("listaTiempos");
  //     if (storedListTiempos != null) {
  //       let lista = JSON.parse(storedListTiempos);

  //       lista.forEach((element) => {
  //         listTiempos.push(element);
  //         console.log(element);
  //       });
  //       //this.setState({ listComentario: listaComenatriosObject });
  //       console.log(listTiempos);
  //     }
  //     return listTiempos;
  //   }

  //   setTimeJugadores(obtenerTiempoJugadores);

  //   return function cleanUp() {
  //     actualizarTiempoJugadores();
  //   };
  // }, [timeJugadores, selectIndexTitular]);

  // const actualizarTiempoJugadores = () => {
  //   let tiemposJugadores = [];
  //   let objctTiempoJugador;

  //   gestorTimersTitulares.map((gestor) => {
  //     objctTiempoJugador = {
  //       nombre: gestor.nombre,
  //       tiempo: {
  //         min: gestor.min,
  //         sec: gestor.sec,
  //         mls: gestor.mls,
  //       },
  //     };
  //     tiemposJugadores.push(objctTiempoJugador);
  //   });

  //   localStorageListTiempos(tiemposJugadores);
  // };

  // const localStorageListTiempos = (listTimeJugadores) => {
  //   localStorage.setItem("listaTiempos", JSON.stringify(listTimeJugadores));
  // };

  // const clearLocalStorage = () => {
  //   localStorage.removeItem("listaTiempos");
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) setChangeTab(!changeTab);
  };

  //Gestionando tiempo General
  const handleInitTimer = () => {
    //setReset(false);
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
    // setCounter(null);

    setRunning(false);
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

  const pauseTimerLocal = () => {
    clearInterval(counter);
    // setCounter(null);
  };

  // const handleClearTimer = () => {
  //   timeSec = 0;
  //   timeMin = 0;
  //   timeMls = 0;
  //   clearInterval(counter);
  //   resetTiemposJugadores();
  //   setReset(true);
  //   setRunning(false);
  // };

  const handleNotificacion = (jugador) => {
    //Se debería de obtener el jugador que cumplio con ese tiempo
    let listaNotificaciones = listNotificaciones;
    let notify = {
      tipo: "tiempo",
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

  //Gestionando tiempo Jugadores

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

  // const resetTiemposJugadores = () => {
  //   gestorTimersTitulares.map((gestor) => {
  //     gestor.reset();
  //     gestor.running = false;
  //   });
  // };

  const handleEliminarNotif = (notify) => {
    let listaNotificaciones = listNotificaciones;
    let pos = listaNotificaciones.indexOf(notify);
    listaNotificaciones.splice(pos, 1);
    setListNotificaciones(listaNotificaciones);
    setNotification(notification - 1);
  };

  const ActionGolFavor = () => {
    if (selectIndexTitular === -1 || selectIndexAsistente === -1) {
      ErrorNotify(
        "Se debe seleccionar el jugador anotador y el asistente del gol"
      );
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

  const ActionFalta = () => {
    if (selectIndexTitular === -1) {
      ErrorNotify("Se debe seleccionar el jugador que ha realizado la falta");
    } else {
      Notification.fire({
        icon: "success",
        title: `Falta agregada a ${jugadoresTitulares[selectIndexTitular].nombre} `,
      }).then((result) => {
        if (result.isConfirmed) {
          AddFalta();
        } else if (!result.isDenied) {
          AddFalta();
        }
      });
    }
  };

  const ActionCambio = () => {
    let jugadorEntra = jugadoresSustitutos[selectIndexEntra];
    let jugadorSale = jugadoresTitulares[selectIndexSustituto];
    if (selectIndexEntra === -1 || selectIndexSustituto === -1) {
      ErrorNotify("Se debe seleccionar los jugadores para realizar el cambio");
    } else {
      Notification.fire({
        icon: "success",
        title: `Entra: ${jugadorEntra.nombre} Sale: ${jugadorSale.nombre}`,
      }).then((result) => {
        if (result.isConfirmed) {
          CambioJugador();

          //actualizarTiempoCambios(jugadorSale.nombre, jugadorEntra.nombre);
        } else if (!result.isDenied) {
          CambioJugador();

          //actualizarTiempoCambios(jugadorSale.nombre, jugadorEntra.nombre);
        }
      });
    }
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

  const actualizarTiempoCambios = (jugadorSale, jugadorEntra) => {
    if (running) {
      gestorTimersTitulares
        .find((element) => element.nombre === jugadorSale)
        .stop();
      gestorTimersTitulares.find(
        (element) => element.nombre === jugadorSale
      ).running = false;

      gestorTimersTitulares
        .find((element) => element.nombre === jugadorEntra)
        .start();
      gestorTimersTitulares.find(
        (element) => element.nombre === jugadorEntra
      ).running = true;
    }

    // gestorTimersTitulares.map((gestor) => {
    //   if (
    //     jugadoresTitulares.find(
    //       (element) => element.nombre === gestor.nombre
    //     ) !== undefined &&
    //     gestor.running === false
    //   ) {
    //     if (running) {
    //       gestor.start();
    //       gestor.running = true;
    //     }
    //   } else if (jugadorSale === gestor.nombre) {
    //     gestor.stop();
    //     gestor.running = false;
    //   }
    // });
  };

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

    setJugadoresSustitutos(sustitutosNew);
    setJugadoresTitulares(titularesNew);
    setSelectIndexEntra(-1);
    setSelectIndexSustituto(-1);
    // setCambio(!cambio);

    if (running) {
      gestorTimersTitulares
        .find((element) => element.nombre === jugadorSale.nombre)
        .stop();
      gestorTimersTitulares.find(
        (element) => element.nombre === jugadorSale.nombre
      ).running = false;

      gestorTimersTitulares
        .find((element) => element.nombre === jugadorEntra.nombre)
        .start();
      gestorTimersTitulares.find(
        (element) => element.nombre === jugadorEntra.nombre
      ).running = true;
    }

    actualizarDetallesPartidoRapido();
    // gestorTimersTitulares.map((gestor) => {
    //   if (gestor.nombre === jugadorSale.nombre) {
    //     console.log("Sale " + gestor.nombre);
    //     gestor.stop();
    //     gestor.running = false;
    //   } else if (gestor.nombre === jugadorEntra.nombre) {
    //     if (running) {
    //       console.log("Entra " + gestor.nombre);
    //       gestor.start();
    //       gestor.running = true;
    //     }
    //   }
    // });
  };

  const actualizarListaCambioAdd = (lista, jugadorAdd) => {
    let listJugadores = lista;
    listJugadores.push(jugadorAdd);

    return listJugadores;
  };

  const actualizarListaCambioRemove = (lista, jugadorRemove) => {
    let listJugadores = lista;
    let pos = listJugadores.indexOf(jugadorRemove);
    listJugadores.splice(pos, 1);

    return listJugadores;
  };

  const AddGolFavor = () => {
    gestorPartido.agregarGolFavor(
      jugadoresTitulares[selectIndexTitular].nombre,
      jugadoresTitulares[selectIndexAsistente].nombre,
      timeMin,
      periodo
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

  const AddFalta = () => {
    gestorPartido.agregarFalta(jugadoresTitulares[selectIndexTitular].nombre);
    actualizarDetallesPartidoRapido();

    setSelectIndexTitular(-1);

    if (partidoObjct.faltas + 1 === 71) {
      let listaNotificaciones = listNotificaciones;
      let notify = {
        tipo: "falta",
        descripcion:
          "El equipo ha alcanzado " +
          (partidoObjct.faltas + 1) +
          " faltas en el partido",
        id: listaNotificaciones.length,
      };
      listaNotificaciones.push(notify);

      setListNotificaciones(listaNotificaciones);
      setNotification(notification + 1);
    }
  };

  const AddLesion = () => {
    //Validar que index sea diferente de -1

    gestorPartido.agregarLesion(
      jugadoresTitulares[selectIndexTitular].nombre,
      document.getElementById("descLesion").value
    );

    setSelectIndexTitular(-1);
    document.getElementById("descLesion").placeholder =
      "Descripción de la lesión";
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
                    // handleClearTimer={handleClearTimer}
                    handleEndPeriodo={handleEndPeriodo}
                    min={timeMin}
                    sec={timeSec}
                    mls={timeMls}
                    running={running}
                    counter={counter}
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
                <div
                  className={classes.p1}
                  style={{
                    color: "#000000",
                  }}
                >
                  Seleccionar jugador
                </div>
              </Row>
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
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
                        handleMenuTitularClick(event, jugadoresTitulares.length)
                      }
                    >
                      Cancelar Selección
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <div
                  className={classes.p1}
                  style={{
                    color: "#000000",
                  }}
                >
                  Seleccionar jugador Asistente
                </div>
                <Dropdown as={ButtonGroup}>
                  <Button id="btnAsistente">
                    {""}
                    {selectIndexAsistente === -1
                      ? "Seleccionar Jugador"
                      : jugadoresTitulares[selectIndexAsistente].nombre}
                  </Button>
                  <Dropdown.Toggle split id="dropdown-custom-2" />
                  <Dropdown.Menu className="super-colors">
                    {jugadoresTitulares.map((option, index) =>
                      getAsistentes(option.nombre, index)
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Row>

              <Divider variant="middle" />

              <Row>
                <Col
                  md={6}
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
                      onClick={ActionFalta}
                    >
                      Falta
                    </Button>
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
                        : jugadoresSustitutos[selectIndexEntra].nombre}
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
                          {option.nombre}
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
            {gestorTimersTitulares.map((jugador, index) => {
              return (
                <>
                  <h4>Jugador {jugador.nombre}</h4>

                  <TiempoJugadoresPartido
                    iniciar={jugador.running}
                    notificacion={jugador.notificacion}
                    jugador={jugador.nombre}
                    handleNotificacion={(element) =>
                      handleNotificacion(element)
                    }
                    nombre={"actividad.nombre"}
                    min={jugador.min}
                    sec={jugador.sec}
                    mls={jugador.mls}
                  />
                </>
              );
            })}
            {/* {jugadoresSustitutos.map((jugador, index) => {
              return (
                <>
                  <h4>Jugador {jugador.nombre}</h4>

                  <TiempoJugadoresPartido
                    iniciar={false}
                    entrenamiento={1}
                    jugador={jugador.nombre}
                    limite={1}
                    handleNotificacion={handleNotificacion}
                    nombre={"actividad.nombre"}
                  />
                </>
              );
            })} */}
          </Row>
          <br></br>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JugadoresJuego />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container
          fluid="md"
          style={{
            marginTop: "40px",
            backgroundImage: "linear-gradient( #00233D, #33A7FF)",
          }}
        >
          <Row style={{}}>
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
