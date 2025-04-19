import { useRoutes } from "react-router-dom";
import router from "./routes/router";
import { Provider } from "react-redux";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import { store } from "./store/index";
import { ToastProvider } from "react-toast-notifications";
import "./assets/css/customStyles.css";
import "./assets/fonts/fonts.css";
import "./assets/fonts/GTWalsheimPro/stylesheet.css";
import { ToastListener } from "./customHooks/Toaster";
import "@szhsin/react-menu/dist/index.css";

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Provider store={store}>
        <ToastProvider autoDismiss autoDismissTimeout={3000}>
          {/* <InterceptorSetup /> */}
          <ToastListener />
          {content}
        </ToastProvider>
      </Provider>
    </ThemeProvider>
  );
}
export default App;
