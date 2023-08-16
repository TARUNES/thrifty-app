"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"


import "./login.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast()

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // window.alert("Signed UP");
        toast({
          description: "Your message has been sent.",
        })
        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm">
          <label>Email</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className="loginButton">
            Login
          </button>
        </form>
        <button className="loginRegisterButton">Register</button>
      </div>
    </div>
  );
};

export default SignUp;
