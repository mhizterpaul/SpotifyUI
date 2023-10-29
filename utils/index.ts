import { Country } from "./types";

export function random<T>(arr: T[]) : T {
    return arr[Math.floor(Math.random()*arr.length)]
}

export function greet (){
    const date = new Date();
    const hours = date.getHours();
    return hours < 12 ? 'Good morning' : hours < 16 ? 'Good afternoon' : 'Good evening';
}

export function shuffle <T>(arr: T[]) : T[]{
    const newArr = [];
    while(arr.length > 0){
        const randomIndex = Math.floor(Math.random()*arr.length)
        newArr.push(arr[randomIndex])
        arr.splice(randomIndex, 1)
    }
    return newArr;
}

