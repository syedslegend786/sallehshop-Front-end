import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComponent from '../../UI/LoadingComponent/LoadingComponent'
import ProductCard from '../../UI/ProductCard/ProductCard'
import Layout from '../Layout/Layout'
import { deleteAllCheckedProductsAction, getAllProductsAction, handleCheckedAction } from '../../actions/product.actions'
import Filter from './Filter'
import './style.css'
import LoadMore from './LoadMore'
const ProductPage = ({ notify }) => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const auth = useSelector(state => state.auth)
    const filtering = useSelector(state => state.filtering)
    const [selectAllCheck, setSelectAllCheck] = useState(false)
    const handleSelectAll = () => {
        setSelectAllCheck(!selectAllCheck)
        dispatch(handleCheckedAction('allProducts', null, selectAllCheck))
    }
    const handleDeleteAllChecked = () => {
        dispatch(deleteAllCheckedProductsAction())
    }
    return (
        <Layout>
            <Filter />
            {
                product.loading ? <LoadingComponent />
                    :
                    <Container>
                        {
                            auth.user.role === 1 ?
                                <Row style={{
                                    marginBottom: '10px'
                                }}>
                                    <Col style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <div className='checkbox__div'>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check onChange={handleSelectAll} checked={selectAllCheck} type="checkbox" label="Select All" />
                                            </Form.Group>
                                            <Button onClick={handleDeleteAllChecked} size='sm' variant='outline-danger'>Delete All</Button>
                                        </div>
                                    </Col>
                                </Row>
                                :
                                null
                        }
                        <Row>
                            {
                                product.products.map((val, index) => (
                                    <Col style={{
                                        marginBottom: '20px'
                                    }} lg={4} md={6} sm={6} xs={12}>
                                        <ProductCard notify={notify} key={index} product={val} />
                                    </Col>
                                ))
                            }
                        </Row>

                        {
                            filtering.result < filtering.page * 6
                                ?
                                null
                                :
                                <Row>
                                    <LoadMore />
                                </Row>
                        }
                    </Container>
            }

        </Layout>
    )
}

export default ProductPage
