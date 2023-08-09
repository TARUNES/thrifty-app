"use client";
import "./addProduct.css";

import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage, auth, db } from "../../../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";

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
            // setFile(null);
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
    // <div>
    //   <h1>Add Products</h1>
    //   <form>
    //     <div>
    //       <input
    //         type="text"
    // value={ProductName}
    // onChange={(e) => setProductName(e.target.value)}
    //         placeholder="ProductName"
    //       ></input>
    //     </div>
    //     <div>
    //       <input
    //         type="number"
    // value={ProductPrice}
    // onChange={(e) => setProductPrice(e.target.value)}
    //         placeholder="ProductPrice"
    //       ></input>
    //     </div>
    //     <div>
    //       <input
    //         type="text"
    // value={Description}
    // onChange={(e) => setDescription(e.target.value)}
    //         placeholder="Describe Your Product"
    //         rows={5}
    //       ></input>
    //     </div>
    //     <div>
    //       <input
    // type="file"
    // defaultValue={""}
    // onChange={(e) => {
    //   setFile(e.target.files[0]);
    //   console.log(File);
    // }}
    //         placeholder="Upload Image"
    //       ></input>
    //     </div>
    //     <button   <Button>Add</Button>onClick={handleSubmit}>Submit</button>
    //   </form>
    // </div>
    <div className="body1">
      <div className="container">
        <div className="text">Add Your Product</div>

        <form action="#">
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                value={ProductName}
                onChange={(e) => setProductName(e.target.value)}
                required
              ></input>
              <div className="underline"></div>
              <label for="">Product Name</label>
            </div>
            <div className="input-data">
              <input
                type="number"
                value={ProductPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              ></input>
              <div className="underline"></div>
              <label for="">Product Price</label>
            </div>
          </div>
          {/* <div className="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    z
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                defaultValue={""}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  console.log(File);
                }}
              />
            </label>
          </div>{" "} */}
          <label for="images" className="drop-container" id="dropcontainer">
            <span className="drop-title">Drop Product image here</span>
            or
            <input
              type="file"
              id="images"
              accept="image/*"
              defaultValue={""}
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log(File);
              }}
              required
            />
          </label>

          {/* <div className="form-row">
            <div className="input-data">
              <input type="text" required></input>
              <div className="underline"></div>
              <label for="">Email Address</label>
            </div>
            <div className="input-data">
              <input type="text" required></input>
              <div className="underline"></div>
              <label for="">Website Name</label>
            </div>
          </div> */}
          <div className="form-row">
            <div className="input-data textarea">
              <textarea
                rows="8"
                cols="80"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <br />
              <div className="underline"></div>
              <label for="">Description</label>
              <br />
              {/* <div className="form-row submit-btn">
                <div className="input-data">
                  <div className="inner"></div>
                  <input type="submit" value="submit"></input>
                </div>
              </div> */}
            </div>
          </div>
          <div className="addbtn">
            {/* <button onClick={handleSubmit}> */}
            <Button onClick={handleSubmit}>Add</Button>
            {/* </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
