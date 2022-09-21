import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
export default App;
