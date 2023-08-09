const Volume = () => {
    return (
        <div className='flex flex-r0w'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" fillRule="evenodd" d="m55.618 178.111l75.645-94.377s.03-15.79 12.989-26.864c15.797-13.498 40.626-11.241 53.643 3.201c13.016 14.443 16.545 38.02-1.25 54.93c-11.078 10.526-23.552 10.425-23.552 10.425l-94.71 75.646l-9.344-9.14l-17.266 16.088s-1.429 1.188-2.844-.578c-1.415-1.765-.71-3.282-.71-3.282l17.039-16.203l-9.64-9.846zm17.729-1.144l5.687 5.484l75.162-59.15s-8.01-4.416-12.813-9.469c-4.804-5.053-7.58-11.981-7.58-11.981l-60.456 75.116zm75.827-105.668s-13.299 18.34 2.398 33.329c15.698 14.99 33.564 2.4 33.564 2.4s-16.071-3.727-24.79-12.39c-8.72-8.662-11.172-23.34-11.172-23.34zm5.393-4.513s3.702 14.109 12.601 23.073c8.899 8.965 22.874 12.662 22.874 12.662s12.885-19.52-3.271-34.318c-16.157-14.798-32.204-1.417-32.204-1.417z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.5"><path d="M6 6L3 7.732V4.268L6 6Z" /><path strokeLinecap="round" d="M3 12h18M10 6h11M3 18h18" /></g></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="18" height="12" x="3" y="4" rx="2" ry="2" /><path d="M2 20h20" /></g></svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H3a2 2 0 0 1-2-2Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17.5 7.5S19 9 19 11.5s-1.5 4-1.5 4m3-11S23 7 23 11.5s-2.5 7-2.5 7" /></g></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className='hidden' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="m18 14l2-2m2-2l-2 2m0 0l-2-2m2 2l2 2" /><path d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z" /></g></svg>
            <input type="range" id="cowbell" name="cowbell"
                min="0" max="100" value="90" defaultValue='50' step="10">
            </input>

            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17 2a1 1 0 1 0 0 2h1.586l-4.293 4.293a1 1 0 0 0 1.414 1.414L20 5.414V7a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1h-4zM4 18.586V17a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1h4a1 1 0 1 0 0-2H5.414l4.293-4.293a1 1 0 0 0-1.414-1.414L4 18.586z" /></svg>
        </div>
    )
}

export default Volume