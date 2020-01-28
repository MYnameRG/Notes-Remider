var cardArray = [];
var cardId = 0;
var bool = 0;

var parent = document.getElementById("note");

var p = document.createElement("p");

if (JSON.parse(localStorage.getItem('card')).length == 0) {
  p.appendChild(document.createTextNode("Click on 'Add to Note' button."));
  parent.appendChild(p);
}

document.getElementById("Add Note").addEventListener("click", function(e) {
  e.preventDefault();
  if(bool == 0)
  {
      parent.removeChild(p);
      bool++;
  }
});

document.getElementById("search").addEventListener("input", function(e) {
  var value1 = document.getElementById("search").value;
  var card = document.getElementsByClassName("card");
  Array.from(card).forEach(function(element) {
    if (
      element
        .getElementsByClassName("card-text")[0]
        .innerText.includes(value1.toLowerCase())
    ) {
      element.style.display = "inline-block";
    } else {
      element.style.display = "none";
    }
  });
});

if (localStorage.getItem("card") == null) {
  addToStorage(cardArray);
}

function createCard() {
  var notes = document.getElementById("textarea").value;
  var cardObj = new Object({ value: notes, id: cardId });

  var card = document.createElement("div");
  card.id = cardId;
  card.className = "card";
  card.style.width = "18rem";
  card.style.float = "left";
  card.style.margin = "20px";

  var h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.appendChild(document.createTextNode(`Note ${cardId + 1}`));

  var body = document.createElement("div");
  body.className = "card-body";

  var text = document.createElement("p");
  text.className = "card-text";
  text.appendChild(document.createTextNode(notes));

  var button = document.createElement("button");
  button.innerHTML = "Delete Node";
  button.className = "btn btn-primary";
  button.setAttribute("onclick", "deleteCard()");

  card.appendChild(body);
  body.appendChild(h5);
  body.appendChild(text);
  body.appendChild(button);
  parent.appendChild(card);

  addToCardArray(cardObj);
  cardId++;
}

function addToCardArray(cardObj) {
  var json = localStorage.getItem("card");
  var array = JSON.parse(json);
  array.push(cardObj);
  addToStorage(array);
}

function addToStorage(cardArray) {
  var card = JSON.stringify(cardArray);
  localStorage.setItem("card", card);
}

function fromLocalStorage() {
  var json = localStorage.getItem("card");
  var array = JSON.parse(json);
  cardArray = array;
  for (i = 0; i < array.length; i++) {
    pasteToDOM(array[i]);
  }
}

function pasteToDOM(cardObj) {
  var card = document.createElement("div");
  card.id = cardObj.id;
  card.className = "card";
  card.style.width = "18rem";
  card.style.float = "left";
  card.style.margin = "20px";

  var h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.appendChild(document.createTextNode(`Note ${cardObj.id + 1}`));

  var body = document.createElement("div");
  body.className = "card-body";

  var text = document.createElement("p");
  text.className = "card-text";
  text.appendChild(document.createTextNode(cardObj.value));

  var button = document.createElement("button");
  button.innerHTML = "Delete Node";
  button.className = "btn btn-primary";
  button.setAttribute("onclick", "deleteCard()");

  card.appendChild(body);
  body.appendChild(h5);
  body.appendChild(text);
  body.appendChild(button);
  parent.appendChild(card);

  cardId++;
}

function deleteCard() {
  var card = event.target.parentNode.parentNode;
  parent.removeChild(card);
  deleteArrayItem(card);
}

function deleteArrayItem(card) {
  var id = card.getAttribute("id");
  var json = localStorage.getItem("card");
  var array = JSON.parse(json);
  if(array.length == 1){
    parent.appendChild(p);
    bool--;      
  }
  for (i = 0; i < array.length; i++) {
    if (id == array[i].id) {
      array.splice(i, 1);
    }
  }
  var card = JSON.stringify(array);
  localStorage.setItem("card", card);
}
