import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updatePage } from '../../actions/product.actions'

const LoadMore = () => {
    const dispatch = useDispatch()
    const filtering = useSelector(state => state.filtering)
    const handleLoadMore = () => {
        const pages = filtering.page
        dispatch(updatePage(pages + 1))
    }
    return (
        <div className='loadmore'>
            <Button
                onClick={handleLoadMore}
                style={{
                    margin: 'auto',
                    marginBottom: '10px'
                }} size='sm' variant='outline-danger'>
                Load More
            </Button>
        </div>
    )
}

export default LoadMore
