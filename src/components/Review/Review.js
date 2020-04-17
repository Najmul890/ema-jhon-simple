import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart]=useState([]);
    
    const auth =useAuth();
   
    

    const removeProduct =(productKey) =>{
        //console.log('remove clicked', productKey);
        const newCart =cart.filter(pd =>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        //cart
        const savedCart =getDatabaseCart();
        const productKeys =Object.keys(savedCart);
        console.log(productKeys);
        fetch('https://blooming-spire-77564.herokuapp.com/getProductsByKey',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(productKeys)
      })
        .then(res=> res.json())
        .then(data =>{
            const cartProducts =productKeys.map(key => {
            const product =data.find(pd => pd.key === key);
            product.quantity= savedCart[key];
            return product;
          }) 
        setCart(cartProducts);
        })
        
    }, []);
     
    return (
        <div className="twin-container">
          <div className="product-container">
          {
                cart.map( pd => <ReviewItem
                    key={pd.key}
                    removeProduct ={removeProduct}
                    product={pd}></ReviewItem>)
            }
            
            {
              !cart.length && <h1> Your cart is empty.  <a href="/shop">Keep Shoping</a> </h1>
            }  
          </div>
          <div className="cart-container">
            <Cart cart={cart}>
              <Link to="shipment">
              {
                auth.user ?
                <button
               className="main-btn">Proceed Checkout</button>
               :
               <button className="main-btn">Login to Proceed</button>
               }
              </Link>
            </Cart> 
          </div>
              
        </div>
    );
};

export default Review;