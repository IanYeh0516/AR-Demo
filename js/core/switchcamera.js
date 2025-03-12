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
        arSystem.start();    
    }
}