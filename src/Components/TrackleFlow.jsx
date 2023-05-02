import {
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import AddIcon from "@mui/icons-material/Add";

const TrackleFlow = ({ contentData, nameData }) => {
  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 20, y: 200 }, data: { label: "2" } },
  ];
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const getTheNodes = () => {
    let createdNodes = [];
    let createdNodesEdges = [];
    contentData.forEach((eachSteps, index) => {
      const arrayInsideContent = {
        id: eachSteps.Step.toString(),
        position: { x: 0 + 30 * index, y: 0 + 80 * index },
        data: {
          label: eachSteps.Title,
        },
      };
      const arrayNodeEdges = {
        id: `e${eachSteps.Step}-${eachSteps.NextStep}`,
        source: eachSteps?.Step?.toString(),
        target: eachSteps?.NextStep?.toString(),
      };
      createdNodesEdges.push(arrayNodeEdges);
      createdNodes.push(arrayInsideContent);
    });
    setNodes(createdNodes);
    setEdges(createdNodesEdges);
  };

  useEffect(() => {
    if (contentData) {
      getTheNodes();
    }
  }, [contentData]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const handleClickOfContent = () => {
    console.log("data");
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
            <Grid p={3} sx={{ width: "100%" }}>
              <Typography variant="h3" my={2}>
                New App
              </Typography>
              <Divider />
              <Grid
                sx={{
                  p: 1,

                  border: "1px solid #e9e9e9",
                }}
              >
                <Grid>
                  <IconButton onClick={handleClickOfContent}>
                    <AddIcon />
                  </IconButton>
                </Grid>
                <div style={{ width: "100%", height: "60vh" }}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                  >
                    <Controls />
                    <MiniMap />
                    <Background variant="dots" gap={12} size={1} />
                  </ReactFlow>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>
    </Grid>
  );
};

export default TrackleFlow;
