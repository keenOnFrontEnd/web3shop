import React, { useEffect, useState } from 'react'
import { Container, Col, Nav,Row } from 'react-bootstrap'
import StoreItem from './StoreItem'

import s from './store.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllItemsThunk, setPriceThunk } from '../../store/features/itemSlice'
import ChooseSizeModal from './modals/ChooseSizeModal'

const Store = () => {

    let location = useLocation()
    let history = useNavigate()
    let items = useSelector((state) => state.items.items)
    let dispatch = useDispatch()

    let [isBrandChoosed, setIsBrandChoosed] = useState(false)


    useEffect(() => {
        if (location.pathname != '/') {
            setIsBrandChoosed(true)
        }
        else {
            setIsBrandChoosed(false)
        }
    }, [location])

    useEffect(() => { 
        dispatch(getAllItemsThunk())
    },[])

    useEffect(() => {
        dispatch(setPriceThunk())
    },[])
   

    let filterSize = (item) => {
        if (location.key !== 'default') {
            let path = location.pathname
            path = path.slice(0, -3)
            history(`${path}/${item}`)
            console.log(path)
        } else {
            history(`${location.pathname}/${item}`)
        }
    }


    return (
        <Container className={`d-md-flex ${s.sizing} `}>
            <Col lg='2' className='border border-primary pt-4 ps-2 me-3'>
            </Col>
            <Row lg='10' className='d-flex flex-row'>
               {items.rows ? items.rows.map((item) => <StoreItem key={item.id} data={item} />) : ""}
            </Row>
        </Container>
    )
}

export default Store
