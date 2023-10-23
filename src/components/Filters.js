import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Ratings from './Ratings';
import { CartState } from '../context/Context';

const Filters = () => {
  const { productState: {
    byStock, byFastDelivery, sort, byRatings
  }, productDispatch } = CartState();
  return (
    <div className='filters'>
      <b className='title'>Filter Products</b>
      <Form>
        {['radio'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              // inline
              label="Ascending"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
              onChange={() =>
                productDispatch({
                  type: 'SORT_BY_PRICE',
                  payload: "lowToHigh"
                })
              }
              checked={sort === 'lowToHigh' ? true : false}
            />
            <Form.Check
              // inline
              label="Descending"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
              onChange={() =>
                productDispatch({
                  type: 'SORT_BY_PRICE',
                  payload: "highToLow"
                })
              }
              checked={sort === 'highToLow' ? true : false}
            />
            <Form.Check
              label="Include Out of Stock"
              type="checkbox"
              id={`inline-${type}-3`}
              onChange={() =>
                productDispatch({
                  type: 'FILTER_BY_STOCK'
                })
              }
              checked={byStock}
            />
            <Form.Check
              label="Fast Delivery Only"
              type="checkbox"
              id={`inline-${type}-4`}
              onChange={() =>
                productDispatch({
                  type: 'FILTER_BY_DELIVERY'
                })
              }
              checked={byFastDelivery}
            />
          </div>
        ))}
      </Form>
      <Ratings ratings={byRatings} onClick={(i) => productDispatch({
        type: 'FILTER_BY_RATINGS',
        payload: i + 1
      })} style={{ cursor: 'pointer' }} />
      <Button variant="secondary" onClick={() =>
        productDispatch({
          type: 'CLEAR_FILTERS'
        })
      } size="lg" style={{ width: '100%' }}>Clear</Button>{' '}
    </div>

  )
}

export default Filters