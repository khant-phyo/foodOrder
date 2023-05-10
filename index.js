import { menuArray } from "./data";

const containerEle = document.getElementById('container')

let containerInnerHtml = ``

menuArray.forEach(function(item){
  let ingredients = ``

  for (let ingredient of item.ingredients){
    ingredients += ingredient + ','
  }
  
  ingredients = ingredients.substring(0, ingredients.length-2)

  containerInnerHtml += `
  <div class="item" id="item">
    <p class="item-emoji">${item.emoji}</p>

    <div class="item-info">
        <p class="item-name">${item.name}</p>
        <p class="item-ingridients">${ingredients}</p>
        <p class="item-prize">${'$' + item.price}</p>
    </div>

    <button class="plus-btn" id="plus-btn" data-add="${item.id}">+</button>
  </div>
  <p class="devider"></p>`
})

containerEle.innerHTML = containerInnerHtml

let orderArray = []

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        orderArray.push(menuArray[e.target.dataset.add])
        document.getElementById('order-reciept').classList.remove('hidden')       
        renderOrder(orderArray)
    }
    
    else if (e.target.dataset.id){
        orderArray.splice(e.target.dataset.id, 1)
        if (orderArray.length != 0){
            renderOrder(orderArray)
        }
        else{
            document.getElementById('order-reciept').classList.add('hidden')
        }
    }
    
    else if (e.target.dataset.completeorder){
         document.getElementById('payment').classList.remove('hidden')
    }
    else if (e.target.dataset.paybtn){
        
        document.getElementById('payment').classList.add('hidden')
        document.getElementById('order-reciept').classList.add('hidden')
        document.getElementById('order-finished').classList.remove('hidden')        
    }
    
})

function renderOrder(array){
    let orderInnerHtml = ``
    let totalPrice = 0
    let orderIndex = 0
    for (let item of array){ 
        orderInnerHtml += `
                <div class="order-list" id="order-list">
                    <button class="remove-btn" id="remove-btn" data-id="${orderIndex}">-</button>
                    <p class="ordered-item" id="irdered-item">${item.name}</p>
                    <p class="prize" id="prize">${"$" + item.price}</p>
                </div>`
        totalPrice += item.price
        orderIndex++
    }
    document.getElementById('order').innerHTML = orderInnerHtml
    document.getElementById('total-price').innerText = '$' + totalPrice 
}
