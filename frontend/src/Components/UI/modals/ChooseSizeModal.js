import React, { useCallback, useEffect, useState } from 'react'
import { Modal, Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AddItemToBasketThunk } from '../../../store/features/itemSlice'



const ChooseSizeModal = ({ show, sizez, onHide,itemId }) => {

    let size = []

    let dispatch = useDispatch()

    let [choosedSize, setChoosedSize] = useState(0)
    let adress = useSelector((state) => state.web3.adress)

    let isLoading = useSelector((state) => state.items.addToBasketLoading)

    for (let i = 0; i < sizez.length; i++) {
        const element = sizez[i];
        let available = element.itemSize.count > 0
        size.push({
            size: element.size,
            available: available
        })
    }

    const toggleChoose = useCallback((size) => {
        setChoosedSize(size)
    }, [])



    const toggleAddToCart = useCallback(() => {
        let data = {
            itemId,
            size: choosedSize,
            adress: adress
        }
        dispatch(AddItemToBasketThunk(data))
        onHide()
    }, [choosedSize])

    return (
        <Modal
            show={show}
            size=""
            centered
            onHide={onHide}
        >
            <Modal.Header closeButton={true}>
                <Modal.Title style={{ maxHeight: '20px' }} className="d-flex align-items-center justify-content-around">
                    Size Chooser
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column text-center justify-content-around'>
                <h5 className='p-0 m-0'>Choose the size of this pair of shoes</h5>
                <ButtonGroup className='mt-4 d-flex flex-wrap' type='checkbox' name="size-optons">
                    {size.map((item) =>
                        <Button
                            variant={`${item.available ? "outline-success" : "outline-secondary"}`}
                            className={'m-1'}
                            key={item.size}
                            size='lg'
                            disabled={!item.available}
                            onClick={(e) => toggleChoose(item.size)}
                            active={item.size === choosedSize}
                        >{item.size}</Button>)}
                </ButtonGroup>
                {choosedSize > 0 ?
                    <Button variant='success' size='lg' disabled={isLoading} onClick={() => toggleAddToCart()}> {isLoading ? 'Loading…' : 'Add 1 to cart'}</Button>
                    :
                    ""}
            </Modal.Body>
        </Modal>
    )
}

export default ChooseSizeModal
