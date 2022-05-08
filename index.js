const display = document.querySelector('.body__textarea');

// display.value = 'Hello';

const keys = document.querySelector('.keyboard');

keys.addEventListener('click', (event) => {
    
    console.log(event.target.dataset.code);

    const {target} = event;
    if (!target.dataset.code) {
        return;
    }
    display.value += target.dataset.code;
});