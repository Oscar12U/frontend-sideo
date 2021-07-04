import React, { memo } from "react";
import { Card } from "react-bootstrap";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles2 = makeStyles({
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

const Jugador = memo(({ jugador }) => {
  const classes2 = useStyles2();

  return (
    <>
      <Card style={{ margin: "60px auto" }} className={classes2.root}>
        <CardContent style={{ backgroundColor: "gray" }}>
          <Typography
            className={classes2.title}
            color="textSecondary"
            gutterBottom
          >
            Nombre: {jugador}
          </Typography>
        </CardContent>
        <CardActions style={{ backgroundColor: "gray" }}></CardActions>
      </Card>
    </>
  );
});

export default withRouter(Jugador);
