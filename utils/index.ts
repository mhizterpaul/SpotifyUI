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

export function hexToHSL(H, L:number, a=1) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return "hsla(" + h + "," + s + "%," + L + "%," + a + ")";
  }

