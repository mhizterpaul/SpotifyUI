
export const getAccessToken = () => {
    const payload = {};


    return {
        type: "AccessToken",
        ...payload
    }
}

export const getRefreshToken = (data: string) => {
    return {
        type: "createPlayer",
        payload: data
    }
}

export const updateFootballerData = (updatedData: any) => {
    return {
        type: "updatePlayer",
        payload: updatedData
    }
}