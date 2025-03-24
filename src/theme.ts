import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif", // Only Poppins font
  },
  palette: {
    primary: {
      main: "#1E4D92", // Primary color
    },
    secondary: {
      main: "#3E7CB1", // Secondary color
    },
    
  },
});

export default theme;

