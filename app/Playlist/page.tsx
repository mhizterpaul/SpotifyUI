'use client'

import { Home } from "../page"
import withProvider from "@/store/with_provider"

const Playlist = () => {
  return (
    <Home>
      <div>
        playlist
      </div>
    </Home>
  )
}

export default withProvider(Playlist)