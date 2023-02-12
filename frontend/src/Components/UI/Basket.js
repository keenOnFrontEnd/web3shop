import React from 'react'
import { Container, Offcanvas, Col, Image, Row, Button, ButtonGroup } from 'react-bootstrap'

const BasketComponent = ({ show, handelClose }) => {


    let state = [
        {
            id: 1,
            count: 2,
            discountValue: 0,
            basketId: 1,
            itemId: 1,
            item: {
                id: 1,
                name: "Nike",
                price: 1000,
                img: 'https://demox-000-02.site-x.pro/Media/demox-000-02/nike-16-1.jpg',
                itemSizez: {
                    size: 30
                }
            }
        },
        {
            id: 2,
            count: 1,
            discountValue: 30,
            basketId: 1,
            itemId: 4,
            item: {
                id: 4,
                name: "Nike air max",
                price: 2000,
                img: 'https://demox-000-02.site-x.pro/Media/demox-000-02/nike-16-1.jpg',
                itemSizez: {
                    size: 30
                }
            }
        },
        {
            id: 3,
            count: 5,
            discountValue: 10,
            basketId: 1,
            itemId: 22,
            item: {
                id: 22,
                name: "Stone Island 3000 pro max",
                price: 10000,
                img: 'https://demox-000-02.site-x.pro/Media/demox-000-02/nike-16-1.jpg',
                itemSizez: {
                    size: 30
                }
            }
        },
        {
            id: 4,
            count: 1,
            discountValue: 50,
            basketId: 1,
            itemId: 5,
            item: {
                id: 5,
                name: "Adidas Max Pro 5 plus",
                price: 3000,
                img: 'https://demox-000-02.site-x.pro/Media/demox-000-02/nike-16-1.jpg',
                itemSizez: {
                    size: 30
                }
            }
        },
    ]




    let BasketItem = ({props}) => {

        return <Container className='d-flex mb-5 p-0'>
            <Col md='4'>
               <Image src={props.item.img} alt="photo" fluid />
            </Col>
            <Col className='d-md-flex flex-column ps-4 pe-4' fluid>
                <Row className='fw-normal fs-5'> {props.item.name} </Row>
                <Row className='fw-light'>{props.item.itemSizez.size}</Row>
                <Row className='d-flex justify-content-between'>
                    <Col className='p-0 align-self-center'>{props.item.price} $ETH </Col>
                    <Col className='p-0 d-flex justify-content-end ' >
                        <ButtonGroup className='p-0 d-flex justify-content-end align-items-center fs-5 fw-bolder border border-dark' >
                        <Button size='sm' className='me-2 fs-3' variant='none'>-</Button>
                        {props.count}
                        <Button size='sm' className='ms-2 fs-3' variant='none'>+</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row className='mt-2'><Button variant='outline-danger'>Delete</Button></Row>
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
                    {state.map((item) => <BasketItem key={item.id} props={item} />)}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default BasketComponent
