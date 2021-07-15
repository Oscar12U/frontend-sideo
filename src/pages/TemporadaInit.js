import { Button1, Col, Row, Container } from "react-bootstrap";
import React from "react";
import TopMenuBar from "../components/TopMenuBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import GestorEntrenamiento from "../containers/GestorEntrenamiento";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import NativeSelect from "@material-ui/core/NativeSelect";
import GestorPartido from "../containers/GestorPartido";
import * as moment from "moment";
import GestorTemporada from "../containers/GestorTemporada";

const TemporadaInit = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: "#005da4",
      borderRadius: "15px",
      margin: "auto",
    },
    btn: {
      backgroundColor: "#445074",
      color: "#FBFEF9",
      height: "40px",
      marginLeft: "8px",
      // margin: "auto",
    },
    txt: {
      color: "#FBFEF9",
      font: "bold",
      justifyContent: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginLeft: "-70px",
    },
    icon: {
      color: "#FBFEF9",
      font: "bold",
      justifyContent: "center",
    },
  }));

  const useStyles3 = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const classes5 = useStyles3();

  const [openTemporada, setOpenTemporada] = React.useState(false);
  const [nombreTemporada, setNombreTemporada] = React.useState("");
  const [descripcionTemporada, setDescripcionTemporada] = React.useState("");
  const [fechaInitTemp, setFechaInitTemp] = React.useState(
    moment().format("YYYY-MM-DD")
  );
  const [fechaFinTemp, setFechaFinTemp] = React.useState(
    moment().add("days", 1).format("YYYY-MM-DD")
    //PROBAR ESTA VARA
  );
  const [incorrecto, setIncorrecto] = React.useState("");
  const [incorrecto2, setIncorrecto2] = React.useState("");

  const handleClickOpenTemporada = () => {
    setOpenTemporada(true);
  };

  const handleTemporada = () => {
    setOpenTemporada(false);
    setIncorrecto("");
    setIncorrecto2("");
    setNombreTemporada("");
    setDescripcionTemporada("");
    setFechaInitTemp(moment().format("YYYY-MM-DD"));
    setFechaFinTemp(moment().format("YYYY-MM-DD"));
  };

  const handleNombreTemporada = (event) => {
    setNombreTemporada(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const handleDescripcionTemporada = (event) => {
    setDescripcionTemporada(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const handleFechaInitTemp = (event) => {
    setFechaInitTemp(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const handleFechaFinTemp = (event) => {
    setFechaFinTemp(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const crearTemporada = () => {
    console.log("Fachero: " + fechaInitTemp);
    console.log("Finnn: " + fechaFinTemp);
    if (nombreTemporada.length >= 1 && descripcionTemporada.length >= 1) {
      gestorTemporada.crearNuevaTemporada(
        nombreTemporada,
        descripcionTemporada,
        fechaInitTemp,
        fechaFinTemp
      );
      setFechaInitTemp(moment().format("YYYY-MM-DD"));
      setFechaFinTemp(moment().format("YYYY-MM-DD"));
      setDescripcionTemporada("");
      setNombreTemporada("");
      setOpenTemporada(false);
      setIncorrecto("");
      setIncorrecto2("");
      setTimeout(() => {
        //ultimoEntrenamiento();
      }, 1000);
    } else {
      if (nombreTemporada.length >= 1) {
        setIncorrecto("");
      } else {
        setIncorrecto("Por Favor Completar todos los Espacios");
      }
      if (descripcionTemporada.length >= 1) {
        setIncorrecto2("");
      } else {
        setIncorrecto2("Por Favor Completar todos los Espacios");
      }
    }
  };

  let gestorTemporada = new GestorTemporada();

  return (
    <>
      <TopMenuBar></TopMenuBar>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List component="nav" className={classes.root} aria-label="contacts">
          <ListItem button component="a" href="/Temporada">
            <ListItemIcon className={classes.icon}>
              <ArrowForwardIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Seleccionar Temporada"
            />
          </ListItem>
          <ListItem button component="a" onClick={handleClickOpenTemporada}>
            <ListItemIcon className={classes.icon}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Añadir Temporada"
            />
          </ListItem>
        </List>

        <Dialog
          open={openTemporada}
          onClose={handleTemporada}
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
            {"Temporada Nueva"}
          </DialogTitle>
          <DialogContent
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              margin: "10px",
            }}
          >
            <FormControl className={classes5.formControl}></FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre Temporada"
              type="email"
              fullWidth
              helperText={incorrecto}
              error={incorrecto}
              value={nombreTemporada}
              onChange={handleNombreTemporada}
            />
            <FormControl className={classes5.formControl}></FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Descripcion de la temporada"
              type="email"
              fullWidth
              helperText={incorrecto2}
              error={incorrecto2}
              value={descripcionTemporada}
              onChange={handleDescripcionTemporada}
            />

            <FormControl className={classes5.formControl}></FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="dateP"
              label="Fecha Inicial de la Temporada"
              type="date"
              fullWidth
              value={fechaInitTemp}
              onChange={handleFechaInitTemp}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl className={classes5.formControl}></FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="dateP"
              label="Fecha Final de la Temporada"
              type="date"
              fullWidth
              value={fechaFinTemp}
              onChange={handleFechaFinTemp}
              InputLabelProps={{
                shrink: true,
              }}
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
            <Button onClick={handleTemporada} color="primary">
              Cancelar
            </Button>
            <Button onClick={crearTemporada} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default TemporadaInit;
