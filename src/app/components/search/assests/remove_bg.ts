import {removeBackground} from '@imgly/background-removal';

const blob = await removeBackground("assets/no-buses-found.png"); // imageBlob can be a File or URL
export const url = URL.createObjectURL(blob); // Use this URL in your <img> tag