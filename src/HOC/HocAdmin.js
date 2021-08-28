import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router';

const HocAdmin = ({ element: Element, ...rest }) => {
    const auth = useSelector(state => state.auth)
    const isAdmin = auth.user.role
    const token = auth.token
    return (<Route {...rest} element={token && isAdmin === 1 ? Element : <Navigate to='/' />} />)
}
export default HocAdmin;