// import React from "react";
"use client"
import "./Topbar.css";
import Link from "next/link";
import Image from "next/image";
import logo from "./thrifty-logo.png";
import { auth } from "../../../../firebase"
import React, { useEffect, useState } from "react";

export default function Topbar() {
  // const user= auth.onAuthStateChanged(()=>{
  //   if(user){
  //     console.log("user logged in",auth.currentUser)
  //   }
  //   else{
  //     console.log("none")
  //   }
  // })
  // console.log(user)
  // const userrr=auth.currentUser
  // console.log(userrr);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  
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
            <Link href="/Cart">CART</Link>
          </li>
          <li className="topListItem">
            <Link href="/YourProduct">MY PRODUCTS</Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
          <i className="search fa-solid fa-magnifying-glass"></i>
        {user ?(
           <ul className="topList">
           <li className="topListItem">
             <Link href="/"><button onClick={async()=>{
              await auth.signOut()
              setUser(null)
              console.log("Logged Out");}}>LOGOUT</button></Link>
           </li>
           <li className="topListItem">
             <Link href="/"><i class="fa-regular fa-user"></i></Link>
           </li>
         </ul>
        
            ):(
              <ul className="topList">
          <li className="topListItem">
            <Link href="/SignUp">LOGIN</Link>
          </li>
          <li className="topListItem">
            <Link href="/SignIn">REGISTER</Link>
          </li>
        </ul>
            )}
      </div>
    </div>
  );
}
