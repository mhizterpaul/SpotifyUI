import { useRef, useEffect } from "react";



const ImageBackgroundDetector = ({ imageUrl, callBack }: { imageUrl: string, callBack: (hexCode: string) => any }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;

    image.onload = () => {
      // Draw the image onto the canvas
      ctx.drawImage(image, 0, 0);

      // Get the pixel data of the top-left corner (position: 0,0)
      const pixelData = ctx.getImageData(0, 0, 1, 1).data;

      // Extract RGB values from the pixel data
      const [red, green, blue] = pixelData;

      // Convert RGB values to hex code
      const hexCode = rgbToHex(red, green, blue);
      callBack(hexCode);

    };
  }, [imageUrl]);

  // Helper function to convert RGB values to hex code
  const rgbToHex = (r: number, g: number, b: number): string =>
    `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;

  return <canvas ref={canvasRef} className={' w-48 h-48 '} />;
};

export default ImageBackgroundDetector;