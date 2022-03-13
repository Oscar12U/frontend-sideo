import React, { memo } from "react";
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
      <Typography
        style={{
          fontFamily: "Arial",
          color: "#000000",
          fontSize: "150%",
          display: "flex",
          fontWeight: "bold",
          justifyContent: "center",
          textAlign: "justify",
          textJustify: "inter-word",
        }}
        className={classes2.title}
        gutterBottom
      >
        <br /> {jugador}
      </Typography>
    </>
  );
});

export default withRouter(Jugador);
