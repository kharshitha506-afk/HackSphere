import Home from "./pages/Home";
import "./styles.css";
import { WasteProvider } from "./context/WasteContext";

function App() {
  return (
    <WasteProvider>
      <Home />
    </WasteProvider>
  );
}

export default App;