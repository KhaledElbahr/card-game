let cards_box = document.querySelector(".cards-box");
let replayBtns = document.querySelectorAll(".replay");
let hint = document.querySelector("#hint");
let count_hints = document.querySelector("#count_hints");
let celebrate = document.querySelector(".celebrate-content");
let hintCount = 3;
count_hints.innerText = hintCount;
let cardsNum = 16;
let duration = 500;
let won = false;
let cards = [];

// Card Class
class Card {
  img_src;
  data_num;
  constructor(imgSrc, dataNum) {
    this.img_src = imgSrc;
    this.data_num = dataNum;
  }
}

let imgs = [
  "aquarium",
  "bat",
  "butterfly",
  "crab",
  "dog",
  "drink",
  "muscle",
  "santa",
];

for (let i = 0; i < 16; i++) {
  cards.push(new Card(`./images/${imgs[i]}-icon.png`, i + 1));
  cards.push(new Card(`./images/${imgs[i]}-icon.png`, i + 1));

  let card = cards[i];
  cards_box.innerHTML += `<div class="card" data-number="${card.data_num}">
        <div class="card-inner">
            <div class="front-face"></div>
            <div class="back-face">
                <img src="${card.img_src}" class="back_img" alt="" />
            </div>
        </div>
    </div>`;
}

let cardList = [...cards_box.children];

// Generate random array in specific range
function shuffle(keys) {
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }
  return keys;
}

// add random order to cards
cardList.forEach((card, index) => {
  let orderRange = [...cards.keys()];
  let shuffledOrder = shuffle(orderRange);
  card.style.order = shuffledOrder[index];
  card.addEventListener("click", () => flipCard(card));
});

//flip card
function flipCard(card) {
  card.classList.add("rotated");
  let rotatedCards = [...document.getElementsByClassName("rotated")];
  if (rotatedCards.length == 2) {
    checkMatchCards(...rotatedCards);
  }
}

//check match
function checkMatchCards(card1, card2) {
  if (card1.dataset.number == card2.dataset.number) {
    card1.classList.remove("rotated");
    card2.classList.remove("rotated");
    card1.classList.add("flipped");
    card2.classList.add("flipped");
    let flippedCardsNum = [...document.getElementsByClassName("flipped")]
      .length;
    if (flippedCardsNum == cardsNum) {
      celebrate.style.display = "flex";
      won = true;
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("rotated");
      card2.classList.remove("rotated");
    }, duration);
  }
}

// hint button event listner
hint.addEventListener("click", () => {
  let flipped = [...document.getElementsByClassName("rotated")];
  let notFlipped = [...document.getElementsByClassName("card")];
  flipped.forEach((card) => {
    card.classList.remove("rotated");
  });
  notFlipped.forEach((card) => {
    if (hintCount > 0) {
      card.classList.add("rotated");
      setTimeout(() => {
        card.classList.remove("rotated");
      }, duration);
    }
  });
  hintCount--;
  if (hintCount >= 0) {
    count_hints.innerText = hintCount;
  }
  if (hintCount == 0) {
    hint.style.disabled = true;
    hint.style.color = "#ddd";
  }
});

// Replay buttons event
replayBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    hintCount = 3;
    count_hints.innerText = hintCount;
    hint.style.disabled = false;
    hint.style.color = "#000";
    cardList.forEach((card) => {
      card.classList.remove("flipped");
    });
    if (won) {
      celebrate.style.display = "none";
    }
  });
});
