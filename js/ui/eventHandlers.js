import { captureScreenshot } from "../core/screenshot.js";
import { startRecording,stopRecording} from "../core/recorder.js";
import { switchCamera } from "../core/switchcamera.js"

// 拍照按鈕
const screenshotButton = document.getElementById('screenshot-button');
// 錄影按鈕
const screenrecordButton = document.getElementById('screenrecord-button');
let isrecording = false;
// 切換攝影機按鈕
const switchCameraButton = document.getElementById('switchcamera-button');

// 拍照按鈕 
screenshotButton.addEventListener('mousedown' ,function (){
    captureScreenshot();
});
// 錄影按鈕 
screenrecordButton.addEventListener('mousedown' ,function (){
    if (isrecording) {
        stopRecording();
        this.innerText = "開始錄影";
    } else {
        startRecording();
        this.innerText = "停止錄影";
    }
// 切換錄影狀態
isrecording = !isrecording; 

});
// 切換鏡頭狀態

switchCameraButton.addEventListener('mousedown' ,function(){
    switchCamera();
});


