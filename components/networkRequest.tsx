import React from 'react'
import styles from './styles.module.css'
import { ApiStatus } from '@/store/reducers/main_slice'


type NetworkParam = {
    status: ApiStatus | string,
    meta: string
    style?: React.CSSProperties
}

function Loader({ status, meta, style }: NetworkParam) {

    return (<div className='flex justify-center items-center w-full h-full'>
        {
            status === ('PENDING' || 'IDLE') ? <div className={`${styles.spinner}`} style={style}></div>
                : <div> {status + " " + meta}</div>}
    </div>)
}

export default Loader