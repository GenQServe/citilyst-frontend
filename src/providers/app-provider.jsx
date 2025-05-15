import ReduxProvider from "./redux-provider";
import { BrowserRouter } from "react-router-dom";

const AppProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <ReduxProvider>{children}</ReduxProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
