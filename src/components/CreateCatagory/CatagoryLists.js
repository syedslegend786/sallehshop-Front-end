import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteCatagory, updateCatagory } from '../../actions/catagories.actions'

const CatagoryLists = ({ val }) => {
    const [updating, setUpdating] = useState(false)
    const [updatedName, setupdatedName] = useState(val.name)
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteCatagory(val._id))
            .then((val) => {
                if (val.status === true) {
                    alert(val.msg)
                }
                if (val.status === false) {
                    alert(val.msg)
                }
            })
    }
    const handleUpdate = () => {
        if (!updatedName) {
            alert('kindly write the updated name!')
            return;
        }
        const payload = {
            name: updatedName
        }
        dispatch(updateCatagory(val._id, payload))
            .then((val) => {
                if (val) {
                    alert('updated successfully!')
                    setUpdating(false)
                }
            })
    }
    return (
        <div className='catagories'>
            {
                updating ?
                    <div>
                        <input style={{
                            outline: 'none',
                            border: 'none',
                            borderBottom: '1px solid grey',
                            marginRight: '15px'
                        }} value={updatedName} onChange={e => setupdatedName(e.target.value)} />
                        <Button onClick={handleUpdate}>save</Button>
                    </div>
                    :
                    <span>{val.name}</span>
            }
            <div className={`${updating ? 'dispear_div' : ''}`}>
                <Button onClick={() => {
                    setUpdating(true)
                }} variant="secondary">Edit</Button><Button onClick={handleDelete} variant="danger">Delete</Button>
            </div>
        </div>
    )
}

export default CatagoryLists
