"use client";
import React from "react";
import { remove } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import Link from "next/link";
import styled from "styled-components";

const Button = styled.div`
// border:1px solid red;
// width:30px;
// align-items:center;
// height:30px;
position:absolute;
padding-left:230px;
margin-bottom
`;

// import { Addcard } from "@/components/ui/addcard";
const Cart = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);
  //   console.log(cartitems);

  const del = (id) => {
    dispatch(remove(id));
  };
  const cartprice = cartitems.reduce(
    (total, item) => total + parseFloat(item.ProductPrice),
    0
  );

  return (
    <div>
      {cartitems.map((item) => (
        <Link href={"/products/" + item.id}>
          <div class="product-card">
            <div class="product-tumb">
              <img src={item.ImageUrl} alt="Rendering..." />
            </div>
            <div class="product-details">
              {/* <span class="product-catagory">Women,bag</span> */}
              <h4>
                <a href="">{item.ProductName}</a>
                <Button onClick={() => del(item.id)}>
                  <i
                    style={{ color: "red", fontsize: 20 }}
                    class="delete fa-solid fa-trash"
                  ></i>
                </Button>
              </h4>
              <p>{item.Description}</p>
              <div class="product-bottom-details">
                <div class="product-price">$ {item.ProductPrice}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <h2>Total Cart Price: $ {cartprice.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
