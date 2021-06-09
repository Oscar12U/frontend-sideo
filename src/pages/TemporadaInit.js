import { Button1, Col, Row, Container } from "react-bootstrap";
import React from "react";
import TopMenuBar from "../components/TopMenuBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const TemporadaInit = () => {
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
      <br></br>

      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List component="nav" className={classes.root} aria-label="contacts">
          <ListItem button>
            <ListItemIcon className={classes.txt}>
              <ArrowForwardIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Seleccionar Temporada"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.txt}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.txt}
              inset
              primary="Añadir Temporada"
            />
          </ListItem>
        </List>
      </Container>
    </>
  );
};

export default TemporadaInit;
