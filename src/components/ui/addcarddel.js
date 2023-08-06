import { async } from "@firebase/util";
import styled from "styled-components"
import Link from "next/link";
import React from "react";
import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import "./addcard.css";

const Button=styled.div`
// border:1px solid red;
// width:30px;
// align-items:center;
// height:30px;
position:absolute;
padding-left:230px;
margin-bottom
`


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
            <Button onClick={del}><i style={{color:"red",fontsize:20,}} class="fa-solid fa-trash"></i></Button>
          </h4>
          <p>{props.Description}</p>
          <div class="product-bottom-details">
            <div class="product-price">$ {props.ProductPrice}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
