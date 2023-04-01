/* Inicializar arrays de produtos selecionados, tipos de produto e precos do produto. */
const selectedProducts = [];
const productsPrices = [];
const productsType = [];

let totalProductsPrices = 0;

/*  Flag para impedir que o cliente modifique a seleção dos produtos enquanto
 *  a caixa de confirmação dos produtos estiver ativa.
 */
let finishingOrder = false;

const main = document.querySelector(".main");
for (let i = 0; i < main.children.length; i++) { 

    selectedProducts.push(null);
    productsPrices.push(0);
    productsType.push("." + main.children[i].className); 
} 

function parseProductPrice(price, inverseParser) {

    price = price.toString();
    
    let parser;
    if (price.includes(" ")) {

        parser = price.split(" ");
        parser = parser[1];
    }  
    else {
        
        parser = price;
    }

    return inverseParser ? parser.replace(".", ",") : parser.replace(",", ".");
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

        /* Remove borda verde e check icon do ultimo item do tipo do produto selecionado. */
        if (lastChosenProduct != null) {
    
            lastChosenProduct.classList.remove("chosen-product");
            lastChosenProduct.children[4].classList.add("hidden");
        }
    
        /* Adiciona borda verde e check icon do atual item selecionado. */
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
    productsPrices[productIndex] = Number(parseProductPrice(productPrice, false));

    checkButton();
}

function checkButton() {

    /* Verifica se o usuario selecionou todos os produtos e calcula o preço total antes de fechar pedido. */
    if (!selectedProducts.includes(null)) {

       const orderBtn = document.querySelector(".order-button");

       orderBtn.removeAttribute("disabled");
       orderBtn.classList.add("finished-order");
       orderBtn.children[0].innerText = "Fechar pedido";

       totalProductsPrices =  calcProductsPrices();
    }
}

function confirmationOrder() {

    /* Exibe caixa de confirmação de pedido. */

    finishingOrder = true;

    const pageContent = document.querySelector(".page-content");
    const confirmationBox = document.querySelector(".confirmation-order-container");
    const orderBtn = document.querySelector(".order-button");
    
    pageContent.classList.add("opacity");
    confirmationBox.classList.remove("hidden");
    orderBtn.setAttribute("disabled", "disabled");

    const products = document.querySelector(".selected-products");
    for (let i = 0; i < products.children.length - 1; i++) {

        const product = products.children[i];
        const price = productsPrices[i].toFixed(2);

        product.children[0].innerText = selectedProducts[i];
        product.children[1].innerText = parseProductPrice(price, true);
    }

    const totalPrice = document.querySelector(".total-price");
    totalPrice.children[1].innerText = `RS ${parseProductPrice(totalProductsPrices, true)}`;
}

function resetOpacity() {

    finishingOrder = false;

    const pageContent = document.querySelector(".page-content");
    const confirmationBox = document.querySelector(".confirmation-order-container");
    const orderBtn = document.querySelector(".order-button");

    pageContent.classList.remove("opacity");
    confirmationBox.classList.add("hidden");
    orderBtn.removeAttribute("disabled");
}

function nameAdressPrompt() {

    resetOpacity();

    let username = prompt("Digite seu nome: ");
    let address = prompt("Digite seu endereço: ");

    if (username == null) username = "";
    if (address == null) address = "";

    finishOrder(username, address);
}

function finishOrder(username, address) {

    let msg = `Olá, gostaria de fazer o pedido:\n`;

    msg += `- Prato: ${selectedProducts[0]}\n`;
    msg += `- Bebida: ${selectedProducts[1]}\n`;
    msg += `- Sobremesa: ${selectedProducts[2]}\n`;
    msg += `Total: R$ ${parseProductPrice(totalProductsPrices, true)}\n\n`;
    msg += `Nome: ${username}\n`
    msg += `Endereço: ${address}\n`

    window.open("https://wa.me/5599999999999?text=" + (encodeURIComponent(msg)));
}