export function random (arr: any[]){
    return arr[Math.floor(Math.random()*arr.length)]
}

export function greet (){
    const date = new Date();
    const hours = date.getHours();
    return hours < 12 ? 'Good morning' : hours < 16 ? 'Good afternoon' : 'Good evening';
}