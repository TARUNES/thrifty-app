import React from 'react'
import "./Topbar.css"
import logo from "./images/thrifty-logo.png"

export default function Topbar() {
  return (

        <div className="top">
      <div className="topLeft">
       
        <img src={logo} alt="" className="logo"/>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem"> HOME</li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
              WRITE
          </li >
        </ul>
      </div>
      <div className="topRight">
          <ul className="topList">
            <i className="search fa-solid fa-magnifying-glass"></i>

            <li className="topListItem">
                LOGIN
            </li>
            <li className="topListItem">
                REGISTER
            </li>
          </ul>
      </div>
    </div>

  )
}



