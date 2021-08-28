import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Figure, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getProductById } from '../../actions/product.actions'
import ProductCard from '../../UI/ProductCard/ProductCard'
import Layout from '../Layout/Layout'
import LoadingComponent from '../../UI/LoadingComponent/LoadingComponent'
import { addToCartAction } from '../../actions/auth.actions'
import './style.css'
const ProductDetailPage = ({ notify }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const product = useSelector(state => state.product)
    useEffect(() => {
        dispatch(getProductById(id))
    }, [id])
    const handleBuyNow = (product) => {
        if (!auth.authenticate) {
            alert('kindly login!!!')
        }
        else if (auth.user.role == 1) {
            alert('admin')
        } else {
            dispatch(addToCartAction(product))
            notify()
        }

    }
    return (
        < Layout >
            {
                product.productDetailPageLoading ?
                    <LoadingComponent />
                    :

                    <Container >
                        <Row style={{
                            padding: '20px'
                        }}>
                            <Col md={6} sm={12}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        objectFit: 'contain'
                                    }}
                                    src={product.productDetailPageData?.images?.url}
                                    alt=''
                                />
                            </Col>
                            <Col md={6} sm={12} className='card__section'>
                                <Card style={{ width: '100%', height: '300px' }}>
                                    <Card.Body style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-evenly'
                                    }}>
                                        <Card.Title>{product.productDetailPageData.title}</Card.Title>
                                        <Card.Subtitle style={{
                                            color: 'red',
                                        }}>$ {product.productDetailPageData.price}</Card.Subtitle>
                                        <Card.Text>
                                            {product.productDetailPageData.description}
                                        </Card.Text>
                                        <Card.Text>
                                            sold: {product.productDetailPageData.sold}
                                        </Card.Text>
                                        <Button onClick={() => handleBuyNow(product.productDetailPageData)} variant='success'>BUY NOW</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                textAlign: "center"
                            }}>
                                <h5>RELATED PRODUCTS</h5>
                            </div>
                            {
                                product?.products.map((val, index) => (
                                    product.productDetailPageData?.catagory === val.catagory ?
                                        <Col md={4} sm={8} xs={12}>
                                            <ProductCard notify={notify} key={index} product={val} />
                                        </Col>
                                        :
                                        null
                                ))
                            }
                        </Row>
                    </Container>

            }
        </Layout >
    )
}

export default ProductDetailPage
