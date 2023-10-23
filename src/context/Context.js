import React, { createContext, useContext, useReducer } from 'react'
import { faker } from '@faker-js/faker'
import { cartReducer, productReducer } from './Reducers';

const CartContext = createContext([]);
faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products,
    cart: []
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRatings: 0,
    searchQuery: '',
  })

  // console.log(products);
  return (
    <CartContext.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export default Context

export const CartState = () => {
  return useContext(CartContext)
}