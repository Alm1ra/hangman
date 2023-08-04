const url = 'https://random-word-api.herokuapp.com/word?lang=en';
window.onload = function() {
    letterGrid();
    //makeWord();
}

function letterGrid() {
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    const letters = document.getElementById('grid-container');

    for(i of alphabet) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
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
    console.log(data[0]);
    makeWord(data[0]);
}

window.addEventListener('DOMContentLoaded', (event) => {
    const wordBtn = document.getElementById('reset');
    
    if(wordBtn) {
        wordBtn.addEventListener("click", function() {
            getWord(url)
        });
    }
})






