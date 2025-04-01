import { ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
// import { useCart } from 'react-use-cart'
import styled from 'styled-components'
import { itemcontext ,logincontext} from './Context'
import { ToastContainer, toast } from 'react-toastify'






const Announcement=styled.div`
height:30px;
background-color:teal;
color:white;
display:flex;
align-items:center;
justify-content:center;
font-size:14px;
font-weight:500;
`
const Container=styled.div`
display:flex;
display:flex-end;
`
const Info=styled.div`
margin-left:14px;
margin-right:14px;
`
const Navbar = () => {
    // const{totalUniqueItems}=useCart();
    const{size}=useContext(itemcontext);


    const{sign,setSign}=useContext(logincontext);
    
    const logoutHandler=()=>{
      setSign(false)
      toast.info("logged out",{
        position:"top-center"
      })
    }

    
  return (
    <div>
      <ToastContainer/>
    <Announcement>
   

     Super exciting deals going on!!!
     
    </Announcement>





      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">e-Electronics Store</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ">
      <li className="nav-item active">
        <Link className="nav-link" to="/home">Home</Link>
      </li>
      <li className="nav-item">
        
        <Link className="nav-link" to="/services">Services</Link>
      </li>   
    </ul>
  </div>
 
    <Container>
     {!sign && <p style={{paddingTop:"8px"}}>

      <Link to='/login'>
      <Info>SIGN-IN</Info>
      </Link>
      </p>}

     {sign &&<p  onClick={logoutHandler} style={{paddingTop:"8px" ,cursor:"pointer",color:"red"}}>

    <Info>LOG-OUT</Info>
     </p>}
      
    
    <p style={{paddingTop:"8px"}}>

      <Link to='/reg'>
     <Info>REGISTER</Info>
      </Link>
    </p>

      <Link to='/bill'>  
      <Info>
        <Badge badgeContent={size} color="primary" style={{paddingTop:"8px"}}> 
        <ShoppingCartOutlined></ShoppingCartOutlined>
        </Badge>
         </Info>
      </Link>

    </Container>

</nav>
    </div>
  )
}

export default Navbar
