import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom'
const OrderDetailPage = () => {
    const navigate = useNavigate()

    const auth = useSelector(state => state.auth)
    if (!auth.authenticate) {
        navigate('/products')
    }
    const { id } = useParams()
    useEffect(() => {
    }, [])
    const myTable = () => (
        <Table responsive striped bordered size='sm'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                    <th>Country Code</th>
                </tr>
            </thead>
            <tbody>
                {
                    auth.historyPageData.map((val, index) => (
                        val._id == id ?
                            < tr key={index} >
                                <td> {val.address.recipient_name}</td>
                                <td>{val.address.line1} {val.address.city}</td>
                                <td>{val.address.postal_code}</td>
                                <td>{val.address.country_code}</td>
                            </tr>
                            :
                            null
                    ))
                }
            </tbody>
        </Table >
    )
    const dataTable = () => (
        <Table responsive striped bordered size='sm'>
            <thead>
                <tr>
                    <th></th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody style={{
                textAlign: 'center'
            }}>
                {
                    auth.historyPageData.map((val, index) => (
                        val._id == id ?
                            val.cart.map((_val, _index) => (
                                < tr key={index} style={{
                                    verticalAlign: 'middle'
                                }}>
                                    <td><img style={{
                                        height: '100px',
                                        width: '70px',
                                        objectFit: 'covers',
                                    }} src={_val.images.url} alt='' /> </td>
                                    <td><span> {_val.title}</span></td>
                                    <td><span>{_val.quantity}</span> </td>
                                    <td><span> {_val.price}</span></td>
                                </tr>
                            ))


                            :
                            null
                    ))
                }
            </tbody>
        </Table >
    )
    return (
        <Layout>
            <Container>
                <Row>
                    <Col xs={12}>
                        {myTable()}
                    </Col>
                    <Col xs={12}>
                        {dataTable()}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default OrderDetailPage
