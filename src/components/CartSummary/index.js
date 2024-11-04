import './index.css'
import {Component} from 'react'

import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

class CartSummary extends Component {
  state = {activePaymentOption: '', confirmOrderStatus: false}

  onSelectedPaymentoption = event =>
    this.setState({activePaymentOption: event.target.id})

  onClickConfirmOrder = () => this.setState({confirmOrderStatus: true})

  render() {
    const {activePaymentOption, confirmOrderStatus} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
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
              <p className="no-of-cart-items">
                {cartList.length} Items in cart
              </p>
              <div>
                <Popup
                  modal
                  trigger={
                    <button type="button" className="checkout-btn">
                      Checkout
                    </button>
                  }
                >
                  {close => (
                    <div className="popup-bg-container">
                      {confirmOrderStatus ? (
                        <div className="confirm-order-message-card">
                          <h1 className="confirm-order-message-heading">
                            Your order has been placed successfully
                          </h1>
                          <button
                            type="button"
                            className="trigger-button"
                            onClick={(() => close(), removeAllCartItems)}
                          >
                            Close
                          </button>
                        </div>
                      ) : (
                        <div className="popup-container">
                          <h1 className="summary-heading">Summary</h1>
                          <p className="payment-method-heading">
                            Order Details
                          </p>
                          <p className="no-of-items-heading">
                            Number of items:- {cartList.length}
                          </p>
                          <p className="total-price-heading">
                            Total price:- {totalAmount}
                          </p>
                          <p className="payment-method-heading">
                            Payment Method
                          </p>

                          <ul className="payment-method-inputs">
                            {paymentOptionsList.map(eachMethod => (
                              <li
                                key={eachMethod.id}
                                className="payment-method-input-container"
                              >
                                <input
                                  className="payment-method-input"
                                  id={eachMethod.id}
                                  type="radio"
                                  name="paymentMethod"
                                  disabled={eachMethod.isDisabled}
                                  onChange={this.onSelectedPaymentoption}
                                />
                                <label
                                  className={`payment-method-label ${
                                    eachMethod.isDisabled
                                      ? 'disabled-label'
                                      : ''
                                  }`}
                                  htmlFor={eachMethod.id}
                                >
                                  {eachMethod.displayText}
                                </label>
                              </li>
                            ))}
                          </ul>

                          <button
                            disabled={activePaymentOption === ''}
                            className="confirm-order-btn"
                            type="button"
                            onClick={this.onClickConfirmOrder}
                          >
                            Confirm Order
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </Popup>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
