import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import { Sidebar } from 'app-components'
import { PAGES } from 'app-constants'
import { storageUtil } from 'app-utils'
import 'react-toastify/dist/ReactToastify.css'
import '../src/styles/global.scss'

export default function MyApp({ Component, pageProps }) {
  const { getUserInformation } = storageUtil()
  const router = useRouter()

  useEffect(() => {
    routeProtect()
  }, [])

  function routeProtect() {
    const { idUser } = getUserInformation()

    if (!idUser) router.push(PAGES.LOGIN)
  }

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        className='toast'
      />
      <div className='container-page'>
        {!pageProps.removeSidebar && <Sidebar />}
        <Component {...pageProps} />
      </div>
    </>
  )
}
