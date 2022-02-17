import React, { useState } from "react";
import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
function Main() {
   return (
    <div>
    <Navbar/>
    <Outlet/>
    </div>
   ) 
}
export default Main;