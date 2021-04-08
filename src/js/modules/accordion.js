export default class Accordion {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
    }

    bindTrigger() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const messageBlock = trigger.parentNode.nextElementSibling;
                if (messageBlock.style.display !== 'block') {
                    messageBlock.classList.remove('animated', 'fadeOutUp');
                    messageBlock.classList.add('animated', 'fadeInDown');
                    messageBlock.style.display = 'block';
                    trigger.children[0].querySelector('svg').remove();
                    console.log(trigger.children[0].querySelector('svg'));
                    trigger.children[0].insertAdjacentHTML('afterbegin', `
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459.313 459.314" fill="none"
                            xml:space="preserve">
                        <g>
                            <path d="M459.313,229.648c0,22.201-17.992,40.199-40.205,40.199H40.181c-11.094,0-21.14-4.498-28.416-11.774
                                C4.495,250.808,0,240.76,0,229.66c-0.006-22.204,17.992-40.199,40.202-40.193h378.936
                                C441.333,189.472,459.308,207.456,459.313,229.648z" fill="white"/>
                        </g>
                    `);
                }
                else {
                    messageBlock.classList.remove('animated', 'fadeInDown');
                    messageBlock.classList.add('animated', 'fadeOutUp');
                    trigger.children[0].querySelector('svg').remove();
                    trigger.children[0].insertAdjacentHTML('afterbegin', `
                        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.16699 1.00033C5.16699 0.540088 5.54009 0.166992 6.00033 0.166992C6.46056 0.166992 6.83366 0.540088 6.83366 1.00033V11.0003C6.83366 11.4606 6.46056 11.8337 6.00033 11.8337C5.54009 11.8337 5.16699 11.4606 5.16699 11.0003V1.00033Z" fill="white"></path>
                            <path d="M1.00033 6.83366C0.540088 6.83366 0.166992 6.46056 0.166992 6.00033C0.166992 5.54009 0.540088 5.16699 1.00033 5.16699H11.0003C11.4606 5.16699 11.8337 5.54009 11.8337 6.00033C11.8337 6.46056 11.4606 6.83366 11.0003 6.83366H1.00033Z" fill="white"></path>
                        </svg>
                    `);
                    setTimeout(() => messageBlock.style.display = 'none', 600);
                }
            });
        });
    }

    init() {
        this.bindTrigger();
    }
}