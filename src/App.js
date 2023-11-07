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
          <Route path="/" element={<Homepage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/may-nen-khi" element={<Air />} />
          <Route path="/may-phat-dien" element={<Electric />} />
          <Route path="/may-phat-han" element={<Circle />} />
          <Route path="/xe-nang" element={<Push />} />
          <Route path="/dong-co-no-khac" element={<Others />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
      <Sidebar />
    </div>
  );
}

export default App;
