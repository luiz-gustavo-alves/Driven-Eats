

function chooseProduct(selector) {

    const lastChosenProduct = document.querySelector(".chosen-product");

    if (lastChosenProduct != null) {
        lastChosenProduct.classList.remove("chosen-product");
    }

    console.log(selector.classList);
    selector.classList.add("chosen-product");
}