import React, { useState, useEffect } from 'react'
import { CartState } from '../context/Context'
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { AiFillDelete } from 'react-icons/ai'
import Ratings from './Ratings';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

const Cart = () => {
  const { state: { cart }, dispatch } = CartState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    )
  }, [cart])
  

  return (
    <div className='cart'>
      <div className='left'>
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} fluid />
                </Col>
                <Col md={2}>
                  <div>{prod.name}</div>
                </Col>
                <Col md={2}>
                  <div>{prod.price}</div>
                </Col>
                <Col md={2}>
                  <div><Ratings ratings={prod.ratings} /></div>
                </Col>
                <Col md={2}>
                  <Form.Control as="select" className='qty-dropdown'
                  onChange={(e) => dispatch({
                    type: 'CHANGE_CART_QTY',
                    payload: {
                      id: prod.id,
                      qty: e.target.value
                    }
                  })} value={prod.qty}>
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x+1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light' onClick={() => {
                    dispatch({ type: 'REMOVE_FROM_CART', payload: prod })
                  }}>
                    <AiFillDelete />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className='right'>
        <div className='cart-summary'>
          <div>Subtotal ({cart.length}) items</div>
          <span>Total: PKR {total}</span>
          <Button type='button' variant='primary' disabled={cart.length === 0} size='large' style={{ width: '90%' }}>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  )
}

export default Cart