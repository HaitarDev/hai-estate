import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import Navbar from "./components/Navbar.tsx";
import Profile from "./pages/Profile.tsx";
import ProtectProfile from "./components/ProtectProfile.tsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectProfile />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
