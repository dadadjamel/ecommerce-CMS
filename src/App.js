import React, { useState, useEffect } from 'react';
import Cart from './Components/Cart/Cart';
import Navbar from './Components/Navbar/Navbar';
import Products from './Components/Products/Products';
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Checkout from './Components/CheckoutForm/Checkout/Checkout';

const App = () => {
  const [products, setproducts] = useState([])
  const [cart, setcart] = useState([])
  const [order, setorder] = useState({})

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setproducts(data)
  }

  const fetchCart = async () => {
    setcart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (product, quanitity) => {
    const item = await commerce.cart.add(product, quanitity)
    setcart(item.cart)
  }

  const handleupdatecartqty = async (productid, quantity) => {
    const { cart } = await commerce.cart.update(productid, { quantity })
    setcart(cart)
  }

  const handleremovefromcart = async (productid) => {
    const { cart } = await commerce.cart.remove(productid)
    setcart(cart)
  }

  const handleEmptycart = async () => {
    const { cart } = await commerce.cart.empty()
    setcart(cart)
  }

  const refreshCart = async () =>{
    const newCart = await commerce.cart.refresh()
    setcart(newCart)
  }

  const handleCapturecheckout = async (checkoutTokenid, neworder) => {
    try {
      const incompingorder = await commerce.checkout.capture(checkoutTokenid, neworder)
      setorder(incompingorder)
      refreshCart()
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log('🥠',products)
  console.log('🛒',cart)

  return (
    <Router>
      <div>
        <Navbar total={cart.total_items} />
        <Switch>

          <Route exact path='/' >
            <Products products={products} handleAddToCart={handleAddToCart} />
          </Route>


          <Route exact path='/cart' >
            <Cart cart={cart}
              handleupdatecartqty={handleupdatecartqty}
              handleremovefromcart={handleremovefromcart}
              handleEmptycart={handleEmptycart} />
          </Route>


          <Route exact path='/checkout' >
            {/* <Products products={products} handleAddToCart={handleAddToCart} /> */}
            <Checkout order={order} handleCapturecheckout={handleCapturecheckout} cart={cart} />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;