"use client";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import styled from "styled-components";
// import image2 from '../components/images/airpods-max.png'
import StarRating from "./StarRating";
import { useDispatch } from "react-redux";
import { add } from "@/redux/cartSlice";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
  border: 2px solid #f5f6f6;
  background-color: #f5f6f6;
  border-radius: 5%;
  height: 100%;
  width: 40%;
  margin-left: 25px;
  align-items: "center";
`;
const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: contain;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 600;
  font-size: 40px;
`;
const Desc = styled.p`
  font-family: "Nunito Sans", sans-serif;
`;
const Price = styled.h2`
  border-top: 3px solid #f5f7f7;
  padding-top: 30px;
  font-family: "Roboto", sans-serif;
  fontweight: 20px;
  margin-bottom: 10px;
`;
const Payment = styled.p`
  padding-bottom: 30px;
  justify-content: space-between;
  margin-top: -20px;
  border-bottom: 3px solid #f5f7f7;
  font-family: "Nunito Sans", sans-serif;
  font-weight: semi-bold;
`;
const FilterContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin: 30px 0px;
`;
const Filter = styled.div`
  display: flex;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  font-family: "Nunito Sans", sans-serif;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid black;
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  aign-items: center;

  justify-content: space-between;
`;
const AmountContainer = styled.div`
  display: felx;
  align-items: center;
  font-weight: 700;
  border-radius: 20px;
  border: 1px solid teal;
  justify-content: space-between;
  background-color: #f5f6f6;
`;
const Amount = styled.span`
  width: 30;
  height: 30;
  padding: 15px;
`;
const Button = styled.button`
  border: 1px solid teal;
  padding: 15px;
  border-radius: 15px;
  width: 30%;
  margin-left: ${(props) => props.direction === "left" && "10px"};
  color: teal;
  transition: background-color 0.5s;
  &:hover {
    background-color: teal;
    color: white;
  }
`;
const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  margin-top: 20px;
`;
const Use = styled.div`
  font-family: "Nunito Sans", sans-serif;
  color: coral;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-top: 10px;
`;

const ProductPage = ({ params }) => {
  const dispatch = useDispatch();
  const handleadd = (productData) => {
    // console.log(productData);
    dispatch(add(productData));
  };
  const [count, setCount] = useState(1);
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [ImageUrl, setImageUrl] = useState("");

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    const getProduct = async () => {
      const product = await getDoc(doc(db, "products", params.productpage));
      const data = product.data();
      window.globalVariable = data;
      setProductName(data.ProductName);
      setProductPrice(data.ProductPrice);
      setDescription(data.Description);
      setImageUrl(data.ImageUrl);
    };
    getProduct();
  }, []);

  return (
    <Container>
      {/* <Topbar/> */}
      <Wrapper>
        <ImgContainer>
          <Image src={ImageUrl} />
        </ImgContainer>
        <InfoContainer>
          <Title>{ProductName}</Title>
          <Desc>{Description}</Desc>
          <StarRating></StarRating>
          <Price>{ProductPrice}</Price>
          <Payment>suggested payments with 6 months special financing</Payment>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="#E3544C" />
              <FilterColor color="#C5C5C4" />
              <FilterColor color="white" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <button onClick={decrementCount}>
                <i style={{ padding: 15 }} class="fa-solid fa-minus"></i>
              </button>
              <Amount>{count}</Amount>
              <button onClick={incrementCount}>
                <i style={{ padding: 15 }} class="fa-solid fa-plus"></i>
              </button>
            </AmountContainer>
            <Use>used for 9 months</Use>
          </AddContainer>
          <ButtonContainer>
            <Button direction="right">Buy Now</Button>
            <Button direction="left" onClick={() => handleadd(globalVariable)}>
              Add To Cart
            </Button>
          </ButtonContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ProductPage;
