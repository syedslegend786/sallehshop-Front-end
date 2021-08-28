import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerAction } from '../../actions/auth.actions'
import Layout from '../Layout/Layout'

const RegisterPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [focus, setFocus] = useState(false)
    const initialState = {
        email: '',
        password: '',
        name: '',
        role: 0,
    }
    const [formData, setformData] = useState(initialState)
    const handleRegister = (e) => {
        e.preventDefault()
        setFocus(false)
        dispatch(registerAction(formData))
            .then((val) => {
                if (val === true) {
                    navigate('/')
                }
            })
    }
    return (
        <Layout>
            <Row>
                <Col md={6} xs={12} style={{
                    margin: 'auto'
                }}>
                    <Form onSubmit={handleRegister}>
                        {
                            auth.authError && !focus ?
                                <div style={{
                                    color: 'crimson',
                                    textAlign: 'center',
                                    fontSize: '2rem',
                                    fontWeight: 'bold'
                                }}>
                                    {auth.authError}
                                </div>
                                :
                                null
                        }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onMouseDown={e => setFocus(e.target.value)} required value={formData.name} onChange={e => setformData({ ...formData, name: e.target.value })} type="text" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onMouseDown={e => setFocus(e.target.value)} required value={formData.email} onChange={e => setformData({ ...formData, email: e.target.value })} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onMouseDown={e => setFocus(e.target.value)} required value={formData.password} onChange={e => setformData({ ...formData, password: e.target.value })} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Layout>
    )
}

export default RegisterPage
