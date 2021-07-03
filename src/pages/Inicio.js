import { Button1, Col, Row, Container } from "react-bootstrap";
import React from "react";
import TopMenuBar from "../components/TopMenuBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

const Inicio = () => {

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

  return (
    <>

      {console.log("USUARIO LOGUEADO")}
      < TopMenuBar></TopMenuBar>
      <br></br>
      <br></br>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "160%",
        }}
      >
        Bienvenido

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
          <ListItem button component="a" href="/TemporadaInit">
            <ListItemIcon className={classes.icon}>
              <ArrowForwardIcon />
            </ListItemIcon>
            <ListItemText className={classes.txt} inset primary="Temporadas" />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.icon}>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Administrar Jugadores"
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.icon}>
              <AccountCircleIcon />
            </ListItemIcon>

            <ListItemText
              className={classes.txt}
              inset
              primary="Administrar Asistentes"
            />
          </ListItem>

        </List>
      </Container>
    </>
  )
};

export default Inicio;
