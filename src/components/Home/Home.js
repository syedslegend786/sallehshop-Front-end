import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { keepUserLogin } from '../../actions/auth.actions'
import Layout from '../Layout/Layout'
import LoadingPage from '../../UI/LoadingComponent/LoadingComponent'
const Home = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    return (
        <Layout>
            {
                auth.authenticating ?
                    <LoadingPage />
                    :
                    <div>Home...</div>
            }
        </Layout>
    )
}

export default Home
