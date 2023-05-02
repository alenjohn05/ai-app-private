import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useForm } from "react-hook-form";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import SchemaOutlinedIcon from "@mui/icons-material/SchemaOutlined";
import { toast } from "react-toastify";
import SchemaModal from "./SchemaModal";
import { GenerateAppContext } from "../Context/Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  minHeight: "70%",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 1,
};

const AnswerCard = ({ handleTheSetContent }) => {
  const { GenerateAppDetails, handleGenerateAppDetails } =
    useContext(GenerateAppContext);

  const contentData = GenerateAppDetails.content;
  const nameData = GenerateAppDetails.name;

  // Modal Content Data
  const [openModalContent, setOpenModalContent] = React.useState(false);
  const handleOpenModalContent = () => setOpenModalContent(true);
  const handleCloseModalContent = () => setOpenModalContent(false);

  const handleTheContentForTheSchema = () => {
    handleOpenModalContent();
  };

  const [createdFeatures, setCreatedFeatures] = useState(null);
  const [selectedNextSteps, setSelectedNextSteps] = useState(null);
  const [selectedPreviousSteps, setSelectedPreviousSteps] = useState(null);
  useEffect(() => {
    if (contentData) {
      setCreatedFeatures(contentData);

      setSelectedNextSteps(contentData[0].Step);
      setSelectedPreviousSteps(contentData[1].Step);
    }
  }, [contentData]);

  const handleDeleteOfStep = (deletedData) => {
    const newData = createdFeatures.filter(
      (eachData) => deletedData.id !== eachData.id
    );
    setCreatedFeatures(newData);
    toast.success("The Step is deleted successfully");
  };

  //Handle the Development of the Content
  const [openAddStepDrawer, setOpenAddStepDrawer] = useState(false);

  const toggleOpenDrawer = (newOpenAddStepDrawer) => {
    setOpenAddStepDrawer(newOpenAddStepDrawer);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Handle Add Step event
  const handleTheAddStepContent = (data) => {
    const newArrayContent = {
      Description: data.description_content,
      NextStep: selectedNextSteps,
      Step: createdFeatures?.length + 1,
      Title: data.title_content,
    };
    const newFormedArray = [...createdFeatures];
    newFormedArray.push(newArrayContent);
    setCreatedFeatures(newFormedArray);
    handleGenerateAppDetails(newFormedArray);
    toast.success("New step is Added");
    toggleOpenDrawer(false);
  };

  const handleTheClickEventContent = async (dataContent) => {
    const basePrompt = `'${dataContent.Des}'  rewrite it and give as json in this format with 40 words:
    {
    "id": ..,
    "rewritten_sentence": "..",
    }`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    };
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: basePrompt,
          temperature: 0,
          max_tokens: 1024,
        }),
      });
      const itinerary = await response.json();

      const newTextContent = itinerary.choices[0].text.replace("Answer:", "");
      const responseGot = JSON.parse(newTextContent);
      const newArrayContent = createdFeatures.map((eachContent) => {
        if (eachContent.Step === dataContent.Step) {
          return {
            ...eachContent,
            Des: responseGot.rewritten_sentence,
          };
        } else {
          return eachContent;
        }
      });
      setCreatedFeatures(newArrayContent);
      toast.success("The Selected Description Changed");
    } catch (err) {
      console.log(err);
      toast.error("Failed to Change the Selected Description");
    }
  };

  const DrawerContent = () => (
    <Grid width={"400px"} p={2}>
      <Card
        sx={{
          p: 1,
          px: 2,
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
        }}
      >
        <Typography variant="h3" my={2} textAlign={"center"}>
          Add steps to the app
        </Typography>
        <Divider />
        <Grid p={2}>
          <Typography variant="h6" my={2}>
            Title
          </Typography>
          <TextField
            hiddenLabel
            placeholder="Enter the title of step"
            variant="outlined"
            fullWidth
            size="small"
            {...register("title_content", { required: true })}
          />
          {errors.title_content && (
            <span className="invalid-error">This field is required</span>
          )}
          <Typography variant="h6" my={2}>
            Description
          </Typography>
          <TextField
            hiddenLabel
            placeholder="Enter the Description of the feild"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
            size="small"
            {...register("description_content", { required: true })}
          />
          {errors.description_content && (
            <span className="invalid-error">This field is required</span>
          )}
          <Typography variant="h6" my={2}>
            Next Step
          </Typography>
          <TextField
            hiddenLabel
            placeholder="Enter the Description of the feild"
            select
            variant="outlined"
            fullWidth
            value={selectedNextSteps}
            size="small"
            onChange={(e) => setSelectedNextSteps(e.target.value)}
          >
            {contentData.map((eachSteps, index) => {
              if (eachSteps.Step === selectedPreviousSteps) {
                return null;
              } else {
                return (
                  <MenuItem key={index} value={eachSteps.Step}>
                    {eachSteps.Title} - {eachSteps.Step}
                  </MenuItem>
                );
              }
            })}
            <MenuItem value={-1}>No Step</MenuItem>
          </TextField>
          <Typography variant="h6" my={2}>
            Previous Step
          </Typography>
          <TextField
            hiddenLabel
            placeholder="Enter the Description of the feild"
            select
            variant="outlined"
            value={selectedPreviousSteps}
            fullWidth
            size="small"
            onChange={(e) => setSelectedPreviousSteps(e.target.value)}
          >
            {contentData.map((eachSteps, index) => {
              if (eachSteps.Step === selectedNextSteps) {
                return null;
              } else {
                return (
                  <MenuItem key={index} value={eachSteps.Step}>
                    {eachSteps.Title} - {eachSteps.Step}
                  </MenuItem>
                );
              }
            })}
            <MenuItem value={-1}>No Step</MenuItem>
          </TextField>
          <Grid
            my={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"end"}
          >
            <Button
              size="small"
              variant="outlined"
              sx={{ mx: 2 }}
              onClick={() => toggleOpenDrawer(false)}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleSubmit(handleTheAddStepContent)}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );

  return (
    <>
      <Modal
        open={openModalContent}
        onClose={handleCloseModalContent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SchemaModal handleCloseModalContent={handleCloseModalContent} />
        </Box>
      </Modal>
      {createdFeatures ? (
        <Grid mt={4}>
          <Container>
            <Grid>
              <Card
                sx={{
                  boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Grid p={3} sx={{ width: "100%" }}>
                  <Grid
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="h3" my={2}>
                      Steps for {nameData}:
                    </Typography>
                    <Grid>
                      <Button
                        variant="contained"
                        my={2}
                        onClick={() => toggleOpenDrawer(true)}
                      >
                        Add Steps
                      </Button>
                      <Drawer
                        open={openAddStepDrawer}
                        onClose={() => toggleOpenDrawer(false)}
                      >
                        <DrawerContent />
                      </Drawer>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Grid container>
                      {createdFeatures?.map((each, index) => (
                        <Grid key={index} item xs={12} md={4} py={1} pr={1}>
                          <Card
                            sx={{
                              p: 1,
                              boxShadow:
                                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
                            }}
                          >
                            <Grid>
                              <Grid
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                p={1}
                              >
                                <Chip label={`${index + 1}`} color="warning" />
                                <Grid>
                                  <IconButton
                                    color="warning"
                                    size="small"
                                    sx={{ mx: 1 }}
                                    onClick={() =>
                                      handleTheClickEventContent(each)
                                    }
                                  >
                                    <AutoAwesomeOutlinedIcon />
                                  </IconButton>
                                  <IconButton
                                    color="warning"
                                    size="small"
                                    sx={{ mx: 1 }}
                                    onClick={() =>
                                      handleTheContentForTheSchema(each)
                                    }
                                  >
                                    <SchemaOutlinedIcon />
                                  </IconButton>
                                  <IconButton
                                    color="error"
                                    size="small"
                                    sx={{ mx: 1 }}
                                    onClick={() => handleDeleteOfStep(each)}
                                  >
                                    <DeleteOutlineOutlinedIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                              <Divider />
                              <Grid px={2} sx={{ height: "150px" }}>
                                <Typography variant="h4" my={1}>
                                  {each.Title}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  my={1}
                                  sx={{ fontSize: "12px", fontWeight: "400" }}
                                >
                                  {each.Des}
                                </Typography>
                              </Grid>
                              <Divider />
                              <Grid
                                px={2}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                              >
                                <Typography
                                  sx={{ fontWeight: 400, fontSize: "12px" }}
                                >
                                  {`Next Step: ${each.NextStep}`}
                                </Typography>
                                <Typography
                                  sx={{ fontWeight: 400, fontSize: "12px" }}
                                >
                                  {`Previous Step: ${each.Previous_Step}`}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Container>
        </Grid>
      ) : null}
    </>
  );
};

export default AnswerCard;
