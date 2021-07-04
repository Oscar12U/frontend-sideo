import { Button1, Col, Row, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import TopMenuBar from "../components/TopMenuBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import AddIcon from "@material-ui/icons/Add";
import PanToolIcon from "@material-ui/icons/PanTool";
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

export default function Temporada() {
  useEffect(() => {
    ultimoEntrenamiento();
  }, []);
  const [openActividad, setOpenActividad] = React.useState(false);
  const [nombreActividad, setNombreActividad] = React.useState("");
  const [descripcionActividad, setDescripcionActividad] = React.useState("");
  const [tiempoActividad, setTiempoActividad] = React.useState();
  const [entrenamientoUltimo, setEntrenamientoUltimo] = React.useState([]);

  const [openEntrenamiento, setOpenEntrenamiento] = React.useState(false);
  const [nombreEntrenamiento, setNombreEntrenamiento] = React.useState("");
  const [descripcionEntrenamiento, setDescripcionEntrenamiento] =
    React.useState("");

  const useStyles3 = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes5 = useStyles3();
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

  const classes = useStyles();

  const handleClickOpenActividad = () => {
    setOpenActividad(true);
  };

  const handleClickOpenEntrenamiento = () => {
    setOpenEntrenamiento(true);
  };

  const handleActividad = () => {
    setOpenActividad(false);
  };

  const handleEntrenamiento = () => {
    setOpenEntrenamiento(false);
  };

  const handleNombreActividad = (event) => {
    setNombreActividad(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const handleDescripcionActividad = (event) => {
    setDescripcionActividad(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const handleNombreEntrenamiento = (event) => {
    setNombreEntrenamiento(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const handleDescripcionEntrenamiento = (event) => {
    setDescripcionEntrenamiento(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const handleTiempoActividad = (event) => {
    setTiempoActividad(event.target.value);
    //console.log("comentario:  ", comentarioEntrenamieto);
  };

  const enviarActividad = () => {
    gestorEntrenamiento.crearActividad(
      nombreActividad,
      descripcionActividad,
      tiempoActividad
    );
    setNombreActividad("");
    setTiempoActividad("");
    setDescripcionActividad("");
    setOpenActividad(false);
  };

  const crearEntrenamiento = () => {
    gestorEntrenamiento.crearNuevoEntrenamiento(
      nombreEntrenamiento,
      descripcionEntrenamiento
    );
    setDescripcionEntrenamiento("");
    setNombreEntrenamiento("");
    setOpenEntrenamiento(false);

    setTimeout(() => {
      ultimoEntrenamiento();
    }, 1000);
  };

  function ultimoEntrenamiento() {
    axios
      .get(`http://localhost:3000/api/ultimoEntrenamiento`)
      .then((resultado) => {
        const entrenamiento1 = resultado.data.data[0];
        //console.log("entrenamiento adentro: ", entrenamiento1);
        setEntrenamientoUltimo(entrenamiento1);
        //console.log("entrenamiento ultimo: ", entrenamientoUltimo);
      })
      .catch((err) => {});
  }

  let gestorEntrenamiento = new GestorEntrenamiento();

  const AjaxNotify = () => {
    (async () => {
      const { value: formValues } = await Swal.fire({
        title: "Crear Partido",
        showDenyButton: true,
        html:
          '<label id="swal-label1" class="swal2-label" > Nombre </label>' +
          '<input id="swal-input1" class="swal2-input" placeholder="Barcelona vs Madrid">' +
          "<br></br>" +
          '<label id="swal-label2" class="swal2-label"> Fecha </label>' +
          '<input type="date" id="swal-input2" class="swal2-input">' +
          "<br></br>" +
          '<label id="swal-label3" class="swal2-label"> Descripción </label>' +
          '<input id="swal-input3" class="swal2-input" placeholder="Partido Semifinal">',
        focusConfirm: false,
        denyButtonText: "Cancelar",
        preConfirm: (result) => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
            document.getElementById("swal-input3").value,
          ];
        },
      });

      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
    })();
  };

  return (
    <>
      <TopMenuBar></TopMenuBar>
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
        <FormControl className={classes.formControl}>
          <NativeSelect
            className={classes.selectEmpty}
            //value={state.age}
            name="age"
            //onChange={handleChange}
            inputProps={{ "aria-label": "age" }}
          >
            <option value="Temporada 1" enable>
              Temporada 1
            </option>
            <option value={"Temporada 2"}>Temporada 2</option>
            <option value={"Temporada 3"}>Temporada 3</option>
            <option value={"Temporada 4"}>Temporada 4</option>
          </NativeSelect>
          <FormHelperText>Elegir Temporada</FormHelperText>
        </FormControl>

        {/* <TextField
          id="outlined-basic"
          label="Temporada"
          variant="outlined"
          size="small"
        />
        <Button className={classes.btn} variant="contained">
          Guardar
        </Button> */}
      </Container>

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
          <ListItem button component="a" onClick={AjaxNotify}>
            <ListItemIcon className={classes.icon}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Crear Partido"
            />
          </ListItem>
          <ListItem button component="a" href="/Estadisticas">
            <ListItemIcon className={classes.icon}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Estadisticas de Temporada"
            />
          </ListItem>
          <ListItem button onClick={handleClickOpenEntrenamiento}>
            <ListItemIcon className={classes.icon}>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Crear Entrenamiento"
            />
          </ListItem>
          <ListItem button component="a" href="/Partido">
            <ListItemIcon className={classes.icon}>
              <PanToolIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Gestionar Partido"
            />
          </ListItem>

          {entrenamientoUltimo.finalizado === false && (
            <Link
              to={{
                pathname: `/entrenamiento`,
                state: { IDEntrenamiento: entrenamientoUltimo._id },
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <ListItem button component="a">
                <ListItemIcon className={classes.icon}>
                  <SlowMotionVideoIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.txt}
                  inset
                  primary="Entrenamiento en Curso"
                />
              </ListItem>
            </Link>
          )}

          <ListItem button component="a" onClick={handleClickOpenActividad}>
            <ListItemIcon className={classes.icon}>
              <ControlPointIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Crear Actividad de Entrenamiento"
            />
          </ListItem>
        </List>

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
            {"Actividad Nueva"}
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
              label="Nombre"
              type="email"
              fullWidth
              value={nombreActividad}
              onChange={handleNombreActividad}
            />
            <FormControl className={classes5.formControl}></FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Descripcion de la Actividad"
              type="email"
              fullWidth
              value={descripcionActividad}
              onChange={handleDescripcionActividad}
            />
            <FormControl className={classes5.formControl}></FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tiempo en Min"
              type="number"
              helperText="En caso de no tener poner 0"
              fullWidth
              value={tiempoActividad}
              onChange={handleTiempoActividad}
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
            <Button onClick={handleActividad} color="primary">
              Cancelar
            </Button>
            <Button onClick={enviarActividad} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openEntrenamiento}
          onClose={handleEntrenamiento}
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
            {"Actividad Nueva"}
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
              label="Nombre"
              type="email"
              fullWidth
              value={nombreEntrenamiento}
              onChange={handleNombreEntrenamiento}
            />
            <FormControl className={classes5.formControl}></FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Descripcion de la Actividad"
              type="email"
              fullWidth
              value={descripcionEntrenamiento}
              onChange={handleDescripcionEntrenamiento}
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
            <Button onClick={handleEntrenamiento} color="primary">
              Cancelar
            </Button>
            <Button onClick={crearEntrenamiento} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
