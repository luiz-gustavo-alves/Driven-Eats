/* Inicializar arrays de produtos selecionados, tipos de produto e precos do produto */
let selectedProducts = [];
let productsPrices = [];
let productsType = [];

let totalProductsPrices = 0;
let finishingOrder = false;

const main = document.querySelector(".main");
for (let i = 0; i < main.children.length; i++) { 

    selectedProducts.push(null);
    productsPrices.push(0);
    productsType.push("." + main.children[i].className); 
} 

function parseProductPrice(price) {

    const parser = price.split(" ");
    return parser[1].replace(",", ".");
}

function calcProductsPrices() {

    let total = 0;
    for (let i = 0; i < productsPrices.length; i++) {

        total += productsPrices[i];
    }
    return total.toFixed(2);
}

function chooseProduct(productType, selector) {

    if (!finishingOrder) {

        const lastChosenProduct = document.querySelector(productType + " .chosen-product");

        /* Remove borda verde e check icon do ultimo item do tipo do produto selecionado */
        if (lastChosenProduct != null) {
    
            lastChosenProduct.classList.remove("chosen-product");
            lastChosenProduct.children[4].classList.add("hidden");
        }
    
        /* Adiciona borda verde e check icon do atual item selecionado */
        selector.classList.add("chosen-product");
        selector.children[4].classList.remove("hidden");
    
        const selectedProduct = document.querySelector(productType + " .chosen-product" + " h3").innerText;
        const productPrice = document.querySelector(productType + " .chosen-product" + " .price").innerText;
        
        insertProduct(productType, selectedProduct, productPrice);
    }
}

function insertProduct(productType, selectedProduct, productPrice) {

    const productIndex = productsType.indexOf(productType);

    selectedProducts[productIndex] = selectedProduct;
    productsPrices[productIndex] = Number(parseProductPrice(productPrice));

    checkButton();
}

function checkButton() {

    /* Verifica se o usuario selecionou todos os produtos antes de fechar pedido */
    if (!selectedProducts.includes(null)) {

       const orderBtn = document.querySelector(".order-button");

       orderBtn.removeAttribute("disabled");
       orderBtn.classList.add("finished-order");
       orderBtn.children[0].innerText = "Fechar pedido";

       totalProductsPrices = (calcProductsPrices().toString()).replace(".", ",");
    }
}

function confirmationOrder() {

    finishingOrder = true;

    const pageContent = document.querySelector(".page-content");
    pageContent.classList.add("opacity");

    const orderBtn = document.querySelector(".order-button");
    orderBtn.setAttribute("disabled", "disabled");

    const confirmationBox = document.querySelector(".confirmation-order-container");
    console.log(confirmationBox);
    confirmationBox.classList.remove("hidden");
}

function nameAdressPrompt() {

    let username = prompt("Digite seu nome: ");
    let address = prompt("Digite seu endereço: ");

    if (username == null) username = "";
    if (address == null) address = "";

    finishOrder(username, address);
}

function finishOrder(username, address) {

    let msg = `Olá, gostaria de fazer o pedido: `;

    msg += `- Prato: ${selectedProducts[0]} `;
    msg += `- Bebida: ${selectedProducts[1]} `;
    msg += `- Sobremesa: ${selectedProducts[2]} `;
    msg += `Total: R$ ${totalProductsPrices} `;
    msg += ``
    msg += `Nome: ${username} `
    msg += `Endereço: ${address} `

    window.open("https://wa.me/5599999999999?text=" + msg);
}