import React, { } from 'react'
import { Container, Modal, Row } from 'react-bootstrap';
import { Check2, Check2All } from 'react-bootstrap-icons';

export const AvaitingModal = ({isConnectionLoading}) => {

    return (
        <>
            <Modal
                show={isConnectionLoading}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size='sm'
            >
                <Modal.Header>
                    <Modal.Title className='text-center'>Connect your Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='d-flex flex-column align-items-center justify-content-between'>
                        <Row className='text-center'>
                        To interact with our Store, you must connect your wallet.
                        </Row>
                         <Check2 size={50} color="green" className='mt-3' />
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export const MessageModal = ({isWritingMessage}) => {
    return (
        <>
            <Modal
                show={isWritingMessage}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size='sm'
            >
                <Modal.Header>
                    <Modal.Title className='text-center'>Sign the message to continue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='d-flex flex-column align-items-center justify-content-between'>
                        <Row className='text-center'>We must check if you are the wallet owner. It's not a transaction, just a proof of ownering.</Row>
                        <Check2All size={50} color="green" className='mt-3' />
                    </Container>
                </Modal.Body>
                <Modal.Footer className='text-center'>
                By signing the message, you create an account on our website.
                </Modal.Footer>
            </Modal>
        </>
    )
}
