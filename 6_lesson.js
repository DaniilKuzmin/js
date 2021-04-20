`use strict`;
const basket = {

    goods: [

    ],

    totalPrice() {
        return catalog.unique(this.goods).reduce((sum, goods) => {
            return sum + goods.price * goods.quantity;
        }, 0);
    },

    goodsCount() {
        return this.goods.length;
    },
    getBasket(){
        const basket = document.createElement('div');
        basket.classList.add('basket');
        const basketH3 = document.createElement('h3');
        basketH3.innerHTML = 'BASKET';
        basket.appendChild(basketH3);
        const basketList = document.createElement('div');
        basketList.innerHTML = 'Корзина пуста';
        basketList.classList.add('basketList');
        basket.appendChild(basketList);
        document.querySelector('body').appendChild(basket);
        catalog.totality();
    },
}

const catalog = {

    goods: [
        {
            name: 'product1',
            price: 100,
            quantity: 0,
            index: 0,
            src: 'img/1.png',
            full_image_src: 'img/1_full.jpg'
        },

        {
            name: 'product2',
            price: 200,
            quantity: 0,
            index: 1,
            src: 'img/2.png',
            full_image_src: 'img/2_full.jpg'
        },

        {
            name: 'product3',
            price: 300,
            quantity: 0,
            index: 2,
            src: 'img/3.png',
            full_image_src: 'img/3_full.jpg'
        }
    ],
    catalogGenerate() {
      document.querySelector('body').appendChild(this.generateCatalogDiv());
      this.getCatalogList();
      this.eventClick();
      basket.getBasket();
    },
    generateCatalogDiv() {
        const catalogDiv = document.createElement('div');
        catalogDiv.classList.add('catalog');
        const catalogH3 = document.createElement('h3');
        catalogH3.innerHTML = 'CATALOG';
        catalogDiv.appendChild(catalogH3);
        return catalogDiv;
    },
    getCatalogList() {
      for (let i = 0; i < this.goods.length; i++) {
        const catalogGoodDiv = document.createElement('div');
        catalogGoodDiv.classList.add('good');
        const catalogImg = document.createElement('img');
        catalogImg.classList.add('smallImg');
        const catalogClearDiv = document.createElement('div');
        catalogClearDiv.classList.add('clear');
        const catalogButton = document.createElement('button');
        catalogButton.dataset.index = `${i}`;
        catalogGoodDiv.dataset.index = `${i}`;
        catalogImg.dataset.index = `${i}`;
        catalogGoodDiv.appendChild(catalogImg);
        catalogGoodDiv.appendChild(catalogClearDiv);
        catalogGoodDiv.appendChild(catalogButton);
        catalogImg.src = this.goods[i].src;
        catalogImg.dataset.full_image_url = this.goods[i].full_image_src;
        catalogButton.innerHTML = 'Добавить в корзину'
        catalogGoodDiv.innerHTML += `Товар: ${this.goods[i].name} <br>Цена: ${this.goods[i].price}`;
        document.querySelector('.catalog').appendChild(catalogGoodDiv);
      }
    },
    eventClick() {
        document.querySelector('.catalog').addEventListener('click', (event) => this.clickHandler(event))
    },

    clickHandler(event) {
        if (!this.isCorrectClick(event)) return;
        this.isImageClick(event);
        this.isButtonClick(event);
    },
    isCorrectClick(event) {
        return event.target.tagName === 'BUTTON' || event.target.tagName === 'IMG';
    },
    isImageClick(event) {
        if (event.target.tagName !== 'IMG') return;
        let fullImageDiv = this.getFullImageDiv(event);
        document.querySelector('body').appendChild(fullImageDiv);
        document.querySelector('.closed').addEventListener('click', event => this.closeFullImage(event));
        document.querySelector('.arrowLeft').addEventListener('click', event => this.previousGood(event));
        document.querySelector('.arrowRight').addEventListener('click', event => this.previousGood(event));
    },
    previousGood(event) {
        document.querySelector('.fullImageDiv').remove();
        this.isImageClick(event);
    },
    getFullImageDiv(event) {
        const fullImageDiv = document.createElement('div');
        fullImageDiv.classList.add('fullImageDiv');
        const fullImage = document.createElement('img');
        fullImage.classList.add('fullImage');
            if (event.target.className === 'smallImg') fullImage.src = `${event.target.dataset.full_image_url}`;
            if (event.target.dataset.index  === '1' && event.target.className === 'arrowLeft') fullImage.src = `${this.goods[1].full_image_src}`;
            if (event.target.dataset.index  === '0' && event.target.className === 'arrowLeft') fullImage.src = `${this.goods[0].full_image_src}`;
            if (event.target.dataset.index  === '1' && event.target.className === 'arrowRight') fullImage.src = `${this.goods[1].full_image_src}`;
            if (event.target.dataset.index  === '2' && event.target.className === 'arrowRight') fullImage.src = `${this.goods[2].full_image_src}`;
            if (Number(event.target.dataset.index) > (this.goods.length - 1) && event.target.className === 'arrowRight') {
                fullImage.src = `${this.goods[0].full_image_src}`;
                event.target.dataset.index = `0`;
            }
            if (Number(event.target.dataset.index) < 0 && event.target.className === 'arrowLeft') {
                fullImage.src = `${this.goods[2].full_image_src}`;
                event.target.dataset.index = `2`;
            }
        const close = document.createElement('img');
        close.classList.add('closed');
        close.src = 'img/cross.png'
        fullImageDiv.appendChild(fullImage);
        fullImageDiv.appendChild(close);
        const arrowLeft = document.createElement('img');
        arrowLeft.classList.add('arrowLeft');
        arrowLeft.src = 'img/left.png';
        arrowLeft.dataset.index = `${Number(event.target.dataset.index) - 1}`;
        fullImageDiv.appendChild(arrowLeft);
        const arrowRight = document.createElement('img');
        arrowRight.classList.add('arrowRight');
        arrowRight.src = 'img/right.png';
        arrowRight.dataset.index = `${Number(event.target.dataset.index) + 1}`;
        fullImageDiv.appendChild(arrowRight);
        return fullImageDiv;
    },
    closeFullImage() {
        document.querySelector('.fullImageDiv').remove();
    },
    isButtonClick(event) {
        if (event.target.tagName !== 'BUTTON') return;
        document.querySelector('.total').remove();
        this.goods[Number(event.target.dataset.index)].quantity++;
        basket.goods.push(this.goods[Number(event.target.dataset.index)]);
        document.querySelector('.basketList').innerHTML = ``;
        this.unique(basket.goods).forEach((value, index) => {
                const basketGoodDiv = document.createElement('div');
                basketGoodDiv.classList.add('good');
                const basketImg = document.createElement('img');
                basketImg.classList.add('smallImg');
                const basketClearDiv = document.createElement('div');
                basketClearDiv.classList.add('clear');
                basketGoodDiv.dataset.index = `${index}`;
                basketImg.dataset.index = `${index}`;
                basketGoodDiv.appendChild(basketImg);
                basketGoodDiv.appendChild(basketClearDiv);
                basketImg.src = value.src;
                basketImg.dataset.full_image_url = value.full_image_src;
                basketGoodDiv.innerHTML += `Товар: ${value.name} <br>Цена: ${value.price} <br>Колличество: ${value.quantity}`;
                document.querySelector('.basketList').appendChild(basketGoodDiv);
        })
        this.totality();
    },
    unique(arr) {
        let result = [];

            for (let str of arr) {
                if (!result.includes(str)) {
                    result.push(str);
                }
            }

        return result;
    },
    totality() {
        const total = document.createElement('div');
        total.classList.add('total');
        total.innerHTML = `Всего товаров: ${basket.goodsCount()} <br>На сумму: ${basket.totalPrice()}`;
        document.querySelector('.basket').appendChild(total);
    }
}
catalog.catalogGenerate();
