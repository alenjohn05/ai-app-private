import { Grid, Typography } from "@mui/material";
import "./App.css";
import Layout from "./Layout/Layout";
import PromptBuilder from "./Components/PromptBuilder";
import AnswerCard from "./Components/AnswerCard";
import { useState } from "react";
import TrackleFlow from "./Components/TrackleFlow";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [contentApp, setContentApp] = useState({
    content: [
      {
        id: 1,
        Step: 1,
        Title: "Choose a News Source",
        Des: "Select a news source to get the latest news from",
        NextStep: 2,
        Previous_Step: null,
        x_pos: 10,
        y_pos: 10,
        Decision: {
          Question: "Which news source would you like to use?",
          Options: [
            {
              Answer: "CNN",
              NextStep: 2,
              x_pos: 10,
              y_pos: 20,
            },
            {
              Answer: "BBC",
              NextStep: 2,
              x_pos: 10,
              y_pos: 30,
            },
            {
              Answer: "Fox News",
              NextStep: 2,
              x_pos: 10,
              y_pos: 40,
            },
          ],
        },
      },
      {
        id: 2,
        Step: 2,
        Title: "Choose a News Category",
        Des: "Select a news category to get the latest news from",
        NextStep: 3,
        Previous_Step: 1,
        x_pos: 20,
        y_pos: 10,
        Decision: {
          Question: "Which news category would you like to view?",
          Options: [
            {
              Answer: "Politics",
              NextStep: 3,
              x_pos: 20,
              y_pos: 20,
            },
            {
              Answer: "Sports",
              NextStep: 3,
              x_pos: 20,
              y_pos: 30,
            },
            {
              Answer: "Entertainment",
              NextStep: 3,
              x_pos: 20,
              y_pos: 40,
            },
          ],
        },
      },
      {
        id: 3,
        Step: 3,
        Title: "View News Articles",
        Des: "View the latest news articles from the selected news source and category",
        NextStep: null,
        Previous_Step: 2,
        x_pos: 30,
        y_pos: 10,
      },
      {
        id: 4,
        Step: 4,
        Title: "Save Articles",
        Des: "Save articles to read later",
        NextStep: null,
        Previous_Step: 3,
        x_pos: 40,
        y_pos: 10,
      },
      {
        id: 5,
        Step: 5,
        Title: "Share Articles",
        Des: "Share articles with friends and family",
        NextStep: null,
        Previous_Step: 4,
        x_pos: 50,
        y_pos: 10,
      },
    ],
    name: "News App",
  });

  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Grid>
        <Layout />
        <PromptBuilder />
        <AnswerCard />
        <TrackleFlow />
      </Grid>
    </div>
  );
}

export default App;
