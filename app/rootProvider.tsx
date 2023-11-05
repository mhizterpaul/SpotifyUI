'use client'
import { Context, context } from '@/components/main/withProvider'
import { BrowserRouter } from 'react-router-dom'



function RootRouter({ children }: { children: React.ReactNode }) {

    return (
        <BrowserRouter>
            <Context.Provider value={context}>
                {children}
            </Context.Provider>
        </BrowserRouter>
    )
}

export default RootRouter

