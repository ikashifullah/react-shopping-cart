import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct';
import './styles.css';

function Home() {
  const { state: { products }, productState: {
    byStock, byFastDelivery, sort, byRatings, searchQuery
  } } = CartState();
  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      )
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
    }

    if (byRatings) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRatings)
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts;
  }
  return (
    <div>
      <div className='productContainer'>
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  )
}

export default Home