import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setAdressThunk } from '../../store/features/testSlice';


const Headrer = () => {

let dispatch = useDispatch()

    let setProvider = () => {
        dispatch(setAdressThunk())
    }
  

let adress = useSelector((state) => state.test.adress)

    return (
        <Container fluid="auto" className='d-flex bg-light justify-content-center'>
            <Button onClick={() => setProvider()}>connect</Button>
            <Button >sign</Button>
            <div>{adress}</div>
        </Container>
    )
}

export default Headrer
