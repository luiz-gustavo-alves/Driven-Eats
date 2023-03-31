
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
}