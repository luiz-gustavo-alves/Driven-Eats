/* Inicializar arrays de produtos selecionados, tipos de produto e precos do produto */
let selectedProducts = [];
let productsPrices = [];
let productsType = [];

const main = document.querySelector(".main");

for (let i = 0; i < main.children.length; i++) { 
    productsType.push(main.children[i].className); 
    selectedProducts.push(null);
    productsPrices.push(0);
} 

function insertProductPrice(price) {

    const textList = price.split(" ");
    const parseText = textList[1].replace(",", ".");

    return parseText;
}

function calcProductsPrices() {

    let total = 0;

    for (let i = 0; i < productsPrices.length; i++) {
        total += productsPrices[i];
    }

    return total.toFixed(2);
}

function chooseProduct(selector) {

    let lastChosenProduct = null;

    for (let i = 0; i < selector.parentElement.children.length; i++) {

        /* Procura pelo ultimo item que foi selecionado de acordo com o tipo do produto */
        if (selector.parentElement.children[i].classList[1] == "chosen-product") {

            lastChosenProduct = selector.parentElement.children[i];
            break;
        }
    }

    /* Remove borda verde e check icon do ultimo item que foi selecionado */
    if (lastChosenProduct != null) {

        lastChosenProduct.classList.remove("chosen-product");
        lastChosenProduct.children[4].classList.add("disabled-check-icon");
        insertProductPrice(lastChosenProduct.children[3].innerText);
    }

    /* Adiciona borda verde e check icon do atual item selecionado */
    selector.classList.add("chosen-product");
    selector.children[4].classList.remove("disabled-check-icon");

    insertProduct(selector.parentElement.parentElement.className, selector.children[3].innerText, selector);
}

function insertProduct(productType, productPrice, selector) {

    const productIndex = productsType.indexOf(productType);

    selectedProducts[productIndex] = selector.children[1].innerText;
    productsPrices[productIndex] = Number(insertProductPrice(productPrice));

    checkBtn();
}

function checkBtn() {

    /* Verifica se o usuario selecionou todos os produtos antes de fechar pedido */
    if (!selectedProducts.includes(null)) {

       const orderBtn = document.querySelector(".order-button");

       orderBtn.removeAttribute("disabled");
       orderBtn.classList.add("finished-order");
       orderBtn.children[0].innerText = "Fechar pedido";
    }
}

function finishOrder() {

    let msg = `Olá, gostaria de fazer o pedido:\n`;

    msg += ` - Prato: ${selectedProducts[0]} %0a`;
    msg += ` - Bebida: ${selectedProducts[1]} %0a`;
    msg += ` - Sobremesa: ${selectedProducts[2]} %0a`;

    let total = calcProductsPrices().toString();
    total = total.replace(".", ",");

    msg += ` - Total: R$ ${total}`;

    window.open("https://wa.me/5599999999999?text=" + msg);
}