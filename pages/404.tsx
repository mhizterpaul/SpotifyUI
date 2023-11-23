import { ReactElement } from 'react'
import Layout from '../components/404Layout'

function PageNotFound() {
  return (
    <div className='h-full col-span-3 row-span-4 w-full flex flex-col items-center justify-center'><div>404 page not found</div></div>
  )
}

PageNotFound.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default PageNotFound