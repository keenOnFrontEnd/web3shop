import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getETHprice } from '../../api/cryptoApi'
import { addItemToBasket, decrementBasketItem, getAllItems, getBasketItems, getItem, incrementBasketItem, removeItemFromBasket } from '../../api/itemsApi'

const initialState = {
    items: {},
    selectedItem: [],
    EthereumPrice: 1500,
    basketItems: [],
    addToBasketLoading: false,
    removeFromBasketLoading: false,
    incrementItemCount: false,
    decrementItemCount: false,
}


export const setPriceThunk = createAsyncThunk(
    'items/setPrice',
    async (action, { dispatch, rejectWithValue, fulfillWithValue }) => {
        let res = await getETHprice()
        let price = res.data.ethereum.usd
        dispatch(setEthereumPrice(price))
    }
)

export const getAllItemsThunk = createAsyncThunk(
    'items/getAllItemsThunk',
    async (action, { dispatch, rejectWithValue, fulfillWithValue }) => {
        try {

            let res = await getAllItems()
            if (res.status === 200) {
                dispatch(setItems(res.data))
                fulfillWithValue('OK')
            } else {
                rejectWithValue('error')
            }

        } catch (e) {
            rejectWithValue(e)
            return e
        }
    }
)

export const getItemThunk = createAsyncThunk(
    'items/getItemThunk',
    async (action, { dispatch, rejectWithValue, fulfillWithValue }) => {
        try {
            let res = await getItem(action)
            if (res.status === 200) {
                dispatch(setSelectedItem(res.data))
                fulfillWithValue('OK')
            } else {
                rejectWithValue('error')
            }

        } catch (e) {
            rejectWithValue(e)
            return e
        }
    }
)
export const GetBasketItemsThunk = createAsyncThunk(
    'items/getBasketItems',
    async (action, { dispatch, fulfillWithValue, rejectWithValue }) => {
        try {
            let res = await getBasketItems(action)
            dispatch(setItemsToBasket(res.data))
            fulfillWithValue('setted')
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const AddItemToBasketThunk = createAsyncThunk(
    'items/AddItemToBasket',
    async (action, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
        try {
            dispatch(setLoadingAddingBasket(true))
            let res = await addItemToBasket(action)
            dispatch(setLoadingAddingBasket(false))
            let adress = getState()
            dispatch(GetBasketItemsThunk(adress.web3.adress))
            fulfillWithValue(res)
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const RemoveItemFromBasketThunk = createAsyncThunk(
    'items/RemoveItemFromBasketThunk',
    async (action, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
        try {
            dispatch(setLoadingRemoveFromBasket(true))
            let res = await removeItemFromBasket(action)
            dispatch(setLoadingRemoveFromBasket(false))
            let adress = getState()
            dispatch(GetBasketItemsThunk(adress.web3.adress))
            fulfillWithValue(res)
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const IncrementBasketItemThunk = createAsyncThunk(
    'items/IncrementBasketItem',
    async (action, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
        try {
            let data = {
                id: action
            }
            dispatch(setIncrementItemCount(true))
            let res = await incrementBasketItem(data)
            let state = getState()
            let items = state.items.basketItems.rows
            let duplicate = items
            const newduplicate = duplicate.map(obj =>
                obj.id === action ? { ...obj, count: obj.count + 1} : obj
            );
            dispatch(setIncrementItemCount(false))
            dispatch(reduceItemCountLocaly(newduplicate))
            fulfillWithValue(res)
        } catch (error) {
            rejectWithValue(error)
        }
    }
)
export const DecrementBasketItemThunk = createAsyncThunk(
    'items/DecrementBasketItemThunk',
    async (action, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
        try {
            let data = {
                id: action
            }
            dispatch(setDecrementItemCount(true))
            let res = await decrementBasketItem(data)
            dispatch(setDecrementItemCount(false))
            let state = getState()
            let items = state.items.basketItems.rows
            let duplicate = items
            let newduplicate = duplicate.map(obj =>
                obj.id === action ? { ...obj, count: obj.count - 1} : obj
            );
            newduplicate = newduplicate.filter((item) => item.count > 0)
            dispatch(reduceItemCountLocaly(newduplicate))
            fulfillWithValue(res)
        } catch (error) {
            rejectWithValue(error)
        }
    }
)


const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload
        },
        setEthereumPrice: (state, action) => {
            state.EthereumPrice = action.payload
        },
        setItemsToBasket: (state, action) => {
            state.basketItems = action.payload
        },
        setLoadingAddingBasket: (state, action) => {
            state.addToBasketLoading = action.payload
        },
        setLoadingRemoveFromBasket: (state, action) => {
            state.removeFromBasketLoading = action.payload
        },
        setIncrementItemCount: (state, action) => {
            state.incrementItemCount = action.payload
        },
        setDecrementItemCount: (state, action) => {
            state.decrementItemCount = action.payload
        },
        reduceItemCountLocaly: (state, action) => {
          state.basketItems.rows = action.payload
        }
    },
})

export const {
    setItems, setSelectedItem,
    setEthereumPrice, setItemsToBasket,
    setLoadingAddingBasket, setLoadingRemoveFromBasket,
    setIncrementItemCount, setDecrementItemCount,
    reduceItemCountLocaly
} = itemSlice.actions
export default itemSlice.reducer