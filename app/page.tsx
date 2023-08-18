import BrowseAll from '@/components/main/browseAll'
import Recommendation from '@/components/main/recommendation'
import TopGenres from '@/components/main/topGenres'
import Playlist from '@/components/main/playlist'

export default function Home() {
  return (
    <main className='main m-0'>
      <Playlist />
      <Recommendation />
      <TopGenres />
      <BrowseAll />
    </main>
  )
}
