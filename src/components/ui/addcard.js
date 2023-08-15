import Link from "next/link";
import styled from "styled-components";
import React from "react";
import { Button } from "./button";
import "./addcard.css";
import { useDispatch } from "react-redux";
import { add } from "@/redux/cartSlice";

const Info = styled.div`
  opacity: 0;
  width: 280px;
  height: 112%;
  position: absolute;
  display: flex;
  top: 1;
  left: 1;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.5s ease;
  animation: slidein 1s ease 0.2s;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  backgroung-color: #f5fbfd;
  margin-top: 70px;
  position: relative;
  

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  // width:200px;
  // height:200px;
  // border-radius:50%;
  // position:absolute;
  // background-color:white;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  margin: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  &:hover {
    background-color: #ef86c1;
    transform: scale(1.1);
  }
`;

export const Addcard = ({ props }) => {
  const dispatch = useDispatch();
  const handleadd = (product, e) => {
    dispatch(add(product));
    e.preventDefault();
  };

  return (
    <Link href={"/products/" + props.id}>
      <Container>
        <Circle />
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
        <Info>
          <button onClick={(e) => handleadd(props, e)}>
            <Icon>
              <i class="fa-solid fa-cart-shopping"></i>
            </Icon>
          </button>
          <Icon>
            <i class="fa-regular fa-heart"></i>
          </Icon>
          <Icon>
            <i class="fa-regular fa-bell"></i>
          </Icon>
        </Info>
      </Container>
    </Link>
  );
};
