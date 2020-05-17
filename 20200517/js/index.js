// banner轮播图
(function () {
    let runBox = document.querySelector('.runBox'),
        runImg = runBox.querySelector('.runImg'),
        slide = runImg.querySelectorAll('.slide');
    let pagination = runBox.querySelector('.pagination'),
        paginationList = pagination.querySelectorAll('li');

    let step = 0,
        interval = 2000,
        autoTimer = null,
        len = slide.length;

    // 自动轮播 
    function autoMove() {
        if (step === (len - 1)) {
            step = 0;
            runImg.style.transitionDuration = '0s';
            runImg.style.left = '0px';
            runImg.offsetWidth;
        }
        step++;
        runImg.style.transitionDuration = '0.3s';
        runImg.style.left = -step * 343 + 'px';
        paginationFocus();
    }
    // 焦点对齐
    function paginationFocus() {
        let tempStep = step;
        if (tempStep === (len - 1)) {
            tempStep = 0;
        };
        [].forEach.call(paginationList, (item, index) => {
            if (index === tempStep) {
                item.className = 'active';
            } else {
                item.className = '';
            };
        });
    };
    // 自动轮播
    autoTimer = setInterval(autoMove, interval);
    // 鼠标滑过
    runBox.onmouseenter = function () {
        clearInterval(autoTimer);
    };
    runBox.onmouseleave = function () {
        autoTimer = setInterval(autoMove, interval);
    };
    // 鼠标滑过，焦点对齐
    [].forEach.call(paginationList, (item, index) => {
        item.onmouseenter = function () {
            if (index === step || (index === 0 && step === (len - 1))) return;
            step = index;
            runImg.style.transitionDuration = '0.3s';
            runImg.style.left = -step * 343 + 'px';
            paginationFocus();
        };
    });
})();

// banner选项卡
let bannerModle = (function () {
    let newsHead = document.querySelector('.newsHead'),
        newsList = newsHead.querySelectorAll('li');
    let allcard = document.querySelector('.allcard');
    let _data = null;
    let x = 0;
    // console.log(newsList)

    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
        // console.log(_data);
    };

    // 模板拼接
    let render = function render() {
        str = ``;
        _data.forEach((item, index) => {
            if (index === x) {
                let {
                    title,
                    subtitle,
                    con
                } = item;
                str += `<div class="card">
                <h4>${title}</h4>
                <ul>
                    <li><span>${subtitle}</span><a href="">${con}</a></li>
                    <li><span>${subtitle}</span><a href="">${con}</a></li>
                    <li><span>${subtitle}</span><a href="">${con}</a></li>
                    <li><span>${subtitle}</span><a href="">${con}</a></li>
                    <li><span>${subtitle}</span><a href="">${con}</a></li>
                    <li><span>${subtitle}</span><a href="">${con}</a></li>
                </ul>
            </div>`;
            }
        });
        allcard.innerHTML = str;
    };
    // 点击头部事件
    let handle = function handle() {
        [...newsList].forEach((item, index) => {
            item.onmouseenter = function () {
                console.log(item);
                [...newsList].forEach((item) => {
                    item.className = ''
                });
                item.className = 'newsList';
                x = index;
                render();
            }
        });

    }
    return {
        init() {
            queryData();
            render();
            handle();
        }
    };

})();
bannerModle.init();

// 活动中心选项卡
let giftModle = (function () {
    let giftCenUp = document.querySelector('.giftCenUp'),
        giftList = giftCenUp.querySelectorAll('li');
    let giftCard = document.querySelector('.giftCard');
    let _data = null;
    let x = 0;
    // console.log(newsList)

    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/data2.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
        // console.log(_data);
    };

    // 模板拼接
    let render = function render() {
        str = ``;
        _data.forEach((item, index) => {
            if (index === x) {
                let {
                    title,
                    title2,
                    pic1,
                    pic2,
                    pic3,
                    pic4,
                    giftTime
                } = item;
                str += `<li>
                <h3><a href="">${title}</a></h3>
                <div>
                    <img src="${pic1}" alt="">
                    <img src="${pic2}" alt="">
                    <img src="${pic3}" alt="">
                    <img src="${pic4}" alt="">
                </div>
                <p>${giftTime}</p>
                <div><a href=""><em class="em40"></em></a></div>
            </li>`;
                str += `<li>
                <h3><a href="">${title2}</a></h3>
                <div>
                    <img src="${pic2}" alt="">
                    <img src="${pic1}" alt="">
                    <img src="${pic4}" alt="">
                    <img src="${pic3}" alt="">
                </div>
                <p>${giftTime}</p>
                <div><a href=""><em class="em40"></em></a></div>
            </li>`;
            }
        });
        giftCard.innerHTML = str;
    };
    // 点击头部事件
    let handle = function handle() {
        [...giftList].forEach((item, index) => {
            item.onclick = function () {
                [...giftList].forEach((item) => {
                    item.className = ''
                });
                item.className = 'giftList';
                x = index;
                render();
            }
        });
    }
    return {
        init() {
            queryData();
            render();
            handle();
        }
    };
})();
giftModle.init();

// 媒体推荐选项卡
let mediaModle = (function () {
    let datVidUp = document.querySelector('.datVidUp'),
        dataList = datVidUp.querySelectorAll('li');
    let dataAllCard = document.querySelector('.dataAllCard');
    let _data = null;
    let x = 0;
    // console.log(newsList)

    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/data3.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
        console.log(_data);
    };

    // 模板拼接
    let render = function render() {
        str = ``;
        _data.forEach((item, index) => {
            if (index === x) {
                let {
                    title,
                    title2,
                    con,
                    con2
                } = item;
                str += `<ul class="dataCard">
                <li>
                    <div class="${title}">
                        <a href="">
                            <div class="video1">
                                <em class="emVideo"></em>
                            </div>
                        </a>
                    </div>
                    <p>
                        <a href="">${con}</a>
                    </p>
                </li>
                <li>
                    <div class="${title2}">
                        <a href="">
                            <div class="video1">
                                <em class="emVideo"></em>
                            </div>
                        </a>
                    </div>
                    <p>
                        <a href="">${con2}</a>
                    </p>
                </li>
            </ul>`;
            }
        });
        dataAllCard.innerHTML = str;
    };
    // 点击头部事件
    let handle = function handle() {
        [...dataList].forEach((item, index) => {
            item.onclick = function () {
                console.log(item);
                [...dataList].forEach((item) => {
                    item.className = ''
                });
                item.className = 'dataList';
                x = index;
                render();
            }
        });

    }
    return {
        init() {
            queryData();
            render();
            handle();
        }
    };

})();
mediaModle.init();