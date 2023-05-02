import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import CachedIcon from "@mui/icons-material/Cached";
import { toast } from "react-toastify";
import { GenerateAppContext } from "../Context/Context";

const PromptBuilder = () => {
  const { GenerateAppDetails, handleGenerateAppDetails } =
  useContext(GenerateAppContext);
  console.log(GenerateAppDetails,'-----------------')

  const [isLoadingStarted, setIsLoadingStarted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoadingStarted(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer sk-FQEbRtNAxbvuBtBenO9sT3Bluit54y98t489uy54u8`,
    };
    const basePrompt = `
      Could you please provide me with a process flow for ${data.app_detail} with step 
      relation keys in a JSON format, similar to the one below? Please include at least 
      1 points, and make sure to specify the position of each card in the browser 
      using the x_pos and y_pos values to prevent overlap. Return data in this JSON structure:
      [
        {
          "id": ..,
          "Step": ..,
          "Title": "..",
          "Des": "..",
          "NextStep":..,
          "Previous_Step":..,
          "x_pos":..,
          "y_pos":..,
           "DataBase_Schema":[
            {
              "id":..,
              "name":"..",
              "type":"..",

            },..,
           ]
          "Decision": {
            "Question": "..",
            "Options": [
              {
                "Answer": "..",
                "NextStep": ..,
                "x_pos":..,
                "y_pos":..,
                "DataBase_Schema":[
                  {
                    "id":..,
                    "name":"..",
                    "type":"..",
      
                  },..,
                 ]
              },
              {
                "Answer": "..",
                "NextStep": ..,
                "x_pos":..,
                "y_pos":..,
                "DataBase_Schema":[
                  {
                    "id":..,
                    "name":"..",
                    "type":"..",
      
                  },..,
                 ]
              }
            ]
          }
        },
      ]
      `;
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
      handleGenerateAppDetails({
        content: JSON.parse(newTextContent),
        name: data.app_name,
      });
      setIsLoadingStarted(false);
      toast.success("App is generated successfully");
    } catch (err) {
      console.log(err)
      setIsLoadingStarted(false);
      toast.error("Failed to generate the App");
    }
  };

  return (
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
            <Grid p={3} sx={{ width: "60%" }}>
              <Typography variant="h3" my={2}>
                New App
              </Typography>
              <Divider />
              <Grid>
                <Typography variant="h6" my={2}>
                  App Name
                </Typography>
                <TextField
                  hiddenLabel
                  placeholder="Enter the Name of the App"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("app_name", { required: true })}
                />
                {errors.app_name && (
                  <span className="invalid-error">This field is required</span>
                )}
              </Grid>
              <Grid>
                <Typography variant="h6" my={2}>
                  App Details
                </Typography>
                <TextField
                  hiddenLabel
                  placeholder="Enter the Details of the App"
                  variant="outlined"
                  multiline
                  rows={10}
                  fullWidth
                  size="small"
                  {...register("app_detail", {
                    required: true,
                  })}
                />
                {errors.app_detail && (
                  <span className="invalid-error">This field is required</span>
                )}
              </Grid>
              <Grid my={2}>
                {isLoadingStarted ? (
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    variant="outlined"
                    startIcon={<CachedIcon />}
                  >
                    Generating
                  </LoadingButton>
                ) : (
                  <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Generate App
                  </Button>
                )}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>
    </Grid>
  );
};

export default PromptBuilder;
