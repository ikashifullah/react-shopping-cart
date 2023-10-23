import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import { BsFillCartFill } from "react-icons/bs";
import { TbFilterCog } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Filters from './Filters';
import { CartState } from '../context/Context';
import Image from 'react-bootstrap/Image';
import { AiFillDelete } from 'react-icons/ai'

const Header = () => {

  const { state: { cart }, dispatch, productDispatch } = CartState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showFilter, setShowFilter] = useState(false);
  const handleFilterClose = () => setShowFilter(false);
  const handleFilterShow = () => setShowFilter(true);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Button variant="primary" onClick={handleFilterShow} className="me-2">
          <TbFilterCog />
        </Button>
        <Offcanvas show={showFilter} onHide={handleFilterClose} placement="start" >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Advance Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Filters />
          </Offcanvas.Body>
        </Offcanvas>
        <Navbar.Brand>
          <Link to='/'>Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className='search'>
          <Form.Control type="text" onChange={(e) =>
                productDispatch({
                  type: 'FILTER_BY_SEARCH',
                  payload: e.target.value
                })
              } style={{ width: 500 }} placeholder="Search"
            className='m-auto' />
        </Navbar.Text>
        <Button variant="primary" onClick={handleShow} className="me-2">
          <BsFillCartFill /> {cart.length}
        </Button>
        <Offcanvas show={show} onHide={handleClose} placement="end" >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart Details</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cart.length > 0
              ? (
                <>
                <Link to="/cart"><Button variant='primary' size="lg" style={{ width: '100%', marginBottom: 30 }}>Go to Cart</Button></Link>
                {cart.map(prod => <div className='prod-details' key={prod.id}>
                  <div>
                    <Image src={prod.image} roundedCircle thumbnail={true} style={{ width: 80, height: 80 }} />
                  </div>
                  <div>
                    <div>{prod.name}</div>
                    <div>{prod.price}</div>
                  </div>
                  <div>
                    <AiFillDelete onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: prod })} fontSize={20} style={{ cursor: 'pointer' }} />
                  </div>
                </div>)}
              </>
              ): (<span>The cart is empty!</span>)}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Header