import React from 'react'
import { CartState } from '../context/Context';
import Card from 'react-bootstrap/Card';
import Ratings from './Ratings';
import { Button } from 'react-bootstrap';

export default function SingleProduct({ prod }) {
  const { state: { cart }, dispatch } = CartState();
  return (
    <div className='products'>
      <Card>
        <Card.Img src={prod.image} variant='top' alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>PKR. {prod.price}</span>
            {prod.fastDelivery ? <div> Fast Delivery </div> : <div>4 Days Delivery</div>}
            <Ratings ratings={prod.ratings} />
          </Card.Subtitle>
          {cart.some(p => p.id === prod.id)
            ? (<Button variant="danger"  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: prod })}>Remove from Cart</Button>)
            : (<Button variant='primary' onClick={() => dispatch({ type: 'ADD_TO_CART', payload: prod })} disabled={!prod.inStock}>
              {!prod.inStock ? 'Out of Stock' : 'Add to cart'}
            </Button>)}
        </Card.Body>
      </Card>
    </div>
  )
}
