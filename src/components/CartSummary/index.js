import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalAmount = 0
      cartList.forEach(product => {
        totalAmount += product.price * product.quantity
      })

      return (
        <>
          <h1 className="total-amount">
            <span className="total-amount-label">Order Total: </span>
            Rs {totalAmount}/-
          </h1>
          <p className="no-of-cart-items">{cartList.length} Items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
