import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../Layout/Layout'
import LoadingComponent from '../../UI/LoadingComponent/LoadingComponent'
import { getAllPaymentsAdmin, getPayments } from '../../actions/auth.actions'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const HistoryPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    if (!auth.authenticate) {
        navigate('/products')
    }
    useEffect(() => {
        if (auth.user.role === 1) {
            dispatch(getAllPaymentsAdmin())
        } else {
            dispatch(getPayments())
        }
    }, [auth.user.role])
    const myTable = () => (
        <Table responsive striped bordered size='sm'>
            <thead>
                <tr>
                    <th>Payment ID</th>
                    <th>Data of Purchased</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    auth.historyPageData.map((val, index) => (
                        <tr key={index}>
                            <td>{val.paymentId}</td>
                            <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                            <td><Link to={`/orderdetialpage/${val._id}`}>View</Link></td>
                        </tr>
                    ))
                }
            </tbody>
        </Table >
    )
    return (
        <Layout>
            {
                auth.historyPageDataLoading ?
                    <LoadingComponent />
                    :
                    <Container>
                        <Row style={{
                            textAlign: 'center'
                        }}>
                            <Col xs={12}>
                                <h5>History</h5>
                            </Col>
                            <Col xs={12}>
                                <h6>You have purchased {auth.historyPageData.length} items</h6>
                            </Col>
                            <Col xs={12}>
                                {myTable()}
                            </Col>
                        </Row>
                    </Container>
            }
        </Layout>
    )
}

export default HistoryPage
