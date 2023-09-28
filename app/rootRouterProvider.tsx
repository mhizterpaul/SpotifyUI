'use client'
import { BrowserRouter} from 'react-router-dom'



function RootRouter({children}: {children: React.ReactNode}) {

    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}

export default RootRouter