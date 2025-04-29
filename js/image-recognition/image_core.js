window.addEventListener('DOMContentLoaded', (event) => {
        //點擊模型
    const ClickModel = document.querySelector('#model-click_model');
    ClickModel.addEventListener("click", event => {
        // 點選後設定animation-mixer屬性
        ClickModel.setAttribute('animation-mixer', 'loop: once');
        // 2秒後 模型 出現並觸發動畫
        setTimeout(function() {
            // model-model   => 點擊後出現的模型
            // clickModel  => 點擊物件
            // 3D Model
            var model = document.getElementById('model-model');
            model.setAttribute('animation', 'property: scale; to: 1 1 1; dur: 2000; easing: easeInOutQuad');
            ClickModel.setAttribute('animation', 'property: scale; to: 0 0 0; dur: 2000; easing: easeInOutQuad');
        }, 2000);
    });
  });