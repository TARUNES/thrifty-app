import { async } from "@firebase/util";
import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import "./addcard.css";

export const Adddelcard = ({ props }) => {
  const del = async () => {
    await deleteDoc(doc(db, "products", props.id));
  };
  return (
    <Link href={"/products/" + props.id}>
      <div class="product-card">
        <div class="product-tumb">
          <img src={props.ImageUrl} alt="Rendering..." />
        </div>
        <div class="product-details">
          {/* <span class="product-catagory">Women,bag</span> */}
          <h4>
            <a href="">{props.ProductName}</a>
          </h4>
          <p>{props.Description}</p>
          <div class="product-bottom-details">
            <div class="product-price">$ {props.ProductPrice}</div>
          </div>
        </div>
      </div>
      <Button onClick={del}></Button>
    </Link>
  );
};
