
import pizzaImg01 from "../Images/pizza-margherita.jpg";
import pizzaImg02 from "../Images/pepperoni-pizza.jpg";
import burgerImg01 from "../Images/classic-burger.jpg";
import burgerImg02 from "../Images/veggie-burger.jpg";
import riceImg01 from "../Images/chicken-biryani.jpg";
import riceImg02 from "../Images/paneer-biryani.jpg";
import dessertImg01 from "../Images/chocolate-cake.jpg";
import dessertImg02 from "../Images/ice-cream.jpg";

import pizzaBanner from "../Images/hero-pizza.jpg";
import burgerBanner from "../Images/hero-burger.jpg";
import dessertBanner from "../Images/hero-dessert.jpg";

export const SliderData = [
  {
    id: 1,
    title: "Hot Pizza Deals",
    desc: "Get 50% off your first order on all pizzas!",
    cover: pizzaBanner,
    category: "pizza"
  },
  {
    id: 2,
    title: "Burger Bonanza",
    desc: "Buy one burger, get one free every Tuesday!",
    cover: burgerBanner,
    category: "burger"
  },
  {
    id: 3,
    title: "Sweet Treats",
    desc: "Desserts delivered fresh to your door.",
    cover: dessertBanner,
    category: "dessert"
  }
];


export const serviceData = [
  {
    icon: <ion-icon name="car"></ion-icon>,
    title: "Free Delivery",
    subtitle: "On all orders over $200",
    bg: "#fdefe6",
  },
  {
    icon: <ion-icon name="card"></ion-icon>,
    title: "Easy Payments",
    subtitle: "Multiple payment options",
    bg: "#ceebe9",
  },
  {
    icon: <ion-icon name="shield-half-outline"></ion-icon>,
    title: "Secure Checkout",
    subtitle: "Your data is safe with us",
    bg: "#e2f2b2",
  },
  {
    icon: <ion-icon name="headset"></ion-icon>,
    title: "24/7 Support",
    subtitle: "We’re here to help",
    bg: "#d6e5fb",
  },
];

export const products = [

  {
    id: "cheese pizza",
    productName: "Margherita Pizza",
    imgUrl: pizzaImg01,
    category: "pizza",
    price: 12.99,
    shortDesc: "Classic Margherita with mozzarella and basil",
    description: "Freshly baked Margherita pizza with tomato sauce, mozzarella, and fresh basil leaves.",
    reviews: [{ rating: 4.9, text: "Delicious and cheesy!" }],
    avgRating: 4.9,
  },
  {
    id: "pepperoni pizza",
    productName: "Pepperoni Pizza",
    imgUrl: pizzaImg02,
    category: "pizza",
    price: 13.99,
    shortDesc: "Loaded with pepperoni and cheese",
    description: "A customer favorite with a crispy crust, mozzarella, and spicy pepperoni.",
    reviews: [{ rating: 4.8, text: "A classic done right!" }],
    avgRating: 4.8,
  },
  {
    id: "cheese burger",
    productName: "Classic Cheeseburger",
    imgUrl: burgerImg01,
    category: "burger",
    price: 10.49,
    shortDesc: "Juicy beef patty with cheddar cheese",
    description: "Grilled to perfection with fresh lettuce, tomato, onion, and our signature sauce.",
    reviews: [{ rating: 4.7, text: "Tastes like homemade!" }],
    avgRating: 4.7,
  },
  {
    id: "veganburger",
    productName: "Vegan Burger",
    imgUrl: burgerImg02,
    category: "burger",
    price: 9.49,
    shortDesc: "Plant-based goodness",
    description: "A delicious vegan patty topped with avocado, lettuce, tomato, and dairy-free sauce.",
    reviews: [{ rating: 4.6, text: "Surprisingly tasty!" }],
    avgRating: 4.6,
  },
  {
    id: "chicken biryani",
    productName: "Chicken Biryani",
    imgUrl: riceImg01,
    category: "rice",
    price: 11.99,
    shortDesc: "Spicy rice with marinated chicken",
    description: "Aromatic basmati rice with tender chicken, spices, and fried onions.",
    reviews: [{ rating: 4.9, text: "Authentic flavor!" }],
    avgRating: 4.9,
  },
  {
    id: "panner biryani",
    productName: "Paneer Biryani",
    imgUrl: riceImg02,
    category: "rice",
    price: 10.99,
    shortDesc: "Vegetarian biryani with paneer cubes",
    description: "Fragrant rice dish cooked with spiced paneer, saffron, and herbs.",
    reviews: [{ rating: 4.8, text: "Great vegetarian option!" }],
    avgRating: 4.8,
  },
  {
    id: "chocolate cake",
    productName: "Chocolate Cake",
    imgUrl: dessertImg01,
    category: "dessert",
    price: 6.99,
    shortDesc: "Rich and moist chocolate cake",
    description: "Layers of chocolate sponge with creamy frosting. A dessert lover’s dream.",
    reviews: [{ rating: 5.0, text: "Heavenly dessert!" }],
    avgRating: 5.0,
  },
  {
    id: "vanilla ice cream",
    productName: "Vanilla Ice Cream",
    imgUrl: dessertImg02,
    category: "dessert",
    price: 4.99,
    shortDesc: "Creamy vanilla ice cream",
    description: "Classic vanilla made with real cream and vanilla beans.",
    reviews: [{ rating: 4.7, text: "Simple and perfect!" }],
    avgRating: 4.7,
  },
];

export const discoutProducts = products.slice(0, 3);
