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
import GolesxTemporada from "../components/ChartGolesTemporada";
import { useLocation } from "react-router-dom";

const Estadisticas = () => {
  let { temporadaID } = useLocation().state;
  return (
    <>
      <TopMenuBar></TopMenuBar>
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
          marginTop: "80px",
        }}
      >
        <GolesxTemporada temporada={temporadaID} />
        <br />
      </Container>
    </>
  );
};

export default Estadisticas;
