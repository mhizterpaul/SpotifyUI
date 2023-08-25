
export const getAccessToken = () => {
    return {
        type: "AccessToken"
    }
}

export const getRefreshToken = (data: string) => {
    return {
        type: "createPlayer",
        payload: data
    }
}

export const getPlaylist = () => {
    return {
        type: "getFeaturedPlaylist"
    }
}