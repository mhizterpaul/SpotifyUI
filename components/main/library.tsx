import {useContext} from 'react'
import withProvider, {Context} from './withLibraryContext'


const Library = (params) => {
  //props.match.params.id or useParams
  const {playlist, likedSongs, addMedia, removeMedia} = useContext(Context);

  return (
    <>
    a list of playlist | liked Song | episodes if any
    else return you do not have any playlist liked songs of episodes
    </>
  )
}

export default withProvider(Library)