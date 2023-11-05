const PlayIcon = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className={` relative group w-fit h-fit`}>
            {children}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={`hidden h-1/3 w-auto text-[#1ed760] z-10 absolute bottom-[2%] right-[5%] group-hover:block shadow rounded-full 
             bg-gradient-to-r from-white to-white bg-no-repeat bg-center `} style={{ backgroundSize: '40% 40%' }} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg>
        </div>
    )
}

export default PlayIcon