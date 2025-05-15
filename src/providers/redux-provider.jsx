import { Provider } from "react-redux";
import store from "@/features/store";
import ReactQueryProvider from "./react-query-provider";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </Provider>
  );
};

export default ReduxProvider;
