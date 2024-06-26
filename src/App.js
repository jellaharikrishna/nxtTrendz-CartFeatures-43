import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct =>
        eachProduct.id === productId
          ? {...eachProduct, quantity: eachProduct.quantity + 1}
          : eachProduct,
      ),
    }))
  }

  decrementCartItemQuantity = productId => {
    const {cartList} = this.state
    const getDecrementCartItem = cartList.find(
      eachItem => eachItem.id === productId,
    )
    if (getDecrementCartItem.quantity > 1) {
      return this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct =>
          eachProduct.id === productId
            ? {...eachProduct, quantity: eachProduct.quantity - 1}
            : eachProduct,
        ),
      }))
    }
    return this.removeCartItem(productId)
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filterCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const getAddCartItem = cartList.find(eachItem => eachItem.id === product.id)

    if (getAddCartItem) {
      return this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct =>
          eachProduct.id === getAddCartItem.id
            ? {
                ...eachProduct,
                quantity: eachProduct.quantity + product.quantity,
              }
            : eachProduct,
        ),
      }))
    }
    return this.setState(prevState => ({
      cartList: [...prevState.cartList, product],
    }))

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
