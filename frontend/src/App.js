import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Headrer from './Components/UI/Headrer';
import { AvaitingModal, MessageModal } from './Components/UI/modals/Web3HelpingModals';
import { provider, setAdress, setUnsupportedNetwork, network, accountChangedThunk } from './store/features/web3Slice';


function App() {
  let dispatch = useDispatch()
  let adress = useSelector((state) => state.web3.adress)

  useEffect(() => {
    let checkHandler = async () => {
      let accounts = await provider.listAccounts()
      if (accounts.length === 0) {
        console.log('connect wallet')
      } else {
        let currentNetwork = await provider.getNetwork()
        if (currentNetwork.chainId !== network.chainId) {
          dispatch(setUnsupportedNetwork(true))
        }
        dispatch(setAdress(accounts[0]))
      }

    }
    checkHandler()
  }, [])

  useEffect(() => {
    async function accountChanged() {
      window.ethereum.on("accountsChanged", async function (accounts) {
        accounts = await provider.listAccounts();
        if (accounts[0] !== adress) {
          dispatch(accountChangedThunk())
        }
        console.log(accounts);
      });
    }
   async function chainChanged() {
    window.ethereum.on('chainChanged', async function (chainId) {
     window.location.reload()
    })
   }
   accountChanged()
   chainChanged()
   return () => provider.removeAllListeners()
  }, [])


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
