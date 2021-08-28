import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MyNav from './MyNav'
import './style.css'

const Layout = (props) => {
    const catagory = useSelector(state => state.catagory)
    const dispatch = useDispatch()
    return (
        <Container fluid='sm' className='layout'>
            <Row>
                <MyNav />
            </Row>
            <Row >
                <Col style={{
                    padding: '0 20px'
                }}>
                    {props.children}
                </Col>
            </Row>
        </Container>
    )
}

export default Layout
