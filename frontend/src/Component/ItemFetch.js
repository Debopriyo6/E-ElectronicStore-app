import { useContext } from "react";
import { itemcontext } from "./Context";
import ItemDisplay from "./ItemDisplay";
const ItemFetch = () => {
  const{item,handleaddtoCart}=useContext(itemcontext);
  return (
    <div className="container my-3" style={{backgroundColor:"blue"}}>
      <div className="row gy-3" >
        {item.map((t,index) => {
          return (
            <div className="col-md-3"  >
              <ItemDisplay
                 key={index}
                 handleaddtoCart={handleaddtoCart}
                 item={t}
                itemname={t.itemname}
                description={t.description}
                price={t.price}
                image={t.image}
              />
            </div>
          );
        })}
         </div>

    </div>
  );
};

export default ItemFetch;
