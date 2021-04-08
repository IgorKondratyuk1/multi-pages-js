export default class Download {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';
    }

    downloadItem(path) {
        const element = document.createElement('a');

        element.setAttribute('href', path);
        element.setAttribute('download', 'nice_picture');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadItem(this.path);
            });
        });
    }
}