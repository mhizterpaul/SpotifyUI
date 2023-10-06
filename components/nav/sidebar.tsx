import { pushRef } from '@/store/reducers/main_slice';
import { useAppDispatch } from '@/store/hooks';
import {BiHomeAlt} from 'react-icons/bi'

const likedStyles = {
    background: 'linear-gradient(135deg, #4000F4 0%, #603AED 22.48%, #7C6EE6 46.93%, #979FE1 65.71%, #A2B3DE 77.68%, #ADC8DC 88.93%, #C0ECD7 100%)',

}

const Sidebar = (params: { isOpen?: boolean }) => {
    const dispatch = useAppDispatch();
  

    return (<nav className={/*my-auto */ [`bg-black sidebar hidden sm:flex flex-col h-[88vh] min-h-[584px] items-center max-h-[680px] justify-around
         text-lg pl-6 font-medium w-[14rem]`, params.isOpen == null ? '' : params.isOpen === true ? 'translateOut' : 'translateIn'].join(' ')}>
        <h2 className='text-3xl mt-6 -mb-9'>
            <svg xmlns="http://www.w3.org/2000/svg" className='inline-block mb-2 mr-1' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 0C7.197 0 0 7.197 0 16s7.197 16 16 16s16-7.197 16-16S24.88 0 16 0zm7.36 23.12c-.319.479-.881.64-1.36.317c-3.76-2.317-8.479-2.797-14.083-1.52c-.557.165-1.037-.235-1.199-.72c-.156-.557.24-1.036.719-1.197c6.084-1.36 11.365-.803 15.521 1.76c.563.24.64.88.401 1.36zm1.921-4.401c-.401.563-1.12.803-1.683.401c-4.317-2.641-10.88-3.437-15.916-1.839c-.641.156-1.365-.161-1.521-.803c-.161-.64.156-1.359.797-1.52c5.844-1.761 13.041-.876 18 2.161c.484.24.724 1.041.323 1.599zm.162-4.479c-5.125-3.043-13.683-3.36-18.563-1.839c-.801.239-1.599-.24-1.839-.964c-.239-.797.24-1.599.959-1.839c5.683-1.681 15.041-1.359 20.964 2.161c.719.401.957 1.36.557 2.079c-.401.563-1.36.801-2.079.401z" /></svg>
            Spotify<sup>&reg;</sup>
        </h2>
        <ul>
            <li onClick={() => dispatch(pushRef('/'))}>
                <BiHomeAlt />
                 Home
            </li>
            <li onClick={() => dispatch(pushRef('/search'))}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="m229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z" /></svg> Search
            </li>
            <li onClick={() => dispatch(pushRef('/library'))}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 3h2v18H7zM4 3h2v18H4zm6 0h2v18h-2zm9.062 17.792l-6.223-16.89l1.877-.692l6.223 16.89z" /></svg> Your library</li>
        </ul>
        <ul>
            <li onClick={() => dispatch(pushRef('/playlist?new=true'))}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className='--big-svg' viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Zm4 9a.75.75 0 0 1-.75-.75v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5a.75.75 0 0 1 1.5 0v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5A.75.75 0 0 1 8 11Z" clipRule="evenodd" /></svg> Create Playlist</li>
            <li onClick={() => dispatch(pushRef('/library?list=likedSongs'))}>
                <div className='inline-block' style={likedStyles}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                </div>
                liked songs</li>
            <li onClick={() => dispatch(pushRef('/library?list=episodes'))}>
                <div className = 'inline-block rounded bg-[#004638]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#138a41" d="M12 15q-.825 0-1.413-.588T10 13q0-.825.588-1.413T12 11q.825 0 1.413.588T14 13q0 .825-.588 1.413T12 15Zm-4.75 1.675q-.575-.775-.913-1.7T6 13q0-2.5 1.75-4.25T12 7q2.5 0 4.25 1.75T18 13q0 1.05-.338 2t-.912 1.7q-.25.325-.663.325t-.737-.325q-.275-.275-.287-.675t.237-.775q.35-.5.525-1.063T16 13q0-1.65-1.175-2.825T12 9q-1.65 0-2.825 1.175T8 13q0 .65.188 1.2t.512 1.05q.25.375.225.787t-.3.688q-.3.3-.713.288t-.662-.338Zm-2.825 2.85Q3.3 18.2 2.65 16.538T2 13q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 3q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 13q0 1.875-.65 3.55t-1.775 3q-.275.3-.675.3t-.7-.3q-.275-.275-.287-.688t.262-.737q.85-1.05 1.338-2.35T20 13q0-3.35-2.325-5.675T12 5Q8.65 5 6.325 7.325T4 13q0 1.475.487 2.763T5.85 18.1q.275.325.263.738t-.313.712q-.3.3-.7.288t-.675-.313Z" /></svg>
                </div>
                your episodes</li>
        </ul>
        <button className='capitalize justiy-self-end'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m11 12.2l-.9-.9q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.6 2.6q.3.3.7.3t.7-.3l2.6-2.6q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275l-.9.9V9q0-.425-.288-.713T12 8q-.425 0-.713.288T11 9v3.2Zm1 9.8q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z" /></svg>
            install app
        </button>
    </nav>)
}

export default Sidebar;
