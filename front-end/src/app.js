import { Provider } from "react-redux";
import { store } from "./app/store";
import "./app.scss";

function App({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default App;
