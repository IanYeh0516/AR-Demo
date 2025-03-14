
//     請注意 ， 圖層渲染的順序 ，錄影模式時，會因為webcam圖層先行而覆蓋掉原本的aframe圖層，導致錄影狀態下時沒辦法正常顯示
//     修正方式： 讓aframe圖層先渲染後在截圖。

import { processFrame,getFrameSize } from "./screenshot.js";
import { handleMediaDownload } from "./fileManager.js";

let mediaRecorder = null;
let recordedChunks = [];
// temp canvas 
let record_canvas = document.createElement("canvas");
const record_canvas_ctx = record_canvas.getContext("2d");
// 錄影幀率
const framerate = 24;
// 瀏覽器支援的格式
const supportedMimeTypes = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
    "video/mp4"
];
// 判斷瀏覽器是否支援,不支援則跳錯
const mimeType = supportedMimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || "";

if (!mimeType) {
    console.error("此瀏覽器不支援任何錄影格式");
}

export function startRecording() {
    recordedChunks = [];
// 初始化 record_canvas 
    const FrameSize = getFrameSize();
    record_canvas.width = FrameSize.width;
    record_canvas.height = FrameSize.height;
// 初始化 stream,MediaRecorder
    const stream = record_canvas.captureStream(framerate);
    mediaRecorder = new MediaRecorder(stream, { mimeType });
// mediaRecorder 傳輸資料
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.push(event.data);
    };
// mediaRecorder stop & 下載

    mediaRecorder.onstop = () => {
        if (recordedChunks.length > 0) {
           const blob = new Blob(recordedChunks, { type: mimeType });
           handleMediaDownload(blob,"video", mimeType );
         //  downloadBlob(blob, mimeType);
        }
    // release canvas    
        canvasRelease();
    };
    mediaRecorder.start();
}
// stop Recording 供外部按鈕呼叫
export function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        canvasRelease();
    }
}
// draw frame 邏輯
function drawFrame() {
    //呼叫暫存canvas
    record_canvas_ctx.clearRect(0, 0, record_canvas.width, record_canvas.height);
    //呼叫暫存清空canvas ，並畫合成後的圖
    record_canvas_ctx.drawImage(processFrame(), 0, 0);
}
// 先讓webgl圖層先渲染後再進行draw frame 
function webglRenderLoop() {
    requestAnimationFrame(webglRenderLoop);
    if (mediaRecorder!=null&&mediaRecorder.state === "recording") drawFrame(); // **WebGL 更新後擷取畫面**
}
// 瀏覽器自帶的 渲染函數
requestAnimationFrame(webglRenderLoop);

// 先讓webgl圖層先渲染後再進行draw frame 
function canvasRelease() {
    record_canvas_ctx.clearRect(0, 0, record_canvas.width, record_canvas.height);
    mediaRecorder =null;
}