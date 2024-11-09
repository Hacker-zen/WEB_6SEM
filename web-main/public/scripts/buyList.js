document.addEventListener('DOMContentLoaded', function () {
     if(document.location.href.includes('buyList')){
          loadItems();
     }
 });



 function addItem() {
     var itemInput = document.getElementById('itemInput');
     var itemText = itemInput.value.trim();

     if (itemText === '') {
         alert('Please enter an item.');
         return;
     }

     var items = getItems();
     items.push(itemText);
     saveItems(items);
     renderItems();
     itemInput.value = '';
     return false;
 }

 function removeItem(index) {
     var items = getItems();
     items.splice(index, 1);
     saveItems(items);
     renderItems();
 }

 function getItems() {
     var items = localStorage.getItem('items');
     return items ? JSON.parse(items) : [];
 }

 function saveItems(items) {
     localStorage.setItem('items', JSON.stringify(items));
 }

 function renderItems() {
     var items = getItems();
     var itemList = document.getElementById('buyList');
     itemList.innerHTML = '';

     items.forEach(function (item, index) {
         var li = document.createElement('li');
         li.innerHTML = `<span>${index + 1}. ${item}</span><button onclick="removeItem(${index})">X</button>`;
         itemList.appendChild(li);
     });
 }

 function loadItems() {
     renderItems();
 }

 const form = document.getElementById("buyListForm");
 form.addEventListener('submit', (event) => {
    addItem();
 });
