import React from 'react'


const Playlist = () => {
  const country = new Intl.DisplayNames(['en'], { type: 'region' }); 

  
  return (
    <section className='flex flex-row'>
      <div>
        contains some image and some text
        hello why isnt this reflected
      </div>
    </section>
  )
}

export default Playlist