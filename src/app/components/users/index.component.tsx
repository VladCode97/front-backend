import { Grid, Box } from "@mui/joy";
import MenuDashboard from "./menu-dashboard";
import { Outlet } from "react-router-dom";

export function HomeComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 300,
        }}
      >
        <MenuDashboard />
      </Box>
      <Box sx={{ overflow: "auto", px: 10 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
