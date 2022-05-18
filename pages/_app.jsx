import '../src/styles/global.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className='container-page'>
      <Component {...pageProps} />
    </div>
  )
}
