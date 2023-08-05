const url = 'https://random-word-api.herokuapp.com/word?lang=en';
const images = [
    'hangman_0.png',
    'hangman_1.png',
    'hangman_2.png',
    'hangman_3.png',
    'hangman_4.png',
    'hangman_5.png',
    'hangman_6.png',
    'hangman_7.png',
    'hangman_8.png',
    'hangman_9.png'
]
let currWord = '';
let disWord = '';
let hangCounter = -1;

window.onload = function() {
    letterGrid();
}

function replaceCharacter(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function letterGrid() {
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const letters = document.getElementById('grid-container');

    for(i of alphabet) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
        btn.id = 'alph-btn'
        letters.appendChild(btn);
    }
}

function makeWord(data) {
    let lettersNum = '_';
    
    for (let i = 1; i < data.length; i++) {
        lettersNum += '_';
    }
    disWord = lettersNum;
    return lettersNum;
}
function displayWord(data) {
    const word = document.getElementById('word');
    word.innerHTML = '';
    let h2 = document.createElement("h2");
    h2.innerHTML = data.split('').join(' ');
    word.appendChild(h2);
}

async function getWord(url) {
    const response = await fetch(url);
    let data = await response.json();
    let word = data[0].toUpperCase();
    currWord = word;
    console.log(word);
    displayWord(makeWord(word));
}

window.addEventListener('DOMContentLoaded', (event) => {
    let genWord = false;
    const resetBtn = document.getElementById('reset');
    const letters = document.getElementById('grid-container');
    
    if(resetBtn) {
        resetBtn.addEventListener('click', function() {
            genWord = true;
            const alphButtons = document.querySelectorAll('#alph-btn');
            hangCounter = -1;
            document.getElementById("hangman-img").src = '';
            overlay.style.display = "none";

            for(button of alphButtons) {
                button.style = '';
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
                
                for(let i = 0; i < currWord.length; i++) {
                    if(currWord[i] === char) {
                        disWord = disWord.substring(0, i) + char + disWord.substring(i + 1);
                    }
                }
                displayWord(disWord);        
        }

        if(!currWord.includes(char) && color !==  'rgb(255, 228, 0)' && genWord === true) {
            hangCounter++;
            document.getElementById("hangman-img").src = './img/' + images[hangCounter];
        }

        if(hangCounter >= 9) {
            overlay.style.display = "block";
            resetBtn.style.backgroundColor = '#14A76C';
            document.getElementById("overlay-text").innerHTML = "GAME OVER";
            document.getElementById("word").innerHTML = "";
        }

        if(!disWord.includes('_')) {
            overlay.style.display = "block";
            resetBtn.style.backgroundColor = '#14A76C';
            document.getElementById("overlay-text").innerHTML = "YOU WIN!";
            document.getElementById("word").innerHTML = "";
        }
    })
})






