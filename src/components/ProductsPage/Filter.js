import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateCatagory, updateSearch, updateSort } from '../../actions/product.actions'
import './style.css'
const Filter = () => {
    const dispatch = useDispatch()
    const filtering = useSelector(state => state.filtering)
    const catagory = useSelector(state => state.catagory)
    const handleChange = (e) => {
        console.log(e.target.value)
        dispatch(updateCatagory(e.target.value))
    }
    const handleInput = (e) => {
        dispatch(updateSearch(e.target.value))
    }
    const handleSort = (e) => {
        dispatch(updateSort(e.target.value))
    }
    if (!catagory.allcatagories.length > 0) {
        return null
    }
    return (
        <Container style={{
            margin: '10px 0'
        }}>
            <Row>
                <Col md={3} sm={12} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div className='spans'>
                        <span>Filter by</span>
                    </div>
                    <div className='filter__selects'>
                        <Form.Select value={filtering.catagory} onChange={handleChange} size="sm">
                            <option value=''>All Products</option>
                            {
                                catagory.allcatagories.map((val, index) =>
                                    <option value={`catagory=${val.name}`} key={index}>{val.name}</option>
                                )
                            }
                        </Form.Select>
                    </div>
                </Col>
                <Col md={6} sm={12}>
                    <Form.Control placeholder='Search' value={filtering.search} onChange={handleInput} value={filtering.search} />
                </Col>
                <Col md={3} sm={12} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div className='spans'>
                        <span>Sort by </span>
                    </div>
                    <div className='filter__selects'>
                        <Form.Select value={filtering.sort} onChange={handleSort} size="sm">
                            <option value=''>Newest</option>
                            <option value='oldest'>Oldest</option>
                            <option value='-sold'>Best sales</option>
                            <option value='-price'>Price: High-Low</option>
                            <option value='price'>Price: Low-High</option>
                        </Form.Select>
                    </div>

                </Col>
            </Row>
        </Container>

    )
}

export default Filter
