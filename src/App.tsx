import { useRoutes } from "react-router-dom";
import router from "./routes/router";
import { Provider } from "react-redux";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import { store } from "./store/index";
import "./assets/css/customStyles.css";
import "./assets/fonts/fonts.css";
import "./assets/fonts/GTWalsheimPro/stylesheet.css";
import { ToastListener } from "./customHooks/Toaster";
import "@szhsin/react-menu/dist/index.css";
import { Toaster } from "react-hot-toast"; // ✅ Import from react-hot-toast

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Provider store={store}>
        {/* ✅ Remove ToastProvider and use Toaster instead */}
        <ToastListener />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "GT Walsheim Pro, sans-serif",
              fontSize: "0.95rem",
              padding: "12px 20px",
              borderRadius: "10px",
              background: "#333",
              color: "#fff"
            }
          }}
        />
        {content}
      </Provider>
    </ThemeProvider>
  );
}

export default App;
