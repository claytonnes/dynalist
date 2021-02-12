export default function sort(order, listItems) {
    let sortedArr = [];

    //Iterates over every category and filters out the products with category.key === listItem.product.cId
    //Then concatenates it to sortedArray. Resulting in a sorted array of listItems.
    order.forEach((category) => {
        sortedArr = sortedArr.concat(listItems.filter((listItem) => {
            return listItem.product.cId === category.key;
        }));
    })

    console.log(sortedArr);
    return sortedArr;
}