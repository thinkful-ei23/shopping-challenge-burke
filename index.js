//copied code

//user stories

// User can press a switch/checkbox to toggle between displaying all items or displaying only items that are unchecked
//completed

// User can type in a search term and the displayed list will be filtered by item names only containing that search term
//completed, but I don't have a back button
// User can edit the title of an item
//completed, but it requires clicking away from item
const STORE = {
  items: [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
  ],
  displayOnlyUnchecked: false,
  searchName: ''
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span contenteditable="true" class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : '' }">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join("");
}

function renderShoppingList() {
   // render the shopping list in the DOM
   console.log('`renderShoppingList` ran');
   let filteredList = [ ...STORE.items ];
   if (STORE.displayOnlyUnchecked === true && STORE.searchName === '') {
      filteredList = filteredList.filter(element => element.checked === false)
   }
   if (STORE.searchName !== '') {
    console.log("in search filter list");     
    filteredList = filteredList.filter(element => element.name === STORE.searchName);
   }
   // if searching === true
    // iterate through each item, adding it to filteredList if it is the search term 
   const shoppingListItemsString = generateShoppingItemsString(filteredList);
  
   // insert that HTML into the DOM
   $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}
//end copied code

//begin written code

function deleteSelectedListItem(itemIndex) {
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteSelectedListItem(itemIndex);
    renderShoppingList();
  });
}

function changeToggleStatus() {
  STORE.displayOnlyUnchecked = ! STORE.displayOnlyUnchecked;
  console.log('changeToggleStatus is running');
}
 
function handleToggleUncheckedItems() {
  $('.js-all-items-toggle').click(event => {
    console.log('`handleToggleUncheckedItems ran');
    changeToggleStatus();
    // change our handleToggleUncheckedItems to true or false
    renderShoppingList();
});
}

function changeWhatToSearch(word) {
  console.log("in change what to search")
  STORE.searchName = word;
}

function toggleBackButton() {
  $('.js-search-back').hasClass('hide') ? $('.js-search-back').removeClass('hide') : $('.js-search-back').addClass('hide'); 
}

function handleNewSearch() {
  $('#js-search-form').submit(function(event) {
    console.log("in handle new search")
    event.preventDefault();
    const searchName = $('.js-search-list').val();
    console.log(searchName);
    $('.js-search-list').val('');
    changeWhatToSearch(searchName);
    renderShoppingList();
    toggleBackButton();
  });
}

function handleBackButton() {
  $('.js-search-back').submit(function(event) {
    event.preventDefault();
    changeWhatToSearch('');
    toggleBackButton();
    renderShoppingList();
  });
}


//start copied code

// This function will intially call renderShoppingList and our other handler functions, which will
// in turn call the change data function, which will call the render function.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleUncheckedItems();
  handleNewSearch();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);










//copied code end

/*Requirements
In terms of user experience, your shopping list app must allow users to:

enter items they need to purchase by entering text and hitting "Return" or clicking the "Add item" button
check and uncheck items on the list by clicking the "Check" button
permanently remove items from the list
Additionally:

You must use a CDN-hosted version of jQuery
Put your application code in a file called index.js and link to it in index.html
Be sure to put both script elements at the bottom of the <body> element.
Do not alter index.html or main.css other than adding the links to the external JavaScript inside index.html. 
Write JavaScript code that works with the existing HTML and CSS to implement the required features.
Hint: you may find it helpful to read up on and use the following jQuery methods: 
.submit(), preventDefault(), toggleClass(), and closest().*/

/*
'use strict'; 
/* global $ 
function main() {
  function createNewListItem() {
    $('#js-shopping-list-form').submit(event => {
      // this stops the default form submission behavior
      event.preventDefault();
      
      const userText = $('.js-shopping-list-entry').val();
      $('.shopping-list').append(`
        <li>
          <span class="shopping-item">${userText}</span>
          <div class="shopping-item-controls">
            <button class="shopping-item-toggle">
              <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete">
              <span class="button-label">delete</span>
            </button>
          </div>
        </li>
      `); 
    });
  }

  function toggle () {
    $('ul').on('click', '.shopping-item-toggle', function(event){
      const theElementweWant = $(this).closest('li').find('.shopping-item');
      $(theElementweWant).toggleClass('shopping-item__checked');
    });
  }

  //permanently remove items from the list
  function deleteItems () {
    $('ul').on('click', '.shopping-item-delete', function(event){  
      const theElementToDelete = $(this).closest('li');
      $(theElementToDelete).remove();
    });
  }
  createNewListItem();
  toggle();
  deleteItems();
}

$(main);*/