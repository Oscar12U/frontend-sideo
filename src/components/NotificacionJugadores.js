import React, { memo, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
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
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "10px",
            fontWeight: "bold",
            fontSize: "35px",
          }}
        >
          Notificaciones
        </Container>
        <br />
        {this.props.notificaciones.map((notificacion, index) => {
          return (
            <>
              <Container
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "90%",
                  maxHeight: "90%",
                  marginBottom: "20px",
                }}
              >
                <Card
                  style={{
                    // margin: "30px auto",
                    backgroundColor: "#FFFFFF",
                    maxWidth: "1",
                    maxHeight: "1",
                  }}
                  className={this.useStyles.root}
                >
                  <CardContent
                    style={{
                      backgroundColor: "#FFFFFF",
                      margin: "auto",
                      maxWidth: "60%",
                      maxHeight: "60%",
                    }}
                  >
                    <Typography
                      className={this.useStyles.title}
                      color="textSecondary"
                      gutterBottom
                      style={{
                        color: "black",
                        fontSize: "20px",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                      }}
                    >
                      {notificacion.descripcion}
                    </Typography>
                    <Divider variant="fullWidth" />
                  </CardContent>
                  <CardActions
                    style={{
                      backgroundColor: "#FFFFFF",
                      alignItems: "center",
                      justifyContent: "center",
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
                      onClick={() =>
                        this.props.handleEliminarNotif(notificacion)
                      }
                    >
                      Eliminar
                    </Button>
                  </CardActions>
                </Card>
              </Container>
            </>
          );
        })}
      </>
    );
  }
}

export default TiempoJugadoresPartido;
