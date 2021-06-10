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
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

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
          style={{ margin: "60px auto", backgroundcolor: "#fefbd8" }}
          elevation={3}
        >
          <Paper elevation={3}>
            <Row style={{ margin: "auto 20px" }}>
              <Col sm="8">
                <h1>Detallles del Partido</h1>
                <h3>Partido Contra: YYY</h3>
                <h3>Temporada: X</h3>
              </Col>
              <Col sm="4" style={{ backgroundColor: "#787682" }}>
                <h1>Tiempo del partido</h1>
                <Timer style={{ backgroundColor: "#787682" }} />
              </Col>
            </Row>
          </Paper>
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
