import React from 'react'
import './styles.css'
import { ApiStatus } from '@/store/reducers/access_token_slice'

function Loader({ status, meta }: { status: ApiStatus, meta: string }) {
    return (
        <div className='spinner'>
            {meta + " " + status}
        </div>
    )
}

export default Loader