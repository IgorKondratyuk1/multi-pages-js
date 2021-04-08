export default class Difference {
    constructor(officerSelector, items) {
        try {
            this.officer = document.querySelector(officerSelector);
            this.items = this.officer.querySelectorAll(items);
            this.counter = 0;
        } catch(e){}
    }

    bindTriggers() {
        this.officer.querySelector('.plus').addEventListener('click', () => {
            if (this.counter !== this.items.length - 2) {
                this.items[this.counter].style.display = "flex";
                this.counter ++;
            }
            else {
                this.items[this.counter].style.display = "flex";
                this.items[this.items.length - 1].classList.add('animated', 'fadeOut');
                setTimeout(() => this.items[this.items.length - 1].remove(), 400);
                
            }
        });
    }

    hideItems() {
        this.items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.classList.add('animated', 'fadeInDown');
                item.style.display = "none";
            }
        });
    }

    init() {
        try {
            this.hideItems();
            this.bindTriggers();
        } catch(e){}
    }
}