import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { cartItemDecrement, cartItemIncrement, removeCartItem } from '../../actions/auth.actions'
import './style.css'

const CardForCart = ({ product }) => {
    const dispatch = useDispatch()
    const handleCartDec = () => {
        if (product.quantity > 1)
            dispatch(cartItemDecrement(product._id))
    }
    const handleCartIncre = () => {
        dispatch(cartItemIncrement(product._id))
    }
    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(product._id))
    }
    return (
        <div className='cardforcart'>
            <button onClick={handleRemoveCartItem} className='remove_cart_button' style={{
                border: 'none',
                outline: 'none',
                color: 'red',
                position: 'absolute',
                top: '0',
                right: '0',
                width: '30px',
                height: '30px',
                fontWeight: 'bold'
            }}>X</button>
            <img src={product.images.url} alt='' />
            <div className='card__description'>
                <h4>{product.title}</h4>
                <h5>$ {product.price * product.quantity}</h5>
                <p>{product.description}</p>
            </div>
            <div className='card__buttons'>
                <Button onClick={handleCartDec} variant="danger">-</Button>
                <strong>{product.quantity}</strong>
                <Button onClick={handleCartIncre} variant="success">+</Button>
            </div>
        </div>
    )
}

export default CardForCart
