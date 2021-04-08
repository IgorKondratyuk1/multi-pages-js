export default class Form {
    constructor(forms, url) {
        this.forms = document.querySelectorAll(forms);
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо. Мы с вами скоро свяжемся!',
            failure: 'Что-то пошло не так...'
        };
        this.path = url;
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    checkMailInputs() {
        const txtInputs = document.querySelectorAll('[type="email"]');
    
        txtInputs.forEach(item => {
            item.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            }
            else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            }
            else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    init() {
        this.checkMailInputs();
        this.initMask();
        
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                let formData = new FormData(form);
                
                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(err => {
                        console.error(err);
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        form.reset();
                        setTimeout(() => statusMessage.remove(), 5000);
                    });
                
            });
        });
    }
}

// export default class Form {
//     constructor(formParent, url) {
//         this.url = url;
//         this.formParent = document.querySelector(formParent);
//         this.form = this.formParent.querySelector('form');
//         this.sendBtn = this.form.querySelector('button');
//         this.inputs = this.form.querySelectorAll('input');
//         this.select = this.form.querySelectorAll('select');
//     }

//     checkInputs() {
//         this.inputs.forEach(input => {
//             console.log(input.value);
//             let ind = false;
//             if (input.value == '') {
//                 ind = true;
//                 return ind;
//             }
//             else {
//                 ind = false;
//                 return ind;
//             }
//         });
//     }

//     collectData() {
//         this.sendBtn.addEventListener('click', (e) => {
//             e.preventDefault();

//             if (this.checkInputs()) {
//                 let formData = new FormData(this.form);
//                 // for (let [key, value] of formData.entries()) {
//                 //     console.log(`${key}: ${value}`);
//                 // }
    
//                 this.postData(formData, this.url)
//                 .then(response => {
//                     console.log(response);
//                 })
//                 .catch(err => console.error(err));
//             }
//             else {
//                 alert('Complite all form');
//             }
//         });
//     }

//     async postData(data, url) {
//         const fetchResp = await fetch( `${url}`, {
//             method: 'POST',
//             body: data
//         });

//         if (!fetchResp.ok) {
//             console.log(`Could not fetch: ${this.url}, error status ${fetchResp.status}`);
//         }
        
//         return await fetchResp.text();
//     }

//     init() {
//         // console.log(this.form,
//         // this.sendBtn,
//         // this.inputs,
//         // this.select);

//         this.collectData();
//     }
// }