import styled from "styled-components"
import { sliderItrms } from "./data"
import { useState } from "react"
import Image from "next/image"


const Container=styled.div`
  height: 100vh;
  width: 100%;
  display:flex;
  postition:relative;
  overflow:hidden;
`

const Arrow=styled.div`
width :50px;
height:50px;
backgroung0color:#fff7f7;
border-radius:50%;
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
top:0;
bottom:0;
margin:auto;
left: ${props=>props.direction==="left"&& "10px"};
right: ${props=>props.direction==="right"&& "10px"};
opacity:0.3;
z-index:2;
`
const Wrapper=styled.div`
display:flex;
height:100%;
transition: all 1.5s ease;
transform: translateX(${props=>props.slideIndex*-100}vw);
`
const Slide=styled.div`
width: 100vw;
height: 100vh;
display:flex;
align-items:center;
background-color:${props=>props.bg};

`
const ImgContainer=styled.div`
height:100%;
flex:1;
`
const InfoContainer=styled.div`
flex:1;

`
// const Image=styled.img`
// height:80%;
// `
const Title=styled.h1`
font-size:50px;
`
const Description=styled.p`
margin:50px 0px;
font-size:20px;
font-wiegt:500;
letter-spacing:3px;
`
const Button=styled.button`
padding:10px;
font-size:20px;
background-color:transparent;
cursor:pointer;
`

export default function Slider() {
  const [slideIndex,setSlideIndex]=useState(0);
    const handleclick=(direction)=>{
      if(direction==="left"){
        setSlideIndex(slideIndex>0?slideIndex-1:3)
      }else{
        setSlideIndex(slideIndex<3?slideIndex+1:0)
      }
    };

  return (
    <Container>
      <Arrow direction="left" onClick={()=>handleclick("left")}>
      <i style={{fontSize:35}} class="fa-solid fa-angle-left"></i>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItrms.map((item)=>(

          <Slide bg={item.bg}>
      <ImgContainer>
      <Image src={item.img} width={500}
      height={500}/>
      </ImgContainer>
      <InfoContainer>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
        <Button>Shop Now</Button>
      </InfoContainer>
      </Slide>
     
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={()=>handleclick("right")}>
      <i style={{fontSize:35}} class="fa-solid fa-chevron-right"></i>
      </Arrow>
    </Container>
  )
}