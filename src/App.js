import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import "./styles/index.scss";
import Detail from "./components/detail";
import Sidebar from "./components/layouts/sidebar";
import Admin from "./components/admin";
import Login from "./components/admin/login";
import { useLocation } from "react-router-dom";
import Introduce from "./components/introduce";
import Register from "./components/admin/register";
import Apple from "./components/pages/apple";
import Samsung from "./components/pages/samsung";
import Xiaomi from "./components/pages/xiaomi";
import Oppo from "./components/pages/oppo";
import Realme from "./components/pages/realme";

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
          <Route path="/apple" element={<Apple  />} />
          <Route path="/samsung" element={<Samsung />} />
          <Route path="/xiaomi" element={<Xiaomi />} />
          <Route path="/oppo" element={<Oppo />} />
          <Route path="/realme" element={<Realme />} />
          <Route path="/gioi-thieu" element={<Introduce />} />
          <Route path="/admin/product" element={<Admin />} />
          <Route path="/admin/user" element={<Admin />} />
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
