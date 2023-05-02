import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Grid
      sx={{
        boxShadow:
          "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
          py:3,
          backgroundColor:"#fff"
      }}
    >
      <Container maxWidth={'lg'}>
        <Grid>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            Trackle
          </Typography>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Header;
