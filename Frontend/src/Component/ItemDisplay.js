import styled from "styled-components";
const Container=styled.div`
width:900px;
@media (min-width:0px) and (max-width:600px){
  width:300px; 
}
`



const ItemDisplay = ({ id, image, description, price, itemname, item,handleaddtoCart }) => {
  
  return (
    
    <Container className="card" style={{width: "18rem" ,color:"blueviolet"}}>
      <img className="card-img-top" src={image} alt="....." />
      <div className="card-body">
        <h5 className="card-title">{itemname}</h5>
        <p className="card-text">{description}</p>
        <h5 className="card-title">{price}</h5>
          
         <button className="btn btn-primary" onClick={()=>handleaddtoCart(item)}>
          Add to Cart
         </button>
       
      </div>
    </Container>
    
  );
};

export default ItemDisplay;
