import React from "react";
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

const MenuJugador = () => {
  const [jugadores, setJugadores] = React.useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState(3);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //prueba
  axios
    .get(`http://localhost:3000/api/entrenamientos/`)
    .then((resultado) => {
      const jugadores = resultado.data.data[0].nombre;
      console.log("hola: " + jugadores);
      setJugadores(jugadores);
    })
    .catch((err) => {});

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
        Item 2 {jugadores}
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
