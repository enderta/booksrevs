import React from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Books from "./Books";
import AddBook from "./AddBook";


function Pages() {
    const isLoggedIn = localStorage.getItem("token");

    return (
        <div>
            <Routes>
                {isLoggedIn ? (
                    localStorage.getItem("role") === "admin" ? (
                        <>
                            <Route path={"/*"} element={<Home/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/books" element={<Books/>}/>
                            <Route path="/add" element={<AddBook/>}/>

                        </>
                    ) : (
                        <>
                            <Route path={"/*"} element={<Home/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/books" element={<Books/>}/>

                        </>
                    )
                ) : (
                    <>
                        <Route path={"/*"} element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/books" element={<Books/>}/>
                    </>
                )}
            </Routes>
        </div>
    );
}

export default Pages;