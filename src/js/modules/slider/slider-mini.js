import Slider from './slider';

export default class SliderMini extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            try {
                if (this.animate) {
                    slide.querySelector('.card__title').style.opacity = '0.4';
                    slide.querySelector('.card__controls-arrow').style.opacity = '0';
                }
                slide.classList.remove(this.activeClass);
            }
            catch(e){}
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.container.classList.contains('feed__slider')) {
            this.container.insertBefore(this.slides[0], this.slides[this.slides.length - 2]); 
            this.decorizeSlides();
        }
        else {
            this.container.appendChild(this.slides[0]); 
            this.decorizeSlides();
        }
    }

    prevSide(endPos) {
        for (let i = this.slides.length - endPos; i > 0; i--) {
            let active = this.slides[i];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
            break;
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            if (this.container.classList.contains('feed__slider')) {
                this.prevSide(3);
            }
            else {
                this.prevSide(1);
            }
        });
    }

    autoplayInit(...elems) {
        let autoplayInterval = setInterval(() => this.nextSlide(), 5000);
        
        elems.forEach(elem => {
            elem.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
            elem.addEventListener('mouseleave', () => autoplayInterval = setInterval(() => this.nextSlide(), 5000));
        });
    }

    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();
            if (this.autoplay) {
                this.autoplayInit(this.container, this.prev, this.next);
            }
        } catch(e){}
    }
}