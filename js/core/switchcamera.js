// 切換鏡頭
const sceneEl = document.querySelector('a-scene');
let arSystem;
// 切換前後鏡頭
export  function switchCamera() {

    if(!arSystem){
        arSystem = sceneEl.systems["mindar-face-system"];
    }
    if(arSystem){
        arSystem.stop(); // stop the engine
        arSystem.switchCamera(); // switch between front/back cameras    
        // 先移除現有的 <video>，避免重複新增
        document.querySelectorAll("video").forEach(video => video.remove());
        arSystem.start();    
    }
}