let selectedProducts = [null, null, null];
let productsType = [];

const main = document.querySelector(".main");
for (let i = 0; i < main.children.length; i++) {
    productsType.push(main.children[i].className);  
} 

function chooseProduct(selector) {

    let lastChosenProduct = null;
    for (let i = 0; i < selector.parentElement.children.length; i++) {

        if (selector.parentElement.children[i].classList[1] == "chosen-product") {
            lastChosenProduct = selector.parentElement.children[i];
            break;
        }
    }

    if (lastChosenProduct != null) {
        lastChosenProduct.classList.remove("chosen-product");
    }
    selector.classList.add("chosen-product");
    insertProductArray(selector.parentElement.parentElement.className, selector);
}

function insertProductArray(productType, selector) {

    const productIndex = productsType.indexOf(productType);
    selectedProducts[productIndex] = selector.children[1].innerText;
    console.log(selectedProducts);
    checkBtn();
}

function checkBtn() {

    if (!selectedProducts.includes(null)) {

       const orderBtn = document.querySelector(".order-button");
       orderBtn.classList.add("finished-order");
       orderBtn.children[0].innerText = "Fechar pedido"
    }
}