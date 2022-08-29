import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./misc/Navbar";
import Home from "./home/Home";

function Router() {
    return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Home />} />
            <Route exact path="/register" element={<Home />} />
        </Routes>
    </BrowserRouter>
)}; 

export default Router;