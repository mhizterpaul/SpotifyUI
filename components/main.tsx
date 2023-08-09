import BrowseAll from "./browseAll"
import Playlist from "./playlist"
import Recommendation from "./recommendation"
import TopGenres from "./topGenres"

const Main = () => {
    return (<main className='main m-0'>
        <Playlist />
        <Recommendation />
        <TopGenres />
        <BrowseAll />

    </main>)
}

export default Main