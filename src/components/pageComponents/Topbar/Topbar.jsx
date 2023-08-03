import React from "react";
import "./Topbar.css";
import Link from "next/link";
import Image from "next/image";
import logo from "./thrifty-logo.png";

export default function Topbar() {
  return (
    <div className="top">
      <div className="topLeft">
        <Image
          src={logo}
          alt="Thrifty"
          className="logo"
          width={120}
          height={120}
        />
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
