




const leftOutput = document.querySelector('.container-left');
const shoppingCart = document.querySelector('.shopping-cart');
const shoppingCartFooter = document.querySelector('.shopping-cart-footer');
const totalEl = document.getElementById('cart-total');

    
    


let itemList = [];
let itemsInCart = [];





class Item {
    constructor(name,price,description, sku) {
        this.name = name,
        this.price = price,
        this.description = description,
       
        this.sku = sku;
    }
}

class ItemInCart {
    constructor(name, sku, price, quantity) {
        this.name = name;
        this.sku = sku,
        this.price = price,
        this.quantity = quantity;
    }
}



class Storage {
    static initItems() {
        const kettleBell = new Item('35 Lb Kettle Bell', 53.99, '35Lb kettlebell to kettle bell swings and shit', 0);
        const tShirt = new Item('Onnit T-Shirt', 24.99, '50% Cotton/50% Polyester shirt for wearing. Short Sleeved', 1);
        const drillBits = new Item('Dewalt Drill Bit Set - 16 Piece', 15.99, 'Drill bits for your Dewalt 120v drill',2 )
        const impactDriver = new Item('Dewalt 120v Impact Driver - Brushless', 120.99, '120V impact driver to accompany your Dewalt 120v drill', 3);
        const oil = new Item('OW20 Synthetic Oil - 1 Quart', 17.99, 'Synthetic oil for your Honda Civic so you can change your own oil', 4);
        const camera = new Item('Blink XT2 Camera - Single Camera', 99.99, 'Outdoor security camera so you can keep track of riff raff outside your house', 5);
        const lumbarRoll = new Item('Lumbar Roll', 10.99, 'Mackenzie approved lumbar roll for your desk, car, or couch seating', 6)

        itemList.push( drillBits,kettleBell,tShirt,impactDriver,oil,camera,lumbarRoll)
    }


    static addItemToCart(sku) {
            const found = itemsInCart.some(item => item.sku === sku);

            if(found) {
                alert('Please select another item or update quantity if you would like more than one of this item')
            } else {
                itemList.forEach(item => {
                    if(item.sku == sku) {
                        const newCartItem = new ItemInCart(item.name, sku, item.price, 1);
                        itemsInCart.push(newCartItem);
                    }});
            }
        UI.updateCart();
    }

    static removeItemFromCart(sku) {
        itemsInCart.forEach((item, index) => {
            if(item.sku == sku) {
                itemsInCart.splice(index, 1)
            }
        })
        UI.updateCart();
    }
}




class UI {
  static updateStore() {
      itemList.forEach(item => {
          const newDiv = document.createElement('div');
          newDiv.classList.add('item-card');
          newDiv.setAttribute('id', `${item.sku}`);

          newDiv.innerHTML = `
          <div class="img-container"><img src="img/card${item.sku + 1}.jpg"></div>
          <p class="item-name" id="item-name">${item.name}</p>
          <div class="item-content">
              <p id="item-price">$${item.price}</p>
              <button class="btn btn-add" id="btn-add">Add To Cart</button>
          </div>
          <div class="item-description">
              ${item.description}
          </div>
        `;

        leftOutput.appendChild(newDiv);
      }) 
    }


    static updateCart() {
        shoppingCart.innerHTML = '';
        itemsInCart.forEach(item => {
            const newCartDiv = document.createElement('div');
            newCartDiv.classList.add('shopping-cart-item');
            newCartDiv.setAttribute('id', `${item.sku}`)
            newCartDiv.innerHTML = `
                <div class="item-details">
                    <img src="img/card${parseInt(item.sku) +1}.jpg" alt="">
                    <p class="item-name">${item.name}</p>
                    <p class="item-price" id="item-price-${item.sku}">$${item.price * item.quantity}</p>
                </div>
                <div class="item-modifiers">
                    <input type="number" value="${item.quantity}" id="item-quantity-${item.sku}">
                    <button class="btn btn-updateQ" id="btn-updateQ">Update Quantity</button>
                    <button class="btn btn-remove" id="btn-remove">Remove</button>
                </div>
            
            `;
            shoppingCart.appendChild(newCartDiv) 
        })
        UI.updateCartTotal();
        Buttons.initQuantBtns();
        Buttons.initRemoveBtns();
    }

    static updateCartTotal() {
        let totalCartValue = 0;
       itemsInCart.forEach(item => {
            let subTotal;
            subTotal = item.quantity * item.price;
            totalCartValue += subTotal;
       })

       totalEl.innerHTML = `$${totalCartValue.toFixed(2)}`
    }


    static updateItemQuantity(sku) {
        const itemQInCart = document.getElementById(`item-quantity-${sku}`).value;
        const itemPriceInCart = document.getElementById(`item-price-${sku}`);
        console.log(itemPriceInCart)
       
        itemsInCart.forEach(item => {
            if(item.sku == sku) {
                item.quantity = itemQInCart;

                itemPriceInCart.innerHTML = '$' + (item.price * itemQInCart).toFixed(2);
            }
        });
        UI.updateCartTotal();
    }

    
     
    
}


class Buttons {
    static initAddBtns() {
        addToCardBtns.forEach(btn => {
            btn.addEventListener('click', e => Storage.addItemToCart(e.target.parentElement.parentElement.id))
        });
    }

    static initQuantBtns() {
        const quantityBtns = document.querySelectorAll('#btn-updateQ');

        quantityBtns.forEach(btn => {
            btn.addEventListener('click', e => UI.updateItemQuantity(e.target.parentElement.parentElement.id))
        })

    }

    static initRemoveBtns() {
        const removeBtns = document.querySelectorAll('.btn-remove');

        removeBtns.forEach(btn => [
            btn.addEventListener('click', e => {
                Storage.removeItemFromCart(e.target.parentElement.parentElement.id)
            })
        ])
    }



}









Storage.initItems();
UI.updateStore();
const addToCardBtns = document.querySelectorAll('#btn-add');
Buttons.initAddBtns();



