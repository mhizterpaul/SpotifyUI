export type FeaturedPlaylist = {

    name: string,
    id: string,
    image: string,
    href: string 
    
}

export type Recommendation = {
    src: string,
    title: string,
    author: string,
    url: string,
    description: string,
};

export type GenericPayload = {
    [key:string] : any
}

export type Category = {
    href: string,
    image: string,
    id: string,
    name: string
}