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
            margin: "60px auto",
            backgroundColor: "#4A77BF",
            borderRadius: "15px",
          }}
          elevation={3}
        >
          <br></br>
          <Paper
            elevation={3}
            borderRadius={50}
            style={{
              backgroundColor: "#FFFFFF"
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
          <Container
            fluid="md"
            style={{
              margin: "60px auto",

              backgroundColor: "#4A77BF",
            }}
            elevation={3}
          >
            <Row
              style={{
                margin: "40px 50px",
                columnRuleStyle: "groove",
                columnRuleWidth: "3px",
                columnRuleColor: "lightcoral",
              }}
            >
              <Col style={{ borderRight: "3px solid #A9A9A9" }}>
                <h3>Seleccionar jugador</h3>
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
              <Col style={{ borderRight: "3px solid #A9A9A9" }}>
                <Container fluid="md" style={{ margin: "auto" }}>
                  <Row>
                    <Col>
                      <Button variant="primary" size="lg">
                        Gol
                      </Button>{" "}
                    </Col>
                    <Col>
                      <Form>
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
                    </Col>
                  </Row>
                  <Row style={{ margin: "20px auto" }}>
                    <Button variant="secondary" size="lg">
                      Falta
                    </Button>
                  </Row>
                  <Row style={{ margin: "10px auto" }}>
                    <Button variant="secondary" size="lg">
                      Lesion
                    </Button>
                  </Row>
                </Container>
              </Col>
              <Col>
                <Container>
                  <Col>
                    <Row>
                      <h3>Jugador Entra</h3>
                      <br></br>
                      <DropdownButton
                        id="dropdown-item-button"
                        title="Seleccionar Jugador"
                      >
                        <Dropdown.ItemText>Lista Jugadores</Dropdown.ItemText>
                        <Dropdown.Item as="button">Jugador 1</Dropdown.Item>
                        <Dropdown.Item as="button">Jugador 2</Dropdown.Item>
                        <Dropdown.Item as="button">Jugador 3</Dropdown.Item>
                      </DropdownButton>
                    </Row>
                    <Row>
                      <h3>Jugador Sale</h3>
                      <br></br>
                      <DropdownButton
                        id="dropdown-item-button"
                        title="Seleccionar Jugador"
                      >
                        <Dropdown.ItemText>Lista Jugadores</Dropdown.ItemText>
                        <Dropdown.Item as="button">Jugador 1</Dropdown.Item>
                        <Dropdown.Item as="button">Jugador 2</Dropdown.Item>
                        <Dropdown.Item as="button">Jugador 3</Dropdown.Item>
                      </DropdownButton>
                    </Row>
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
