"use client";

import React, { useEffect, useState } from "react";
import { Addcard } from "@/components/ui/addcard";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import Topbar from "@/components/pageComponents/Topbar/Topbar";
import { Adddelcard } from "@/components/ui/addcarddel";
import { auth } from "../../../../firebase";
import { Button } from "@/components/ui/button";

const YourProduct = () => {
  const [productList, setproductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const ProductCollection = collection(db, "products");
      // const userProductsQuery = query(
      //   ProductCollection,
      //   where("userID", "==", auth.currentUser?.uid)
      // );
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
  console.log(auth.currentUser?.email);
  return (
    <div>
      <h1>{auth.currentUser?.uid}</h1>
      <div>
        {productList.map((item) => {
          if (item.userId == auth.currentUser?.uid) {
            return <Adddelcard props={item}></Adddelcard>;
          }
        })}
      </div>
      <button onClick={() => auth.signOut()}>Log out</button>
    </div>
  );
};

export default YourProduct;
