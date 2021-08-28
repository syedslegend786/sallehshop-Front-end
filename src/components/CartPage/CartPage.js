import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../Layout/Layout'
import CardForCart from './CardForCart'
import LoadingPage from '../../UI/LoadingComponent/LoadingComponent'
import { Button } from 'react-bootstrap'
import PaypalButton from './PaypalButton'
import { createPaymentAction } from '../../actions/auth.actions'
const CartPage = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleToalPrice = () => {
        const prices = auth.user.cart.map((val) => (val.price * val.quantity))
        const toReturn = prices.reduce((v, i) => (v = +i), 0)
        console.log(toReturn)
        return toReturn
    }
    const successTrans = (payment) => {
        const { paymentID, address } = payment
        const payload = {
            paymentId: paymentID,
            address,
            cart: auth.user.cart,
        }
        dispatch(createPaymentAction(payload))
    }
    return (
        <Layout>
            {
                !auth.authenticate || !auth.user.cart.length > 0 ?
                    <div>NO ITEM ADDEDD!!!</div>
                    :
                    <Container>
                        <h1>Cart Items</h1>
                        <Row>
                            <Col>
                                <Row>
                                    {
                                        auth.user.cart.map((val, index) => (
                                            <Col xs={12} style={{
                                                marginBottom: '30px'
                                            }}>
                                                <CardForCart product={val} />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Col>
                            <Col>
                                <Row style={{
                                    position: 'relative'
                                }}>
                                    <Col style={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                        position: 'relative',
                                        border: '1px solid crimson',
                                        padding: '20px'
                                    }}>
                                        <div>
                                            <h5 style={{
                                                fontWeight: 'bold',
                                                color: 'crimson',
                                            }}> {`total: ${handleToalPrice()}`}</h5>
                                        </div>
                                        <div>
                                            <PaypalButton total={handleToalPrice()} successTrans={successTrans} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
            }
        </Layout>
    )
}
export default CartPage
