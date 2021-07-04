import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppBar from "@material-ui/core/AppBar";
import { Container, Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import PartidoIcon from "@material-ui/icons/SportsSoccer";
import TeamIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as moment from "moment";
import TopMenuBar from "../components/TopMenuBar";

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
  r1: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "auto",
    marginBottom: "10px",
    color: "#FFFFFF",
  },
});

const VerJugador = () => {
  let { IDJugador } = useLocation().state;
  const [Jugador, setJugadores] = React.useState([]);
  const [Lesion, setLesiones] = React.useState([]);
  const [lesionID, setLesionesID] = React.useState([]);
  //const classes = useStyles();
  const [value, setValue] = React.useState(3);
  useEffect(() => {
    axiosConsulta(IDJugador);
    //consultaLesiones(Jugador.lesiones);
  }, [null]);

  function axiosConsulta(jugadorId) {
    axios
      .get(`http://localhost:3000/api/jugador/${jugadorId}`)
      .then((resultado) => {
        const jugador = resultado.data.data;
        setJugadores(jugador);
        //console.log("de mongo", jugador.lesiones);
        setLesionesID(jugador.lesiones);
        //console.log("asfasf", jugador.lesiones);

        consultaLesiones(jugador.lesiones);
        //console.log("Lista de lesiones definitiva", lesionID);
      })
      .catch((err) => {});
  }

  function consultaLesiones(lesionId) {
    //console.log("metodos para salsacarasf asf")
    let lesionesTotales = [];
    //console.log("Contenido ID", lesionId);
    lesionId.map((lesion) => {
      //console.log(lesion);
      axios
        .get(`http://localhost:3000/api/lesion/${lesion}`)
        .then((resultado) => {
          const listLesiones = resultado.data.data;
          //setLesiones(listLesiones);
          //console.log("Lista de lesiones", listLesiones);
          //lesionesTotales.push(listLesiones);
          //Lesion.push(listLesiones);
          setLesiones((Lesion) => [...Lesion, listLesiones]);
        })
        .catch((err) => {});
    });

    // axios
    //     .get(`http://localhost:3000/api/lesion/${lesionId}`)
    //     .then((resultado) => {
    //         const listLesiones = resultado.data.data;
    //         setLesiones(listLesiones);
    //         //console.log("Lista de lesiones", listLesiones);

    //     })
    //     .catch((err) => { });
    //console.log("Lista secunda", lesionesTotales);
    //setLesiones(lesionesTotales);
    //console.log("hola aqui", Lesion);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes2 = useStyles2();

  const lesiones1 = Jugador.lesiones;
  //console.log("Lesiones 1", lesiones1);
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles3 = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes5 = useStyles();

  return (
    <>
      <TopMenuBar />
      <br></br>
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
          fontWeight: "bold",
          backgroundImage: "linear-gradient(#005da4, #00233D)",
          maxWidth: "700px",
        }}
      >
        <br />
        <Row style={{}}>
          <Typography
            style={{
              color: "#FFFFFF",
              fontSize: "34px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: "auto",
              fontWeight: "bold",
            }}
            id="nombre"
            component="p"
            variant="h6"
            fontFamily="Aclonica, sans-serif"
          >
            Ha continuacion se mostrarán los datos del jugador
          </Typography>
          <br />
        </Row>
      </Container>
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
          marginBottom: "10px",
          fontWeight: "bold",
          backgroundImage: "linear-gradient( #00233D, #33A7FF)",
          maxWidth: "700px",
        }}
      >
        <br />
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "auto",
            marginBottom: "10px",
            fontSize: "40px",
            color: "#FFFFFF",
          }}
        >
          <div>{Jugador.nombre}</div>
        </Row>
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "auto",
            marginBottom: "10px",
            fontSize: "20px",
            color: "#FFFFFF",
          }}
        >
          <div>Cantidad de goles: {Jugador.cantGoles}</div>
        </Row>
        <Row className={classes2.r1}>
          <div>Cantidad de Asistencias: {Jugador.cantAsistencias}</div>
        </Row>
        <Row className={classes2.r1}>
          <div>Tiempo Jugado: {Jugador.tiempoMinutosJuego} minutos</div>
        </Row>
        <Row className={classes2.r1}>
          <div>Cantidad de faltas cometidas: {Jugador.cantFaltas}</div>
        </Row>
        <Row className={classes2.r1}>
          <div>Lesiones: </div>
        </Row>
        {/*  */}
        <Row className={classes2.r1}>
          <TableContainer component={Paper}>
            <Table className={classes5.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Fecha</StyledTableCell>
                  <StyledTableCell>Descripcion</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Lesion.map((number) => {
                  return (
                    <StyledTableRow>
                      <StyledTableCell>
                        {moment(number.fechaLesion).format("DD/MM/YYYY")}
                      </StyledTableCell>
                      <StyledTableCell>{number.descripcion}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
                {/* {Lesion.map((lesion, index) => {
                                    return (
                                        <StyledTableRow key={lesion.descripcion}>
                                            <StyledTableCell component="th" scope="row">
                                                {lesion.fechaLesion}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{lesion.descripcion}</StyledTableCell>

                                        </StyledTableRow>
                                    )

                                })} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Row>
        <br />
      </Container>
    </>
  );
};

export default VerJugador;
