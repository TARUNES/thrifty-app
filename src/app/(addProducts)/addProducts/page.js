"use client";

import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage, auth, db } from "../../../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const AddProducts = () => {
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [File, setFile] = useState();

  const handleImage = (e) => {
    setFile(e.target.files[0]);
    // console.log(File);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, File.name);
    const uploadTask = uploadBytesResumable(storageRef, File);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          const ProductCollection = collection(db, "products");
          const ProductSnapShot = await getDocs(ProductCollection);
          try {
            await addDoc(ProductCollection, {
              ProductName: ProductName,
              ProductPrice: ProductPrice,
              Description: Description,
              ImageUrl: downloadURL,
              userId: auth.currentUser.uid,
            });
            setProductName("");
            setProductPrice("");
            setDescription("");
            setFile(null);
          } catch (e) {
            window.alert(
              "SomeThing Got Wrong if your not signed in athae panra mothe"
            );
          }
        });
      }
    );
  };

  return (
    <div>
      <h1>Add Products</h1>
      <form>
        <div>
          <input
            type="text"
            value={ProductName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="ProductName"
          ></input>
        </div>
        <div>
          <input
            type="number"
            value={ProductPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="ProductPrice"
          ></input>
        </div>
        <div>
          <input
            type="text"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe Your Product"
            rows={5}
          ></input>
        </div>
        <div>
          <input
            type="file"
            defaultValue={""}
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(File);
            }}
            placeholder="Upload Image"
          ></input>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default AddProducts;
