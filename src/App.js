import React, { useState } from "react";
import "./App.css";
import Input from "./Components/Input.jsx";
import { TestComponent } from "./Components/TestComponent";

export const Context = React.createContext();
function App() {
  const [workingDirectory, setWorkingDirectory] = useState("");
  return (
    <Context.Provider value={[workingDirectory, setWorkingDirectory]}>
      <div className="App">
        <Input workDir={""} />
        <TestComponent />
      </div>
    </Context.Provider>
  );
}

export default App;
