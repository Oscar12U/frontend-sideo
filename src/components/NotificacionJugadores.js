import React, { memo, useEffect } from "react";
import { Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

class TiempoJugadoresPartido extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  render() {
    return (
      <>
        <h2>Notificaciones</h2>
        {this.props.notificaciones.map((jugador, index) => {
          return (
            <>
              <Card
                style={{
                  margin: "30px auto",
                  backgroundColor: "#FFFFFF",
                  maxWidth: "250px",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                className={this.useStyles.root}
              >
                <CardContent
                  style={{
                    backgroundColor: "#FFFFFF",
                    maxWidth: "250px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <Typography
                    className={this.useStyles.title}
                    color="textSecondary"
                    gutterBottom
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      color: "black",
                      fontSize: "20px",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                    }}
                  >
                    El jugador {jugador} ha cumplido con el tiempo maximo de
                    juego
                  </Typography>
                  <Divider />
                  <br />
                </CardContent>
                <CardActions
                  style={{
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Button
                    variant="contained"
                    color="default"
                    style={{
                      backgroundColor: "#DE1A1A",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      color: "#FFFFFF",
                    }}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </>
          );
        })}
      </>
    );
  }
}

export default TiempoJugadoresPartido;
