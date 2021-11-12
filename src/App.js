import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//로그인, 회원가입 컴포넌트
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";

//메인페이지
import Home from "./pages/private/Home";

//개인페이지
import BannerBetting from "./pages/private/BannerBetting";
import PrototypeTest from "./pages/private/PrototypeTest";
import Survey from "./pages/private/Survey";
import Mypage from "./pages/private/Mypage";

//기업페이지
import C_Main from "./pages/corporation/Dashboard/Dashboard";
import CB_Main from "./pages/corporation/Banner/Main";
import CB_Detail from "./pages/corporation/Banner/Detail";
import CB_Upload from "./pages/corporation/Banner/Upload";
import CB_Result from "./pages/corporation/Banner/Result";
import CP_Main from "./pages/corporation/Prototype/Main";
import CP_Detail from "./pages/corporation/Prototype/Detail";
import CP_Upload from "./pages/corporation/Prototype/Upload";

export default function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/reset" element={<Reset/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/bb" element={<BannerBetting/>} />
                    <Route path="/pt" element={<PrototypeTest/>} />
                    <Route path="/survey" element={<Survey/>} />
                    <Route path="/mypage" element={<Mypage/>} />

    
                    <Route exact path="/corporation/main" element={<C_Main/>} />
                    <Route exact path="/corporation/banner/main" element={<CB_Main/>} />
                    <Route exact path="/corporation/banner/detail" element={<CB_Detail/>} />
                    <Route exact path="/corporation/banner/upload" element={<CB_Upload/>} />
                    <Route exact path="/corporation/banner/result" element={<CB_Result/>} />
                    <Route exact path="/corporation/prototype/main" element={<CP_Main/>} />
                    <Route exact path="/corporation/prototype/detail" element={<CP_Detail/>} />
                    <Route exact path="/corporation/prototype/upload" element={<CP_Upload/>} />
                </Routes>
            </Router>
        </div>
    )
}