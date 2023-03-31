
function chooseProduct(selector) {
    
    let lastChosenProduct = null;
    for (let i = 0; i < selector.parentElement.children.length; i++) {

        if (selector.parentElement.children[i].classList.length > 1) {
            lastChosenProduct = selector.parentElement.children[i];
            break;
        }
    }

    if (lastChosenProduct != null) lastChosenProduct.classList.remove("chosen-product");
    selector.classList.add("chosen-product");
}