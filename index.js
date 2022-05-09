//получение значения из localStorage о выбранном языке
if (localStorage.getItem('lang') === null) {
    localStorage.setItem('lang', 'en');
};


//компонент Kyeboard 

const Keyboard = {
    elements:
    {
        container: null,
        title: null,
        titleText: null,
        textarea: null,
        keyboard: null,
        keyboardRow: null,
        keys: [],
        description: null,
        descriptionText: null,
        options: null,
        optionsText: null,
    },

    properties: {
        value: '',
        capsLock: false,
        lang: 'eng',
    },

    init() {

        //Create elements
        this.elements.container = document.createElement('div');
        this.elements.title = document.createElement('h1');
        this.elements.titleText = document.createTextNode('RSS project: Virtual Keyboard');
        this.elements.textarea = document.createElement('textarea');
        this.elements.keyboard = document.createElement('div');
        this.elements.description = document.createElement('p');
        this.elements.descriptionText = document.createTextNode("This keyboard was created in Windows OS.");
        this.elements.options = document.createElement('p');
        this.elements.optionsText = document.createTextNode("To change the language, use the key combinations:  Ctrl+Alt");        


        //Adding classes and attributes for elements
        this.elements.container.classList.add('container');
        this.elements.title.classList.add('title');
        this.elements.textarea.classList.add('body__textarea');
        this.elements.textarea.setAttribute('id', 'textarea');
        this.elements.textarea.setAttribute('placeholder', "Welcome to use my Virtual Keyboard...");
        this.elements.keyboard.classList.add('keyboard');
        this.elements.keyboard.setAttribute('id', 'keyboard');
        this.elements.description.classList.add('description');
        this.elements.options.classList.add('options');


        //Adding elements to DOM
        document.body.appendChild(this.elements.container);
        this.elements.title.appendChild(this.elements.titleText);
        this.elements.container.appendChild(this.elements.title);
        this.elements.container.appendChild(this.elements.textarea);
        this.elements.container.appendChild(this.elements.keyboard);
        this.elements.description.appendChild(this.elements.descriptionText);
        this.elements.container.appendChild(this.elements.description);
        this.elements.options.appendChild(this.elements.optionsText);
        this.elements.container.appendChild(this.elements.options);
    },

    createKeys() {

        const fragment = document.createDocumentFragment();

        const keys = {
            en: keyLayoutEn,
            ru: keyLayoutRu,
        };

        const keyLayoutEn = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
            'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', "\\", 'Del',
            'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
            'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
            'Ctrl', 'Fn', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl',
        ];

        const keyLayoutRu = [
            'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
            'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', "\\", 'Del',
            'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э", 'Enter',
            'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
            'Ctrl', 'Fn', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl',
        ];


        const dataCode = [
            'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
            'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
            'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', "Quote", 'Enter',
            'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Dot', 'Slash', 'ArrowUp', 'ShiftRight',
            'CtrlLeft', 'Fn', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'CtrlRight',
        ];

        const shiftEn = {

            Backquote: '~',
            Digit1: '!',
            Digit2: '@',
            Digit3: '#',
            Digit4: '$',
            Digit5: '%',
            Digit6: '^',
            Digit7: '&',
            Digit8: '*',
            Digit9: '(',
            Digit0: ')',
            Minus: '_',
            Equal: '+',
            BracketLeft: '{',
            BracketRight:'}',
            Backslash: '|',
            Semicolon: ':',
            Quote: '"',
            Comma: '<',
            Dot: '>', 
            Slash: '?', 
        };

        const shiftRu = {

            Backquote: 'Ё',
            Digit1: '!',
            Digit2: '"',
            Digit3: '№',
            Digit4: ';',
            Digit5: '%',
            Digit6: ':',
            Digit7: '?',
            Digit8: '*',
            Digit9: '(',
            Digit0: ')',
            Minus: '_',
            Equal: '+',
            BracketLeft: 'Х',
            BracketRight:'Ъ',
            Backslash: '/',
            Semicolon: 'Ж',
            Quote: 'Э',
            Comma: 'Б',
            Dot: 'Ю', 
            Slash: ',', 
        };

        //set keyboard

        const setKeyboard = () => {
            const lang = localStorage.getItem('lang');
            keys[lang].forEach((key, index) => {
                const keyElement = document.createElement('div');


                //Adding classes and attributes for elements
                keyElement.setAttribute('data-code', dataCode[index]);
                keyElement.innerText = keyLayoutEn[index];

                keyElement.classList.add('keyboard__key');

                switch (key) {
                    case 'Backspace':
                        keyElement.classList.add('keyboard-backspace');
                        
                        break;
                
                    default:
                        keyElement.textContent = key.toLowerCase();
                        break;
                }

                fragment.appendChild(keyElement);
                
            });

            
        }

    },
}


window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
});







//Test

const display = document.querySelector('.body__textarea');

const keys = document.querySelector('.keyboard');

keys.addEventListener('click', (event) => {
    
    // console.log(event.target.dataset.code);

    const {target} = event;
    if (!target.dataset.code) {
        return;
    }
    display.value += target.dataset.code;
});