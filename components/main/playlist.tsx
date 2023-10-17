import { BsPlayCircle } from "react-icons/bs"
import { SlOptions } from 'react-icons/sl'
import { LuClock3 } from 'react-icons/lu'
import { useState, useContext, useEffect } from "react";
import Image from 'next/image'
import { useAppDispatch } from "@/store/hooks";
import withProvider, { Context } from "./withProvider";
import { pushRef } from "@/store/reducers/main_slice";
import { useParams } from 'react-router-dom'
import { getPlaylist } from "@/utils/api";
import { useAppSelector } from "@/store/hooks";
import useSWR from "swr/immutable";

const Playlist = () => {
  const { playlist, tracks, setMedia } = useContext(Context);
  const { id } = useParams();
  const access_token = useAppSelector(state => state.main.access_token);
  const {data} = useSWR('getPlaylist', () => getPlaylist(access_token, id));
  const currFav = (() => {
    const dTracks = {}, dPlaylist = {};
    if(playlist.includes(id)) dPlaylist[id] = true;
    data.forEach((el)=> (tracks.includes(el.href) ? dTracks[href] = true : null))
    //search for playlist in playlist array
    return {dTracks, dPlaylist}
  })();
  const [favorite, setFavorite] = useState(currFav||{ dTracks: {}, dPlaylist: {} });
  const dispatch = useAppDispatch();
  //use context to add playlist or track to library
  //and playlist, liked songs or episodes
  //fetch playlist using id on url params/react router api

  useEffect(() => {
    setMedia(favorite);
  }, [favorite, setMedia]); 

  return (
    <section>
      <h2 className='flex items-center justify-around'>
        <Image src={Datas.img} alt='Playlist cover photo' width={100} height={100} />
        <div className='flex flex-col justify-around items-center'>
          <small>playlist</small>
          <h3>playlist header/name top right </h3>
          <p>
            | playlist description center right|</p>
          <p>
            made for link to userprofile . no of songs in playlist . duration of playlist center bottom   </p>
        </div>
      </h2>
      <table>
        <thead>
          <tr>
            <BsPlayCircle />
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" onClick={(() => (setFavorite(prev => ({
              ...prev, dPlaylist: {
                ...prev.dPlaylist,
                [id]: prev.dPlaylist[id] === undefined ? true : !prev.dPlaylist[id]
              }
            }))))} viewBox="0 0 24 24"><path fill={favorite ? "#1db954" : 'none'} d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
            <SlOptions /> </tr>
        </thead>
        <tbody>
          <tr className='capitalize'><td>#</td> <td>title</td> <td>Album </td><td><LuClock3 /></td></tr>
          {

            Datas.items.map(
              ({ albumArt, title, album, artist, duration }, id) => {
                return (
                  <tr key={title} className='group text-gray-600 hover:bg-gray-400 '>
                    <td>
                      <span className='group-hover:hidden'>{id}</span>
                      <BsPlayCircle className='hidden group-hover:block' />
                    </td>
                    <td>
                      {albumArt}
                    </td>
                    <td>
                      <div>
                        {artist}
                      </div>
                      <div>
                        {title}
                      </div>
                    </td>
                    <td onClick={() => (dispatch(pushRef('/playlist ' + { album })))}>
                      {album}
                    </td>
                    <td className='hidden group-hover:table-cell'>
                      <svg xmlns="http://www.w3.org/2000/svg" className='hidden group-hover:block' width="32" height="32" onClick={(() => (setFavorite(prev => ({
                        ...prev, dTracks: {
                          ...prev.dTracks,
                          [data.href]: prev.dTracks[data.href] === undefined ? true : !prev.dTracks[data.href]
                        }
                      }))))} viewBox="0 0 24 24"><path fill={favorite ? "#1db954" : 'none'} d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                    </td>
                    <td>
                      {duration}
                    </td>
                    <td className='hidden group-hover:table-cell '>
                      <SlOptions />
                    </td>
                  </tr>
                )

              })
          }

        </tbody>
      </table>
    </section>
  )
}

export default withProvider(Playlist);