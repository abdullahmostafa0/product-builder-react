export const productValidation = (product: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
}) => {
    const errors: {
        title: string;
        description: string;
        imageURL: string;
        price: string;
    } = {
        title: '',
        description: '',
        imageURL: '',
        price: ''
    }

    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);
    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = 'Title is required and should be between 10 and 50 characters long.'
    }
    if (!product.description.trim() || product.description.length < 20 || product.description.length > 200) {
        errors.description = 'Description is required and should be between 20 and 200 characters long.'
    }
    if(!product.imageURL.trim() || !validUrl) {
        errors.imageURL = 'Image URL is required and should be a valid URL.'
    }

    if(!product.price.trim() || isNaN(Number(product.price)) || Number(product.price) <= 0) {
        errors.price = 'Price is required and should be a positive number.'
    }

    return errors
}