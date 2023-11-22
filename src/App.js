import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import "./styles/index.scss";
import Detail from "./components/detail";
import Sidebar from "./components/layouts/sidebar";
import Air from "./components/pages/air";
import Electric from "./components/pages/electric";
import Circle from "./components/pages/circle";
import Push from "./components/pages/push";
import Others from "./components/pages/others";
import Admin from "./components/admin";
import Login from "./components/admin/login";
import { useLocation } from "react-router-dom";
import Introduce from "./components/introduce";
import Chip from "./components/pages/chip";
import Register from "./components/admin/register";

function App() {
  const location = useLocation();
  let adminMode = false;
  if (location?.pathname === "/admin") {
    adminMode = true;
  }
  return (
    <div className="App">
      <Header adminMode={adminMode} />
      <div className={`wrapper-body ${adminMode ? "admin-body" : ""}`}>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/apple" element={<Air />} />
          <Route path="/samsung" element={<Electric />} />
          <Route path="/xiaomi" element={<Circle />} />
          <Route path="/oppo" element={<Push />} />
          <Route path="/realme" element={<Chip />} />
          <Route path="/gioi-thieu" element={<Introduce />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
      <Sidebar />
    </div>
  );
}

export default App;
