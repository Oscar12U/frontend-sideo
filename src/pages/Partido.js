import React from "react";
import Timer from "../components/Timer";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import TopMenuBar from "../components/TopMenuBar";
import PartidoIcon from "@material-ui/icons/SportsSoccer";
import TeamIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Divider,
  Paper,
  Typography,
  Tab,
  Tabs,
  AppBar,
} from "@material-ui/core";
import GestorPartido from "../containers/GestorPartido";

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
  pr: {
    top: "100px",
  },
  p1: {
    fontSize: "25px",
    color: "#000000",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  p2: {
    fontSize: "20px",
    color: "#000000",
    font: "Bold",
  },
  p3: {
    fontSize: "15px",
    color: "#000000",
    font: "Bold",
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let gestorPartido = new GestorPartido("Partido 1");

  const CrearPartido = () => {
    gestorPartido.crearPartido();
  };

  const AddGol = () => {
    gestorPartido.agregarGol(
      "60c17846a44ca10e58b3ae5a",
      "60c17855a44ca10e58b3ae5b",
      5,
      1
    );
  };
  return (
    <Box
      sx={{ pb: 7 }}
      style={{
        //border: "3px solid #456990",
        backgroundColor: "#FFFFFF",
      }}
    >
      <TopMenuBar></TopMenuBar>

      <AppBar style={{ position: "relative" }} color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab label="Partido" icon={<PartidoIcon />} />
          <Tab label="Equipo" icon={<TeamIcon />} />
          <Tab label="Volver" icon={<HomeIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container
          style={{
            //border: "3px solid #456990",
            margin: "30px auto",
            backgroundColor: "#005da4",
            borderRadius: "15px",
          }}
          elevation={3}
        >
          <br />
          <div>
            <Paper
              elevation={0}
              borderRadius={50}
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: "15px",
              }}
            >
              <Row style={{ margin: "auto 20px" }}>
                <Col sm="6" style={{}}>
                  <div className={classes.p1}>Detalles del Partido</div>
                  <br></br>
                  <div className={classes.p2}>
                    Partido Contra:<br></br> YYY
                  </div>
                  <div className={classes.p3}>
                    Temporada:<br></br> X
                  </div>
                </Col>
                <Col
                  sm="6"
                  style={{
                    font: "bold",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className={classes.p1}>Tiempo del partido</div>
                  <br></br>
                  <Timer
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  />
                  <br></br>
                </Col>
              </Row>
            </Paper>
          </div>
          <br />
          <Row
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#000000",
              fontWeight: "bold",
              margin: "auto",
            }}
          >
            <Container
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",
                backgroundColor: "#FFFFFF",
                borderRadius: "15px",
              }}
            >
              <br />

              <br />
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <div
                  className={classes.p1}
                  style={{
                    color: "#000000",
                  }}
                >
                  Seleccionar jugador
                </div>
              </Row>
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <DropdownButton
                  variant="primary"
                  id="dropdown-item-button"
                  title="Seleccionar Jugador"
                  style={{
                    marginBottom: "10px",
                    marginTop: "5px",
                  }}
                >
                  <Dropdown.ItemText>Lista Jugadores</Dropdown.ItemText>
                  <Dropdown.Item as="button">Jugador 1</Dropdown.Item>
                  <Dropdown.Item as="button">Jugador 2</Dropdown.Item>
                  <Dropdown.Item as="button">Jugador 3</Dropdown.Item>
                </DropdownButton>
              </Row>

              <Divider variant="middle" />

              <Row>
                <Col
                  md={6}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "center",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "15px",
                  }}
                >
                  <br></br>
                  <Button variant="primary" size="lg">
                    Gol
                  </Button>{" "}
                  <br></br>
                  <Form
                    style={{
                      marginTop: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "center",
                    }}
                  >
                    {["A favor", "En contra"].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          style={{}}
                          type={"checkbox"}
                          id={`${type}`}
                          label={`${type}`}
                        />
                      </div>
                    ))}
                  </Form>
                </Col>

                <Col
                  md={6}
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "center",
                  }}
                >
                  <Container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <br />
                    <br />
                    <Button
                      variant="primary"
                      style={{
                        margin: "5px",
                      }}
                      size="lg"
                    >
                      Falta
                    </Button>
                    <Button
                      variant="primary"
                      style={{
                        margin: "5px",
                      }}
                      size="lg"
                    >
                      Lesion
                    </Button>
                  </Container>
                </Col>
              </Row>
              <br />
            </Container>
            <br />

            <Container
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",
              }}
            >
              <br />
              <Row>
                <Col
                  md={6}
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "center",
                  }}
                >
                  <div
                    className={classes.p1}
                    style={{
                      color: "#FFFFFF",
                    }}
                  >
                    Jugador Entra
                  </div>
                  <DropdownButton
                    id="dropdown-item-button"
                    title="Seleccionar Jugador"
                  >
                    <Dropdown.ItemText>Lista Jugadores</Dropdown.ItemText>
                    <Dropdown.Item as="button">Jugador 1</Dropdown.Item>
                    <Dropdown.Item as="button">Jugador 2</Dropdown.Item>
                    <Dropdown.Item as="button">Jugador 3</Dropdown.Item>
                  </DropdownButton>
                  <br></br>
                </Col>
                <Col
                  md={6}
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "center",
                  }}
                >
                  <div
                    className={classes.p1}
                    style={{
                      color: "#FFFFFF",
                    }}
                  >
                    Jugador Sale
                  </div>
                  <DropdownButton
                    id="dropdown-item-button"
                    title="Seleccionar Jugador"
                  >
                    <Dropdown.ItemText>Lista Jugadores</Dropdown.ItemText>
                    <Dropdown.Item as="button">Jugador 1</Dropdown.Item>
                    <Dropdown.Item as="button">Jugador 2</Dropdown.Item>
                    <Dropdown.Item as="button">Jugador 3</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <br />

              <Button
                variant="primary"
                style={{
                  margin: "5px",
                }}
                size="lg"
              >
                Ejecutar Cambio
              </Button>
            </Container>
          </Row>
          <br></br>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item 2
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
