import React, {  useState } from 'react'
import { Button, Container, Col, Form,Navbar } from 'react-bootstrap'
import { Search, Cart3 } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk, RegistrationThunk } from '../../store/features/web3Slice';
import BasketComponent from './Basket';
import s from './header.module.css'



const Headrer = () => {

    let dispatch = useDispatch()

    let [showBasket, setShowBasket] = useState(false)

    let register = () => {
        dispatch(RegistrationThunk())
    }

    let disconnect = () => {
        dispatch(logoutThunk())
    }

    let adress = useSelector((state) => state.web3.adress)

    let editAdress = adress?.substr(0, 5) + '...' + adress?.substr(38, 4)

    let unsupport = useSelector((state) => state.web3.unsupportedNetwork)

    if(unsupport) {
        editAdress = "CHANGE NETWORK !"
    }
    return (
        <Container className={`${s.bg} d-md-flex justify-content-between`}>
            <Col md="4" className='ms-5 d-md-flex align-items-center'>
                <div className={`container d-flex justify-content-around align-items-center p-3 rounded-pill ${s.searchWrapper}`}>
                    <Search size={20} className="align-self-center" />
                    <Form.Control type='text' placeholder='Search for products' className={`${s.search}`} />
                </div>
            </Col>
            <Col md="4">
                <div className={`container d-flex justify-content-end align-items-center ${s.buttonWrapper}`} style={{ color: 'white' }}>
                    {
                        adress ? <Navbar.Text className='me-4'> {editAdress} </Navbar.Text>: ''
                    }
                    {
                        adress ? <Button variant='danger' className='rounded-pill' onClick={() => disconnect()}>Disconnect</Button> : <Button variant='danger' className='rounded-pill' onClick={() => register()}>Login or Create Account</Button>
                    }

                    <Button variant='none' className={`${s.cartButton}`} size='xs' onClick={() => setShowBasket(true)}><Cart3 size={25} color="white" title='Cart' /></Button>
                </div>
            </Col>
            <BasketComponent show={showBasket} handelClose={setShowBasket}/>
        </Container>
    )
}

export default Headrer
