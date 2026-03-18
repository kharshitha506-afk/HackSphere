
import React, { useState } from "react";

import "./components/LandingPage.css";

function App() {
  const [role, setRole] = useState(null);

  return (
    <WasteProvider>
      {!role ? (
        <LandingPage onSelectRole={setRole} />
      ) : (
        <Home role={role} />
      )}
    </WasteProvider>
  );
}

export default App;