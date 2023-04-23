import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Login from "./features/auth/Login";
import Operator from "./features/operator";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/operator" element={<Operator />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
