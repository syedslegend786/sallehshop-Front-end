import React from 'react'
import {  Container, Nav, Navbar } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutAction } from '../../actions/auth.actions'
const MyNav = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(logOutAction());
    }
    const loggedInUserLinks = () => (
        <Nav>
            <Link className='nav-link' to='/products'>SHOP</Link>
            {
                auth.authenticate ?
                    <Link className='nav-link' to='/history'>HISTORY</Link>
                    :
                    null
            }
            {
                auth.authenticate ? <span onClick={handleLogOut} style={{
                    cursor: 'pointer'
                }} className='nav-link'>LOGOUT</span>
                    :
                    <>
                        <Link className='nav-link' to='/register'>REGISTER</Link>
                        <Link className='nav-link' to='/signin'>LOGIN</Link>
                    </>
            }
            <Link className='nav-link' to='/cart'><div style={{
                position: 'relative',
                width: '30px',
                height: '40px',
            }}> <span style={{
                position: 'absolute',
                width: '20px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                textAlign: 'center',
                top: '-5px',
                right: '0'
            }}>{parseInt(auth.user.cart?.length)}</span> <FaShoppingCart
                    style={{
                        fontSize: '22px'
                    }} /></div> </Link >
        </Nav>
    )
    const loggedInAdmin = () => (
        <Nav>
            <Link className='nav-link' to='/products'>PRODUCTS</Link>
            <Link className='nav-link' to='/createproduct'>CREATE PRODUCTS</Link>
            <Link className='nav-link' to='/createcatagory'>CATAGORIES</Link>
            {
                auth.authenticate ?
                    <Link className='nav-link' to='/history'>HISTORY</Link>
                    :
                    null
            }
            {
                auth.authenticate ? <span onClick={handleLogOut} style={{
                    cursor: 'pointer'
                }} className='nav-link'>LOGOUT</span>
                    :
                    <>
                        <Link className='nav-link' to='/signin'>LOGIN</Link>
                        <Link className='nav-link' to='/register'>REGISTER</Link>
                    </>
            }

            {/* <Link className='nav-link' to='/cart'><div style={{
                position: 'relative',
                width: '30px',
                height: '40px',
            }}> <span style={{
                position: 'absolute',
                width: '20px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                textAlign: 'center',
                top: '-5px',
                right: '0'
            }}>9</span> <FaShoppingCart
                    style={{
                        fontSize: '22px'
                    }} /></div> </Link > */}
        </Nav>
    )
    return (
        <Navbar fluid style={{
            borderBottom: '0.5px solid #DCDCDC'
        }} collapseOnSelect expand="lg" bg='light' variant="light">
            <Container>
                {
                    auth.user.role == 1 ?
                        <Link className='navbar-brand' to='/'>Admin</Link>
                        :
                        <Link className='navbar-brand' to='/'>Salleh Shop</Link>
                }
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    {
                        auth.user.role !== 1 ?
                            loggedInUserLinks()
                            :
                            loggedInAdmin()
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNav
