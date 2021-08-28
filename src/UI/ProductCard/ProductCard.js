import React, { useState } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAction } from '../../actions/auth.actions'
import { deleteSingleProduct, getAllProductsAction, handleCheckedAction } from '../../actions/product.actions'
const ProductCard = ({ notify, product }) => {

    const auth = useSelector(state => state.auth)
    const [handleLoading, setHandleLoading] = useState(false)
    const productState = useSelector(state => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleView = (pid) => {
        if (pid) {
            navigate(`/product/${pid}`)
        }
    }
    const role = auth?.user.role
    const handleOnclick = () => {
        if (!auth.authenticate) {
            alert('kindly login!!!')
        }
        else if (auth.user.role == 1) {
            setHandleLoading(true)
            dispatch(deleteSingleProduct(product))
                .then((val) => {
                    if (val) {
                        setHandleLoading(false)
                        dispatch(getAllProductsAction())
                    }
                    else {
                        setHandleLoading(false)
                    }
                })
        } else {
            dispatch(addToCartAction(product))
            notify()
        }

    }
    const handleUpdate = (pid) => {
        if (pid) {
            navigate(`/createproduct/${pid}`)
        }
    }
    const handleChecked = (pid) => {
        dispatch(handleCheckedAction('singleProduct', pid))
    }
    return (
        <div class='card'>
            {
                role === 1 ?
                    <input onChange={() => handleChecked(product._id)} checked={product.checked} className='check_box' type='checkbox' />
                    :
                    null
            }
            <div class='image_cont'>
                <img src={product.images.url} alt='' />
            </div>
            <div class='card_body'>
                <div class='card_title'>
                    <span>{product.title}</span>
                </div>
                <div class='card_price'>
                    <span>$ {product.price}</span>
                </div>
                <div class='card_desc'>
                    <p>
                        {product.description}
                    </p>
                </div>
                <div class='card_button'>
                    <Button
                        onClick={() => handleOnclick()}
                        disabled={handleLoading}
                        variant={`${role == 1 ? 'danger' : "success"}`}>
                        {handleLoading ? <Spinner size='sm' animation="border" /> : `${role === 1 ? 'DELETE' : 'BUY NOW'}`}
                    </Button>
                    <Button
                        variant={`${role == 1 ? 'secondary' : "secondary"}`}
                        onClick={auth.user.role === 1 ? () => handleUpdate(product._id) : () => handleView(product._id)}>
                        {`${role === 1 ? 'EDIT' : 'VIEW'}`}
                    </Button>
                </div>
            </div>
        </div >
    )
}
export default ProductCard
