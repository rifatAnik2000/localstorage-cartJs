
let cartStorage = []
const cartId = "__cart"
var store = JSON.parse(localStorage.getItem(cartId))
let targetEl = document.querySelector("#cart-view")
let targetTotal = document.querySelector(".subtotal")
let targetItem = document.querySelector(".subitem")



function addToCart(cartData) {
  let objItem = cartData;
  let objId = cartData.id

  if (store == null || typeof store == 'undefined') {
    staticPush(objItem)
    location.reload()
  } else {
    if (findData(objId)) {
      let objIndex = findIndex(objId)
      updateData(objIndex, objItem)
    } else {
      staticUpdate(objItem)
    }
  }
  renderView()
  cartView()
}

function staticPush(itemData) {
  let data = {
    id: itemData.id,
    quantity: itemData.quantity,
    name: itemData.name,
    price: itemData.price,
    unit: itemData.unit,
    image: itemData.image
  }
  cartStorage.push(data);
  localStorage.setItem(cartId, JSON.stringify(cartStorage))

}

function staticUpdate(itemData) {
  let data = {
    id: itemData.id,
    quantity: itemData.quantity,
    name: itemData.name,
    price: itemData.price,
    unit: itemData.unit,
    image: itemData.image
  }
  store.push(data);
  localStorage.setItem(cartId, JSON.stringify(store))
}

function findData(itemId) {
  const result = store.filter(x => x.id == itemId);
  if (result.length == 1) {
    return true
  } else {
    return false
  }
}
function findQty(itemId) {
  const result = store.find(x => x.id == itemId);

  if (result) {
    return result.quantity;    
  }else{
    return false
  }

}
function findIndex(itemId) {
  var index = store.findIndex((obj => obj.id == itemId))
    return index

}
function updateData(objIndex, objItem) {
  store[objIndex].quantity = store[objIndex].quantity + objItem.quantity
  localStorage.setItem(cartId, JSON.stringify(store))
}
function addData(itemId) {
  let objIndex = findIndex(itemId)
    store[objIndex].quantity = store[objIndex].quantity + 1
    localStorage.setItem(cartId, JSON.stringify(store))
    cartView()
    renderQty()
// pmView()

}
function qtyHelper(id) {

  let btnDiv= document.querySelector(`.cartPM_${id}`);
    let bagDiv= document.querySelector(`.cartBtn_${id}`);
    btnDiv.classList.add("hideEL");
    bagDiv.classList.remove("hideEL");
}
function dltData(itemId) {
  if (findQty(itemId) == 1 || findQty(itemId) == 0) {

    removeData(itemId)
  } else{
    let objIndex = findIndex(itemId)
    console.log(objIndex)
    store[objIndex].quantity = store[objIndex].quantity - 1;
    localStorage.setItem(cartId, JSON.stringify(store))
  }
  cartView()
  renderQty()
}
function removeData(itemId) {
  qtyHelper(itemId)
  let objIndex = findIndex(itemId)
  store.splice(objIndex, 1)
  localStorage.setItem(cartId, JSON.stringify(store))

  cartView()
  renderQty()

}

function cartView() {
  let itemTotalPrice = 0;
  let itemTotalQty = 0;
  targetEl.innerHTML = "";
  store.map((item) => {
    targetEl.innerHTML += `
    <div class="cart-bar__item position-relative d-flex">
    <div class="thumb">
        <img src="${item.image}" alt="image_not_found">
    </div>
    <div class="content">
        <h4 class="title">
            <a href="#0">${item.name}</a>
        </h4>
        <span class="price">$ ${item.price}</span>
        <button onclick="removeData(${item.id})" class="remove"><i class="fal fa-times"></i></button>
    </div>
</div>`;
    itemTotalPrice += item.price * item.quantity
    itemTotalQty += item.quantity


  });
  targetTotal.innerHTML = itemTotalPrice
  targetItem.innerHTML = itemTotalQty
}

function renderView() {
let  tItems =  store.filter(items => items.quantity>= 1 )
tItems.map(item =>{
  let btnDiv= document.querySelector(`.cartPM_${item.id}`);
    let bagDiv= document.querySelector(`.cartBtn_${item.id}`);
    btnDiv.classList.remove("hideEL");
    bagDiv.classList.add("hideEL");
})
}
function renderQty() {
  store.map(item=>{
    // console.log(item.quantity);
    document.querySelector(`#cartValue_${item.id}`).value = item.quantity
  })


}
// pmView()
cartView()
renderView()
renderQty()
