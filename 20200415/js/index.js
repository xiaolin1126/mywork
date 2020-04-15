let mybox = (function () {
    // 获取元素
    let boxLies = Array.from(document.querySelectorAll('.boxLie'));
    let _data = [];

    // 获取数据
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', './json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && this.readyState === 4) {
                _data = JSON.parse(xhr.responseText);
            };
        };
        xhr.send(null);
        // console.log(_data);
    };

    // 数据绑定
    let bindHTML = function bindHTML() {
        _data = _data.map(function (item) {
            let w = item.width;
            let h = item.height;

            h = h / (w / 230);
            item.width = 230;
            item.height = h;

            return item;
        });
        for (let i = 0; i < _data.length; i += 3) {
            let lie = _data.slice(i, i + 3);

            lie.sort(function (a, b) {
                return a.height - b.height;
            });

            boxLies.sort(function (a, b) {
                return b.offsetHeight - a.offsetHeight;
            });

            lie.forEach(function (item, index) {
                let {
                    pic,
                    height,
                    title,
                    link,
                } = item;

                let card = document.createElement('div');
                card.className = "card";

                card.innerHTML = `<a href="${link}">
                        <div class="cardImg" style="height:${height}px">
                            <img src="" alt="" data-image="${pic}">
                        </div>
                        <p>${title}</p>
                    </a>`;
                boxLies[index].appendChild(card);
            });
        };
    };


    // 延迟加载
    let lazyFunc = function lazyFunc() {

        let cardImgs = document.querySelectorAll('.cardImg');

        [].forEach.call(cardImgs, cardImg => {

            let isLoad = cardImg.getAttribute('isLoad');
            if (isLoad === 'true') return;

            let B = utils.offset(cardImg).top + cardImg.offsetHeight / 2;

            let A = document.documentElement.clientHeight + document.documentElement.scrollTop;

            if (B < A) {
                lazyImg(cardImg);
            }
        });
    };

    let lazyImg = function lazyImg(cardImg) {
        let img = cardImg.querySelector('img');
        let dataImage = img.getAttribute('data-image');
        let tempImage = new Image;

        tempImage.src = dataImage;
        tempImage.onload = function () {
            img.src = dataImage;
            utils.css(img, 'opacity', 1);
        };
        img.removeAttribute('data-image');
        tempImage = null;
        cardImg.setAttribute('isLoad', 'true');
    };

    // 加载更多数据
    let loaMorData = function loaMorData() {
        let HTML = document.documentElement;
        let x = HTML.clientHeight * 1.5 + HTML.scrollTop;
        let y = HTML.scrollHeight;
        if (x > y) {
            queryData();
            bindHTML();
            lazyFunc();
        }
    }

    return {
        init() {
            queryData();
            bindHTML();
            lazyFunc();
            window.onscroll = function () {
                lazyFunc();
                loaMorData();
            }

        }
    }

})();
mybox.init();