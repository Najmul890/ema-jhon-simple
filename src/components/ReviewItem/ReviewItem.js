import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    console.log(props);
    const{name, quantity,key, price } =props.product;
    return (
        <div className="review-item">
            <h4 className="product-name"> {name} </h4>
            <p>quantity: {quantity} </p>
            <p><small>$ {price} </small></p>
            <br/>
            <button 
              onClick={() => props.removeProduct(key)}
              className="btn">Remove
            </button>
        </div>
    );
};

export default ReviewItem;