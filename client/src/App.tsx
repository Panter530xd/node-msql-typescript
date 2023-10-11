import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RegisterUser from "./pages/Register";
import NoPage from "./pages/NoPage";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
