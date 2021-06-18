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
    font: "Bold",
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

  return (
    <Box sx={{ pb: 7 }}>
      <TopMenuBar></TopMenuBar>
      <br></br>

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
          fluid="md"
          style={{
            border: "3px solid #456990",
            margin: "60px auto",
            backgroundColor: "#456990",
            borderRadius: "15px",
          }}
          elevation={3}
        >
          <br></br>
          <Paper
            elevation={3}
            borderRadius={50}
            style={{
              backgroundColor: "#FFFFFF",
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
          <br></br>
          <Container elevation={3}>
            <Row
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#FFFFFF",
                margin: "auto",
              }}
            >
              <Col
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                  backgroundColor: "#00070",
                  borderRadius: "15px",
                }}
              >
                <div
                  className={classes.p1}
                  style={{
                    color: "#FFFFFF",
                  }}
                >
                  Seleccionar jugador
                </div>
                <DropdownButton  variant="primary"
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
              </Col>

              <Col
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Container
                  fluid="md"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <br></br>
                  <Button variant="primary" size="lg">
                    Gol
                  </Button>{" "}
                  <br></br>
                  <Form
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  >
                    {["A favor", "En contra"].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          type={"checkbox"}
                          id={`${type}`}
                          label={`${type}`}
                        />
                      </div>
                    ))}
                  </Form>
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
              <Col>
                <Container
                  fluid="md"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <Col
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
                </Container>
              </Col>
            </Row>
          </Container>
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
