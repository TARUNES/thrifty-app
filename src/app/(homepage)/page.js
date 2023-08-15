"use client";

import React, { useEffect, useState } from "react";
import { Addcard } from "@/components/ui/addcard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import Topbar from "@/components/pageComponents/Topbar/Topbar";
import Slider from "./Slider";
import "../Animation.css";
import { useSelector } from "react-redux";

const Homepage = () => {

  const item = useSelector((state) => state.cart);
  const [productList, setproductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const ProductCollection = collection(db, "products");
      const ProductSnapshot = await getDocs(ProductCollection);
      const prod = ProductSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setproductList(prod);
      setLoading(false);
      console.log(productList);
    };
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="back" >
      <Slider />
      <div className="myproducts">
        {productList.map((item) => {
          return <Addcard props={item}></Addcard>;
        })}
      </div>
    </div>
  );
};

export default Homepage;
