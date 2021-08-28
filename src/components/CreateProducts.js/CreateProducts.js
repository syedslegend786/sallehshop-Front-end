import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../Layout/Layout'
import './style.css'
import LoadingComponent from '../../UI/LoadingComponent/LoadingComponent'
import { createProduct, destroyPicture, updatedProduct, uploadPictureAction } from '../../actions/product.actions'
import { useParams } from 'react-router-dom'
const CreateProducts = () => {
    const params = useParams()
    const catagory = useSelector(state => state.catagory)
    const product = useSelector(state => state.product)
    const dispatch = useDispatch()
    const [imageSelect, setImageSelect] = useState(false)
    useEffect(() => {
        if (params.id) {
            product.products.forEach((val) => {
                if (val._id === params.id) {
                    setFormData(val)
                    setImageSelect(true)
                }
            })
        }
    }, [params.id])
    const initialstate = {
        product_id: "",
        title: "",
        price: 0,
        description: "",
        content: "",
        catagory: "",
        images: {}
    }
    const [formData, setFormData] = useState(initialstate)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            images: params.id && !product.uploadPicture.url ? formData.images : product.uploadPicture,
        }
        if (Object.keys(payload.images).length === 0) {
            return alert('No Image Uploaded!')
        }
        if (params.id) {
            dispatch(updatedProduct(params.id, payload))
                .then((val) => {
                    if (val) {
                        setFormData(initialstate)
                        setImageSelect(false)
                    }
                })
        } else {
            dispatch(createProduct(payload))
                .then((val) => {
                    if (val) {
                        setFormData(initialstate)
                        setImageSelect(false)
                    }
                })
        }
    }
    const formToRender = () => (
        <Form onSubmit={handleFormSubmit}>
            {
                product.createProductError ? <span style={{
                    color: 'crimson',
                    marginBottom: '10px',
                }}>{product.createProductError}</span> : null
            }
            {
                product.updateProducError ? <span>{product.updateProducError}</span> : null
            }
            <Row>
                <Col xs={6}>
                    <Form.Group size='sm' className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product ID</Form.Label>
                        <Form.Control disabled={params.id ? true : false} required value={formData.product_id} onChange={e => setFormData({ ...formData, product_id: e.target.value })} type="text" placeholder="product id" />
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} type="text" placeholder="title" />
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} type="number" />
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Catagory</Form.Label>
                        <Form.Select required value={formData.catagory} onChange={e => setFormData({ ...formData, catagory: e.target.value })}>
                            <option value=''>Choose...</option>
                            {
                                catagory.allcatagories.map((val, index) => (
                                    <option value={val.name}>{val.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} as="textarea" rows={3} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control required value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} as="textarea" rows={3} />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="secondary" type="submit">
                {
                    product.createProductLoading || product.updateProductLoading ? <Spinner animation="border" /> : params.id ? 'Update' : 'Upload'
                }
            </Button>
        </Form>
    )
    const diplayNoneStyle = {
        display: 'none',
    }
    const handleImage = (e) => {
        let file = e.target.files[0]
        if (!file) return alert('File not selected!')
        if (file.size > 1024 * 1024) return alert('File size too large!!!')
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert('File format not supported!!!')
        const form = new FormData()
        form.append('file', file)
        dispatch(uploadPictureAction(form))
            .then((val) => {
                if (val) {
                    setImageSelect(true)
                }
            })
    }
    const handleDestroy = (pid) => {
        const payload = {
            public_id: pid,
        }
        dispatch(destroyPicture(payload))
            .then((val) => {
                if (val) {
                    setImageSelect(false)
                }
            })
    }
    return (
        <Layout>
            <Container style={{
                marginTop: '30px'
            }}>
                <Row>
                    {
                        product.uploadPictureError ?
                            <div>{product.uploadPictureError}</div>
                            :
                            null
                    }
                    <Col md={6} sm={12} style={{
                        marginTop: '15px'
                    }}>
                        {
                            product.uploadPictureLoading ?
                                <LoadingComponent />
                                :
                                <div className='product_left'>
                                    <input style={imageSelect ? diplayNoneStyle : null} onChange={handleImage} type='file' />
                                    <button onClick={() => handleDestroy(params.id && !product.uploadPicture.url ? (formData.images.public_id) : (product.uploadPicture.public_id))} style={!imageSelect ? diplayNoneStyle : null}>X</button>
                                    <img style={!imageSelect ? diplayNoneStyle : null} src={params.id && !product.uploadPicture.url ? formData.images?.url : product.uploadPicture.url ? product.uploadPicture.url : ''} alt='' />
                                </div>
                        }
                    </Col>
                    <Col md={6} sm={12} style={{
                        marginTop: '15px'
                    }}>
                        {formToRender()}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default CreateProducts
