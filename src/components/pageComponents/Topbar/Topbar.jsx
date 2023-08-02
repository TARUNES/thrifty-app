import React from "react";
import "./Topbar.css";
import logo from "./images/thrifty-logo.png";
import Link from "next/link";

export default function Topbar() {
  return (
    <div className="top">
      <div className="topLeft">
        <img src={logo} alt="" className="logo" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link href="/">HOME</Link>
          </li>
          <li className="topListItem">
            <Link href="/addProducts">SELL</Link>
          </li>
          <li className="topListItem">
            <Link href="/">CONTACT</Link>
          </li>
          <li className="topListItem">WRITE</li>
        </ul>
      </div>
      <div className="topRight">
        <ul className="topList">
          <i className="search fa-solid fa-magnifying-glass"></i>

          <li className="topListItem">
            <Link href="/SignUp">LOGIN</Link>
          </li>
          <li className="topListItem">
            <Link href="/SignIn">REGISTER</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
