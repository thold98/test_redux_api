import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/inter/400.css"; // Regular
import "@fontsource/inter/500.css"; // Medium
import "@fontsource/inter/600.css"; // Semi-Bold
import "@fontsource/inter/700.css"; // Bold
import { Provider } from 'react-redux';
import store from './redux/store.ts';

const theme = createTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    fontWeightRegular: 400, // Regular
    fontWeightMedium: 500,  // Medium
    fontWeightBold: 700,    // Bold
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
