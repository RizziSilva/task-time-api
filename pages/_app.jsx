import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../src/styles/global.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className='container-page'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        className='toast'
      />
      <Component {...pageProps} />
    </div>
  )
}
