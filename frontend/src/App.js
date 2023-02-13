import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Headrer from './Components/UI/Headrer';
import { AvaitingModal, MessageModal } from './Components/UI/modals/Web3HelpingModals';
import { provider, accountChangedThunk,CheckConnectionThunk } from './store/features/web3Slice';


function App() {
  let dispatch = useDispatch()
  let adress = useSelector((state) => state.web3.adress)

  useEffect(() => {
    dispatch(CheckConnectionThunk())
  }, [])

  useEffect(() => {
    async function accountChanged() {
      window.ethereum.on("accountsChanged", async function (accounts) {
        accounts = await provider.listAccounts();
        if (accounts[0] !== adress) {
          dispatch(accountChangedThunk(accounts[0]))
        }
        console.log(accounts);
      });
    }
    async function chainChanged() {
      window.ethereum.on('chainChanged', async function (chainId) {
        window.location.reload()
      })
    }

    if (adress.length > 1 ) {
      accountChanged()
      chainChanged()
    }

    return () => provider.removeAllListeners()
  }, [adress])


  let isConnectionLoading = useSelector((state) => state.web3.loadingConnection)
  let isWritingMessage = useSelector((state) => state.web3.loadingWritingMessage)

  return (
    <div className="App">
      <Headrer />
      <AvaitingModal isConnectionLoading={isConnectionLoading} />
      <MessageModal isWritingMessage={isWritingMessage} />
    </div>
  );
}

export default App;
