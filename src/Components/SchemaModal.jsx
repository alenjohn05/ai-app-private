import {
  Grid,
  IconButton,
  Typography,
  Button,
  Divider,
  TextField,
  Card,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const SchemaModal = ({ handleCloseModalContent }) => {
  const schemaContentData = [
    {
      id: 1,
      name: "Name",
      type: "String",
    },
    {
      id: 2,
      name: "Phone Number",
      type: "Number",
    },
    {
      id: 3,
      name: "Date of Birth",
      type: "Date",
    },
    {
      id: 4,
      name: "Description",
      type: "Text",
    },
  ];
  const [schemaContent, setschemaContent] = useState([...schemaContentData]);
  const handleTheContentDataDelete = (dataContent) => {
    const newDataContent = schemaContent.filter(
      (eachSchema) => eachSchema.id !== dataContent.id
    );
    setschemaContent([...newDataContent]);
  };

  const handleTheClickOfTheSaveOftheSchema=()=>{
    
  }
  return (
    <Grid p={1}>
      <Grid
        display={"flex"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Grid>
          <Typography variant="h6" color={"primary"}>
            Schema Modal
          </Typography>
        </Grid>
        <IconButton onClick={handleCloseModalContent}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider />
      <Grid
        sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
        my={2}
      >
        <Button variant={"contained"} size="small" sx={{ mr: 1 }} onClick={handleTheClickOfTheSaveOftheSchema}>
         Save Schema
        </Button>
        <Button variant={"outlined"} size="small">
          Generate Schema
        </Button>
      </Grid>
      <Grid>
        {schemaContent?.map((eachContent, indexData) => (
          <Card
            key={indexData}
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
              borderRadius: "0px",
            }}
          >
            <Grid
              p={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid sx={{ mr: 2, minWidth: "150px" }}>
                  <Typography variant={"h6"} color={"primary"}>
                    {eachContent.name}
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid sx={{ ml: 2, mr: 2, minWidth: "150px" }}>
                  <Chip label={eachContent.type} variant="outlined" />
                </Grid>
                <Divider orientation="vertical" flexItem />
              </Grid>
              <Grid>
                <IconButton
                  onClick={() => handleTheContentDataDelete(eachContent)}
                >
                  <HighlightOffOutlinedIcon sx={{ color: "#ff0000" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default SchemaModal;
