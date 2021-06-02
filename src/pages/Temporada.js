import { Col, Row, Container } from "react-bootstrap";
import React from "react";
import TopMenuBar from "../components/TopMenuBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssessmentIcon from '@material-ui/icons/Assessment';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CreateIcon from '@material-ui/icons/Create';
import PanToolIcon from '@material-ui/icons/PanTool';
import Button from '@material-ui/core/Button';

const Temporada = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: '#118DD0',
      borderRadius: '15px',
      margin: 'auto',
    },
  }));

  const textStyles = makeStyles((theme) => ({
    root: {
      color: '#FBFEF9',
      font: 'bold',
    },
  }));
  
  const classes = useStyles();
  const text = textStyles();

  return (
    <>
      <TopMenuBar></TopMenuBar>
      <br></br>
      <Row>
      <Container fluid="md">
        <input md="auto" type="text" id="fname" name="fname"></input>
        <Button variant="contained" margin>Guardar</Button>
        <br></br>
      </Container>
      </Row>
      <br></br>
      <br></br>
      <Container md="center">
      

        <List component="nav" className={classes.root} aria-label="contacts">
          <ListItem button>
            <ListItemIcon className={text.root}>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText className={text.root} inset primary="Crear Partido" />
          </ListItem>
          <ListItem button>
          <ListItemIcon className={text.root}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText className={text.root} inset primary="Estadisticas de Temporada" />
          </ListItem>
          <ListItem button>
          <ListItemIcon className={text.root}>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText className={text.root} inset primary="Crear Entrenamiento" />
          </ListItem>
          <ListItem button>
          <ListItemIcon className={text.root}>
              <PanToolIcon />
            </ListItemIcon>
            <ListItemText className={text.root} inset primary="Gestionar Partido" />
          </ListItem>
        </List>


        {/*   <Row>
          <Col></Col>
          <Col md="center">
            <Button variant="primary ml-2" md="auto">
              Crear Partido
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <Row>
          <Col></Col>
          <Col md="center">
            <Button variant="primary ml-2" md="auto">
              Estadisticas de Temporada
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <Row>
          <Col></Col>
          <Col md="center">
            <Button variant="primary ml-2" md="auto">
              Crear Entrenamiento
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <Row>
          <Col></Col>
          <Col md="center">
            <Button variant="primary ml-2" md="auto">
              Gestionar Partido
            </Button>
          </Col>
          <Col></Col>
        </Row> */}
      </Container>
    </>
  );
};

export default Temporada;
