import ReduxProvider from "./redux-provider";
import { BrowserRouter } from "react-router-dom";
import GSAPProvider from "./gsap-provider";

const AppProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <ReduxProvider>
        <GSAPProvider>{children}</GSAPProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
