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
const Container=styled.div`
display:flex;
flexwrap:wrap;

`;
const Button1 = styled.button`
  border: 1px solid teal;
  padding: 15px;
  border-radius: 15px;
  width: 90%;
  margin-left:15px;
  color: teal;
  align-items:"center";
  transition: background-color 0.5s;
  &:hover {
    background-color: teal;
    color: white;
  }
`;


// import { Addcard } from "@/components/ui/addcard";
const Cart = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);
  //   console.log(cartitems);

  const del = (id, e) => {
    e.preventDefault();
    dispatch(remove(id));
  };
  const cartprice = cartitems.reduce(
    (total, item) => total + parseFloat(item.ProductPrice),
    0
  );

  return (
    <div>
    
    {(cartitems.length>0)?(<Container>
      <div style={{display:'flex',flexWrap:'wrap',}}>
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
                  <Button onClick={(e) => del(item.id,e)}>
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
      </div>
      <div className="summary">
      {cartitems.map((item) => (<span style={{display:"flex",justifyContent:'space-between',margin:'10px',}}>
        <div>{item.ProductName}</div><div>{item.ProductPrice}</div></span>))}
        <h2>Total Cart Price: $ {cartprice.toFixed(2)}</h2>
        <Button1>Place Order</Button1>
      </div>
        </Container>):(<div>nothing to show</div>)}
      </div>
    
  );
};

export default Cart;
