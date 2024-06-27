import React from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Books from "./Books";
import AddBook from "./AddBook";
import Revs from "./Revs";
import AddRev from "./AddRev";

function Pages() {
    const isLoggedIn = Boolean(localStorage.getItem("token"));


    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/books" element={<Books />} />
                {isLoggedIn  && (
                    <Route path="/add" element={<AddBook />} />
                )}
                <Route path="/revs/:id" element={<Revs />} />
                <Route path="/addrev/:id" element={<AddRev />} />
            </Routes>
        </div>
    );
}

export default Pages;