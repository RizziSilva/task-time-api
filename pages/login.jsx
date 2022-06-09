import { Login } from 'app-pages'

export default Login

export async function getServerSideProps() {
  return {
    props: { removeSidebar: true }
  }
}
