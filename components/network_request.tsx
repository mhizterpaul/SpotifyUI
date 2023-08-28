import React from 'react'
import './styles.css'
import { ApiStatus } from '@/store/reducers/access_token_slice'

function Loader({ status, meta }: { status: ApiStatus, meta: string }) {
    
    return (
        status === 'PENDING' ? <div className='spinner'></div>
            : <div> {status + " " + meta}</div>
    )
}

export default Loader