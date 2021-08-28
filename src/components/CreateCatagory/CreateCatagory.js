import React, {  useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createCatagoryAction } from '../../actions/catagories.actions'
import Layout from '../Layout/Layout'
import LoadingComponent from '../../UI/LoadingComponent/LoadingComponent'
import './style.css'
import CatagoryLists from './CatagoryLists'
const CreateCatagory = () => {
    const [focused, setFocused] = useState(false)
    const [catagoryText, setCatagoryText] = useState('')
    const dispatch = useDispatch()
    const catagory = useSelector(state => state.catagory)
    const handleCreateCatagory = (e) => {
        e.preventDefault()
        if (!catagoryText) {
            alert('Type Catagory Name...')
            return;
        }
        const payload = {
            name: catagoryText
        }
        dispatch(createCatagoryAction(payload))
            .then((val) => {
                if (val) {
                    alert('catagory created successfully...')
                    setCatagoryText('')
                }
            })
    }
    const createCatagoryForm = () => (
        <Form style={{
            marginLeft: 'auto',
            marginRight: 'auto'
        }} onSubmit={handleCreateCatagory}>
            {
                catagory.createCatagoryError ? <h6 style={{
                    color: 'red'
                }}>{catagory.createCatagoryError}</h6> : null
            }
            <Form.Group style={{
                width: '300px'
            }} className="mb-3" controlId="formBasicEmail">
                <Form.Label>Create Catagory</Form.Label>
                <Form.Control onMouseDown={(e) => setFocused(e.target.value)} value={catagoryText} onChange={e => setCatagoryText(e.target.value)} type="text" placeholder="Catagory" />
            </Form.Group>
            <Button style={{
                borderRadius: '0'
            }} variant="primary" type="submit">
                Create
            </Button>
        </Form>
    )
    return (
        <Layout>
            {
                catagory.allcatagoriesLoading ?
                    <LoadingComponent />
                    :
                    <Container>
                        <Row>
                            <Col md={6} style={{ padding: '30px' }}>
                                {createCatagoryForm()}
                            </Col>
                            <Col md={6} style={{
                                padding: '30px'
                            }}>
                                <div>
                                    <h1 style={{
                                        textAlign: 'center'
                                    }}>Catagories</h1>
                                    {
                                        catagory.allcatagories.map((val, index) => (
                                            <CatagoryLists key={index} val={val} />
                                        ))
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
            }
        </Layout>
    )
}

export default CreateCatagory
