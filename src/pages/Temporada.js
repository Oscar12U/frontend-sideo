import { Button1, Col, Row, Container } from "react-bootstrap";
import React from "react";
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
import Swal from "sweetalert2";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const Temporada = () => {
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
          <ListItem button>
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
        </List>
      </Container>
    </>
  );
};

export default Temporada;
