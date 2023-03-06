import React, {useState} from 'react'
import { Button, Card, Col,Modal } from 'react-bootstrap'
import { CartPlus,Bag } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import ChooseSizeModal from './modals/ChooseSizeModal'

const StoreItem = ({data}) => {
let {name,price,rating,img,item_info} = data

let ETHprice = useSelector((state) => state.items.EthereumPrice)

let [showChooseSizeModal, setShowChooseSizeModal] = useState(false)

let item = {
    id: 1,
    name: 'Nike Air Max 90',
    price: 120,
    rating: 5,
    img: 'https://via.placeholder.com/150',
    item_info: 'A classic sneaker with a sleek and modern design.',
    category: 'unisex',
    createdAt: '2023-03-04T17:37:46.057Z',
    updatedAt: '2023-03-04T17:37:46.057Z',
    typeId: 1,
    brandId: 1,
    sizes: [
        {
            "id": 1,
            "size": "37",
            "createdAt": "2023-03-04T10:32:26.140Z",
            "updatedAt": "2023-03-04T10:32:26.140Z",
            "itemSize": {
                "count": 2
            }
        },
        {
            "id": 2,
            "size": "38",
            "createdAt": "2023-03-04T10:32:26.140Z",
            "updatedAt": "2023-03-04T10:32:26.140Z",
            "itemSize": {
                "count": 3
            }
        },
        {
            "id": 3,
            "size": "39",
            "createdAt": "2023-03-04T10:32:26.140Z",
            "updatedAt": "2023-03-04T10:32:26.140Z",
            "itemSize": {
                "count": 1
            }
        }
    ]
  }

let cryptoPrice = (price / ETHprice) * 1.05
cryptoPrice = cryptoPrice.toFixed(5)

    return (
        <Col md='3' className='border border-secondary d-md-flex pt-4 ms-3 mb-3'>
            <Card style={{ backgroundColor: '#141716', border: 'none' }}>
                <Card.Img src={`${img}`}/>
                <Card.Body>
                    <Card.Text>
                        {name}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <p className="fw-light">{cryptoPrice} ETH</p>
                </Card.Footer>
                <div className='d-flex justify-content-around pt-3 pb-3'>
                    <Button variant="none" onClick={() => setShowChooseSizeModal(true)}>
                        <CartPlus color='white' size={30}/>
                    </Button>
                    <Button variant="none">
                        <Bag color='white' size={30}/>
                    </Button>
                </div>

            </Card>
            <ChooseSizeModal show={showChooseSizeModal} onHide={() => setShowChooseSizeModal(false)} sizez={data.sizes} itemId={data.id}/>
        </Col>
    )
}

export default StoreItem
