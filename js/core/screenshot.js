import { downloadOrShareImage } from "./fileManager.js";
// 定義aframeCam
let aframeCam = document.querySelector("a-scene");
// 定義webCam ，注意這個鬼東西一開始無法抓到。
let webcam = document.querySelector("video");
// tempCanvas
let tempCanvas = document.createElement("canvas");
const tempCtx = tempCanvas.getContext("2d");
// 拍照主要邏輯
export function captureScreenshot() {
    // process frame 
    processFrame();
    // download
    downloadOrShareImage(tempCanvas.toDataURL("image/png"), `screenshot_${Date.now()}.png`);
    // rest tempCanvas
    tempCtx.clearRect(0,0,webcam.clientWidth, webcam.clientHeight);
}
//frame logic
export function processFrame(){
    //有一個問題是一開始無法載入webcam ，因此這裡再次檢查並載入
    if(!webcam){webcam  =document.querySelector("video");}
    //檢查狀態 
    if (!aframeCam || !webcam) {
            console.warn("找不到a-scene or webcam");
    return;
    }
    // 先畫canvas reset 
    tempCanvas.width = webcam.clientWidth;
    tempCanvas.height = webcam.clientHeight;
    // 先畫webcam 
    tempCtx.drawImage(webcam, 0, 0, webcam.clientWidth, webcam.clientHeight);
    // 再畫 aframecam 
    tempCtx.drawImage(aframeCam.components.screenshot.getCanvas("perspective"), 0, 0, webcam.clientWidth, webcam.clientHeight);
    return tempCanvas;
}
// returnFrameSize
export function getFrameSize(){
    if(!webcam){webcam  =document.querySelector("video");}
    if (!aframeCam || !webcam) {
            console.warn("找不到a-scene or webcam");
    return;
    }
    let size = {width: webcam.clientWidth ,height : webcam.clientHeight};
    return  size;
}
