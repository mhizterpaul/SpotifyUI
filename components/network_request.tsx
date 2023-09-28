import React from 'react'
import styles from './styles.module.css'
import { ApiStatus } from '@/store/reducers/main_slice'


type NetworkParam = {
    status: ApiStatus | string,
    meta: string
}

function Loader({ status, meta}: NetworkParam) {
    
    return (
        status === ('PENDING' || 'IDLE') ? <div className={styles.spinner }></div>
            : <div> {status + " " + meta}</div>
    )
}

export default Loader