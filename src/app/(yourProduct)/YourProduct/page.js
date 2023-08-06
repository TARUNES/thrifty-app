"use client";

import React, { useEffect, useState } from "react";
import { Addcard } from "@/components/ui/addcard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import Topbar from "@/components/pageComponents/Topbar/Topbar";
import { Adddelcard } from "@/components/ui/addcarddel";

const YourProduct = () => {
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
    <div>
      <h1>cards</h1>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',}}>
        {productList.map((item) => {
          return <Adddelcard props={item}></Adddelcard>;
        })}
      </div>
    </div>
  );
};

export default YourProduct;
