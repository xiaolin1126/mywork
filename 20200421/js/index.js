// 获取要操作的DOM元素
let container = document.querySelector('.container'),
    wrapper = container.querySelector('.wrapper'),
    sliderList = wrapper.querySelectorAll('.slider'),

    pagination = container.querySelector('.pagination'),
    paginationList = pagination.querySelectorAll('li'),

    changeLeft = container.querySelector('.changeLeft'),
    changeRight = container.querySelector('.changeRight');

// 设置定时器和切换事件初始值
let step = 0,
    prev = 0,
    interval = 2000,
    autoTimer = null;

let change = function change() {
    // 让上一张不显示
    sliderList[prev].style.zIndex = '0';
    sliderList[prev].style.opacity = '0';

    // 让当前张过度显示
    sliderList[step].style.zIndex = '1';
    sliderList[step].style.opacity = '1';
    sliderList[step].style.transition = 'opacity .5s';
    focus();
};

let autoMove = function autoMove() {
    // prev保存上一张的索引
    prev = step;
    // step代表即将显示的这一张
    step++;
    // 如果step大于图片时，让step重新为零
    if (step >= sliderList.length) {
        step = 0;
    }
    change();
};

let focus = function focus() {
    [].forEach.call(paginationList, (item, index) => {
        if (index === step) {
            item.className = 'active';
        } else {
            item.className = '';
        }

    });
};

// 设置自动轮播
autoTimer = setInterval(autoMove, interval);

// 鼠标经过停止轮播，离开轮播开始
container.onmouseenter = function () {
    clearInterval(autoTimer)
}
container.onmouseleave = function () {
    autoTimer = setInterval(autoMove, interval);
}

// 点击又按钮切换下一张
changeRight.onclick = autoMove;

// 点击左按钮切换上一张
changeLeft.onclick = function () {
    prev = step;
    step--;
    if (step < 0) {
        step = sliderList.length - 1;
    }
    change();
};
// 点击焦点跳转
[].forEach.call(paginationList, (item, index) => {
    item.onclick = function () {
        // 如果点击的这一项正好时当前展示的这张图片则不做处理
        if (step === index) return;
        prev = step;
        step = index;
        change();
    };
});