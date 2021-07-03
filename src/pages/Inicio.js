import { Button1, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
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
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const Inicio = () => {
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

  return (
    <>
      <TopMenuBar></TopMenuBar>
      <Container
        style={{
          backgroundColor: "#00c0f3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "160%",
          fontWeight: "bold",
          borderBottomRightRadius: "15px",
          borderBottomLeftRadius: "15px",
          boxShadow: "0px 2px 3px -2px",
          // marginLeft: "50px",
          // marginRight: "50px",
        }}
      >
        <Typography
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: "100%",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Bienvenido *Usuario*
        </Typography>

        <br></br>
      </Container>
      <br></br>
      <br></br>
      <Divider variant="middle" />
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
          <ListItem button component="a" href="/menuJugador">
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
  );
};

export default Inicio;
