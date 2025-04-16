import React from 'react'
import styled from 'styled-components'



const Image = styled.div`
background-size:cover;
background-image: url('https://st3.depositphotos.com/30046358/32671/v/450/depositphotos_326717364-stock-illustration-electronics-online-store-flat-vector.jpg.webp');
height: 80vh;
overflow:hidden;
width:1456px;
@media (min-width:0px) and (max-width:600px){
  width:300px;
}
`

const Design = styled.div`
text-align:center;
color:aqua;
font-size:14px;
font-weight:500;
`





const Home = () => {
  return (

    <Design>

      <h1>Welcome users!!!</h1>

      <h3 style={{WebkitTextStroke:"0.1vw red",textTransform:"lowercase"}}>All latest equipments available </h3>
      
      <Image />
    </Design>


  )
}

export default Home