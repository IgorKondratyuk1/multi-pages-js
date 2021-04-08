import MainSlider from './modules/slider/slider-main';
import VideoPlayer from './modules/playVideo';
import SliderMini from './modules/slider/slider-mini';
import Difference from './modules/difference';
import Form from './modules/forms';
import Accordion from './modules/accordion';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.next', container: '.page'});
    slider.render();

    const modulePageSlider = new MainSlider({btns: '.next', container: '.moduleapp'});
    modulePageSlider.render();

    const showUpSlider = new SliderMini({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    showUpSlider.init();

    const modulesSlider = new SliderMini({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        prev: '.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new SliderMini({
        container: '.feed__slider',
        next: '.feed__slider .slick-next',
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init();

    new Difference('.officerold', '.officer__card-item').init();
    new Difference('.officernew', '.officer__card-item').init();
    new Form('.form', 'assets/question.php').init();

    new Accordion('.module__info-show .plus').init();
    new Download('.download').init();
});