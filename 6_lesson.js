`use strict`;
const basket = {

    goods: [

    ],

    totalPrice() {
        return this.goods.reduce((sum, good) => {
            return sum + this.goods.price * this.goods.quantity;
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

    },
    generateBasketList() {
        if (this.goods.length === 0) return null;
        document.querySelector('.basketList').innerHTML = '';
        for (let i = 0; i < this.goods.length; i++) {
        }
        // for (let i = 0; i < this.goods.length; i++) {
        //     const basketGoodDiv = document.createElement('div');
        //     basketGoodDiv.classList.add('good');
        //     const basketImg = document.createElement('img');
        //     basketImg.classList.add('smallImg');
        //     const basketClearDiv = document.createElement('div');
        //     basketClearDiv.classList.add('clear');
        //     const basketButton = document.createElement('button');
        //     basketButton.dataset.index = `${i}`;
        //     basketGoodDiv.appendChild(basketImg);
        //     basketGoodDiv.appendChild(basketClearDiv);
        //     basketGoodDiv.appendChild(basketButton);
        //     basketImg.src = `img/${i + 1}.png`;
        //     basketImg.dataset.full_image_url = `img/${i + 1}_full.jpg`;
        //     basketButton.innerHTML = 'Удалить'
        //     basketGoodDiv.innerHTML += `Товар: ${this.goods[i].name} <br>Цена: ${this.goods[i].price} <br>Колличество: ${this.goods[i].quantity}`;
        //     document.querySelector('.basket').appendChild(basketGoodDiv);
        // }
    }
}

const catalog = {

    goods: [
        {
            name: 'product1',
            price: '100',
            quantity: 1
        },

        {
            name: 'product2',
            price: '200',
            quantity: 1
        },

        {
            name: 'product3',
            price: '300',
            quantity: 1
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
        catalogGoodDiv.appendChild(catalogImg);
        catalogGoodDiv.appendChild(catalogClearDiv);
        catalogGoodDiv.appendChild(catalogButton);
        catalogImg.src = `img/${i + 1}.png`;
        catalogImg.dataset.full_image_url = `img/${i + 1}_full.jpg`;
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
    },
    previousGood(event) {
        document.querySelector('.fullImageDiv').remove();

    },
    getFullImageDiv(event) {
        const fullImageDiv = document.createElement('div');
        fullImageDiv.classList.add('fullImageDiv');
        const fullImage = document.createElement('img');
        fullImage.classList.add('fullImage');
        fullImage.src = `${event.target.dataset.full_image_url}`;
        const close = document.createElement('img');
        close.classList.add('closed');
        close.src = 'img/cross.png'
        fullImageDiv.appendChild(fullImage);
        fullImageDiv.appendChild(close);
        const arrowLeft = document.createElement('img');
        arrowLeft.classList.add('arrowLeft');
        arrowLeft.src = 'img/left.png';
        fullImageDiv.appendChild(arrowLeft);
        const arrowRight = document.createElement('img');
        arrowRight.classList.add('arrowRight');
        arrowRight.src = 'img/right.png';
        fullImageDiv.appendChild(arrowRight);
        return fullImageDiv;
    },
    closeFullImage() {
        document.querySelector('.fullImageDiv').remove();
    },
    isButtonClick(event) {
        if (event.target.tagName !== 'BUTTON') return;
        let i = event.target.dataset.index;
        basket.goods.push(this.goods[Number(i)]);
        basket.generateBasketList();
    }
}
catalog.catalogGenerate();