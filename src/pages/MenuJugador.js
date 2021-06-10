import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import PartidoIcon from "@material-ui/icons/SportsSoccer";
import TeamIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});




const MenuJugador = () => {

  useEffect(() => {
    axiosConsulta();
  }, [null]);

  function axiosConsulta() {
    axios
      .get(`http://localhost:3000/api/jugadores/`)
      .then((resultado) => {
        const jugadoresList = resultado.data.data;

        setJugadores(jugadoresList);
        //console.log(jugadores[0].nombre);
        //console.log("variablex: " + listaJugadores);
      })
      .catch((err) => { });

  }

  const [jugadores, setJugadores] = React.useState([]);
  const classes = useStyles();
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //axiosConsulta();
  //prueba

  const bull = <span className={classes.bullet}>•</span>;
  const classes2 = useStyles2();
  return (

    <Box sx={{ pb: 7 }}>
      <AppBar style={{ position: "relative", bottom: 0 }} color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab label="Añadir Jugador" icon={<PartidoIcon />} />
          <Tab label="Lista Jugadores" icon={<TeamIcon />} />
          <Tab label="Volver" icon={<HomeIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* <Container fluid="md" style={{ margin: "60px auto" }}>
          <Row style={{ background: "lightblue" }}>
            <Col sm="8">
              <h1>Detallles del Partido</h1>
              <h3>Partido Contra: YYY</h3>
              <h3>Temporada: X</h3>
            </Col>
            <Col sm="4">
              <h2>Tiempo del partido</h2>
              <h3>Ha transcurrido: 000 Minutos</h3>
            </Col>
          </Row>
          <Row style={{ background: "green" }}>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
          <Row style={{ background: "blue" }}>
            <Col>
              <h1>f</h1>
            </Col>
          </Row>
        </Container> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container fluid="md" style={{ margin: "60px auto" }}>
          <Row style={{ background: "lightblue" }}>

            {jugadores.map((jugador, index) => {
              return (
                <Card style={{ margin: "60px auto" }} className={classes2.root}>
                  <CardContent style={{ backgroundColor: "gray" }}>
                    <Typography className={classes2.title} color="textSecondary" gutterBottom>
                      Nombre: {jugador.nombre}
                    </Typography>

                  </CardContent >
                  <CardActions style={{ backgroundColor: "gray" }}>
                    <Button variant="contained" color="default">Ver</Button>
                    <Button variant="contained" color="default">Eliminar</Button>
                  </CardActions>
                </Card>
              );
            })}


          </Row>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Bienvenido A la Seccion De Jugadores
      </TabPanel>
    </Box>
  );
};

export default MenuJugador;
