import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddForm from "./components/Form";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddForm />} />
            <Route path="/edit/:id" element={<AddForm />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
