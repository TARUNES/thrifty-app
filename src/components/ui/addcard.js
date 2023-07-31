import Link from "next/link";
import React from "react";
import { Button } from "./button";

export const Addcard = ({ props }) => {
  return (
    <Link href={"/products/" + props.id}>
      <div
        className="bg-gray-200 p-1  border border-solid border-0.5 "
        style={{ width: "14rem" }}
      >
        <img
          className="rounded-t-lg  border border-solid border-0.5 rounded"
          style={{ width: "14rem", width: "14rem" }}
          src={props.ImageUrl}
        ></img>
        <div className="flex justify-between">
          <p className="text-base font-bold">{props.ProductName}</p>
          <p className="text-base font-bold">
            <span class="text-xs align-top mt-5">$</span>
            {props.ProductPrice}
          </p>
        </div>

        <p className="overflow-scroll text-xs line-cramp-2">
          {" "}
          {props.Description}
        </p>
        {/* <Button className="h-2">Add to cart</Button> */}
      </div>
    </Link>
  );
};
