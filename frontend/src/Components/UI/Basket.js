import React from 'react'
import { Container, Offcanvas, Col, Image, Row, Button, ButtonGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { DecrementBasketItemThunk, IncrementBasketItemThunk, RemoveItemFromBasketThunk } from '../../store/features/itemSlice'

const BasketComponent = ({ show, handelClose }) => {


    let basketItems = useSelector((state) => state.items.basketItems)
    let dispatch = useDispatch()


    let BasketItem = ({ props }) => {

        let removeHandler = () => {
            dispatch(RemoveItemFromBasketThunk(props.id))
        }
        let incrementHandler = () => {
            dispatch(IncrementBasketItemThunk(props.id))
        }

        let decrementHandler = () => {
            dispatch(DecrementBasketItemThunk(props.id))
        }



        let removeFromBasketLoading = useSelector((state) => state.items.removeFromBasketLoading)
        let incrementItemCount = useSelector((state) => state.items.incrementItemCount)
        let decrementItemCount = useSelector((state) => state.items.decrementItemCount)

        let { count, itemSize } = props
        let { item, size } = itemSize
        let { name, price, img } = item
        let ETHprice = useSelector((state) => state.items.EthereumPrice)


        let cryptoPrice = ((price / ETHprice) * 1.05).toFixed(5)

        return <Container className='d-flex mb-5 p-0'>
            <Col md='4'>
                <Image src={img} alt="photo" fluid />
            </Col>
            <Col className='d-md-flex flex-column ps-4 pe-4' fluid>
                <Row className='fw-normal fs-5'> {name} </Row>
                <Row className='fw-light'>{size.size}</Row>
                <Row className='d-flex justify-content-between'>
                    <Col className='p-0 align-self-center'>{cryptoPrice} $ETH </Col>
                    <Col className='p-0 d-flex justify-content-end ' >
                        <ButtonGroup className='p-0 d-flex justify-content-end align-items-center fs-5 fw-bolder border border-dark' >
                            <Button size='sm' className='me-2 fs-3' variant='none' disabled={decrementItemCount} onClick={() => decrementHandler()}>-</Button>
                            {count}
                            <Button size='sm' className='ms-2 fs-3' variant='none' disabled={incrementItemCount} onClick={() => incrementHandler()}>+</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row className='mt-2'><Button variant='outline-danger' onClick={() => removeHandler()} disabled={removeFromBasketLoading}>{removeFromBasketLoading ? "Loading..." : "Delete"}</Button></Row>
            </Col>
        </Container>
    }

    return (
        <>
            <Offcanvas show={show} onHide={() => handelClose(false)} placement="end">
                <Offcanvas.Header className='border-bottom border-secondary' closeButton>
                    <Offcanvas.Title ><h2>Basket</h2></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* {items.rows ? items.rows.map((item) => <StoreItem key={item.id} data={item} />) : ""} */}
                    {basketItems.rows ? basketItems.rows.map((item) => <BasketItem key={item.id} props={item} />) : ""}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default BasketComponent
