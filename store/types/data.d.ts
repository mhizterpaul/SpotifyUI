

export type Media = {
    url: string,
    image: string,
    name: string,
    id: number,
    artist_name?: string
};

export interface MediaContainer{
    name: string,
    items: media,
    url: string
}

export type Payload = {
    [key: string]: any
}



