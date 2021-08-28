import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../Layout/Layout'
import { loginAction } from '../../actions/auth.actions'
import { useNavigate } from 'react-router-dom'
const SignInPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [focus, setFocus] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const handleSignIn = (e) => {
        e.preventDefault()
        setFocus(false)
        dispatch(loginAction(user))
            .then((val) => {
                if (val) {
                    navigate('/')
                }
            })
    }
    return (
        <Layout>
            <Row style={{
                height: '70vh'
            }}>
                <Col style={{
                    margin: 'auto',
                }} md={6} xs={12}>
                    <Form onSubmit={handleSignIn}>
                        {
                            auth.authError && !focus ? <h6 style={{
                                color: 'red'
                            }}>{auth.authError}</h6> : null
                        }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onMouseDown={(e) => setFocus(e.target.value)} onChange={e => setUser({
                                ...user,
                                email: e.target.value
                            })} type="email" required placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onMouseDown={(e) => setFocus(e.target.value)} onChange={e => setUser({
                                ...user,
                                password: e.target.value
                            })} type="password" required placeholder="Password" />
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

export default SignInPage
