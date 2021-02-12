//Function for filtering the products based on text input
function filter(input, products) {
    let filteredData = [];
    products.forEach((product) => {
        if(product.name.toLowerCase()[0] == input.toLowerCase()[0] && product.name.toLowerCase().includes(input.toLowerCase())){
            filteredData.push(product);
        }
    })
    return filteredData.slice(0,6);
}
export default filter;