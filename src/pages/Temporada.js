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
import CreateIcon from "@material-ui/icons/Create";
import PanToolIcon from "@material-ui/icons/PanTool";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Temporada = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: "#445074",
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
    },
  }));

  const classes = useStyles();

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
        <TextField
          id="outlined-basic"
          label="Temporada"
          variant="outlined"
          size="small"
        />
        <Button className={classes.btn} variant="contained">
          Guardar
        </Button>
      </Container>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Container style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <List component="nav" className={classes.root} aria-label="contacts">
          <ListItem button>
            <ListItemIcon className={classes.txt}>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Crear Partido"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.txt}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Estadisticas de Temporada"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.txt}>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Crear Entrenamiento"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.txt}>
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
