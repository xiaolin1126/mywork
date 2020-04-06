let myshop = (function () {
    let navList = document.querySelectorAll('.navUl .navLi')
    let allcard = document.querySelector('.allcard');
    let data = null;

    let querData = function querData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
        // console.log(data);
    }

    let render = function render() {
        let str = ``;
        data.forEach(item => {
            let {
                title,
                price,
                time,
                hot,
                img
            } = item;

            str += `<div class="card">
                <img src="${img}" alt="">
                <div>
                    <h5>${title}</h5>
                    <p>价格：￥${price.toFixed(2)}</p>
                    <p>销量：${hot}</p>
                    <p>时间：${time.replace(/-/g,'/')}</p>
                </div>
            </div>`;
        });
        // console.log(str);
        allcard.innerHTML = str;
    };

    let clear = function clear() {
        Array.from(navList).forEach(item => {
            if (item !== this) {
                item.flag = -1;
            }
        });
    };

    let handle = function fandle() {
        Array.from(navList).forEach(item => {
            item.flag = -1;
            item.onclick = function () {
                clear.call(this);
                this.flag *= -1;
                let pai = this.getAttribute('data-pai');
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, '');
                    b = String(b[pai]).replace(/-/g, '');
                    return (a-b)*this.flag;
                });
                render();
            };
        });
    };

    return {
        init() {
            querData();
            render();
            handle();
        }
    };
})();
myshop.init();