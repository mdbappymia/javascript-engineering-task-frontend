import "./App.css";
import Home from "./Components/Home/Home";
import ContextProvider from "./contexts/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
}

export default App;
