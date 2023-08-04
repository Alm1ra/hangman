const url = 'https://random-word-api.herokuapp.com/word?lang=en';
let currWord = '';
window.onload = function() {
    letterGrid();
}

function letterGrid() {
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    const letters = document.getElementById('grid-container');

    for(i of alphabet) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
        btn.id = 'alph-btn'
        letters.appendChild(btn);
    }
}

function makeWord(data) {
    let lettersNum = data.length;
    const word = document.getElementById('word');
    word.innerHTML = '';

    for(let i = 0; i < lettersNum; i++) {
        let h2 = document.createElement("h2");
        h2.innerHTML = '_';
        word.appendChild(h2);
    }
}

async function getWord(url) {
    const response = await fetch(url);
    let data = await response.json();
    let word = data[0].toUpperCase();
    currWord = word;
    console.log(currWord);
    makeWord(word);
}

window.addEventListener('DOMContentLoaded', (event) => {
    let genWord = false;
    const resetBtn = document.getElementById('reset');
    const letters = document.getElementById('grid-container');
    
    if(resetBtn) {
        resetBtn.addEventListener('click', function() {
            genWord = true;
           const alphButtons = document.querySelectorAll('#alph-btn');

            for(button of alphButtons) {
                button.style.color = '#747474';
            }
            getWord(url)
        });
    }

    letters.addEventListener('click', e => {
        const isButton = e.target.nodeName === 'BUTTON';
        if(!isButton) {return;}

        let char = e.target.textContent;
        let color = e.target.style.color;

        if(color !==  'rgb(255, 228, 0)' && genWord === true) {
            e.target.style.color = "#FFE400";
        }

        if(currWord.includes(char) && color !==  'rgb(255, 228, 0)' && genWord === true) {
                console.log("TRUEEEEEE");
        }
    })


})






