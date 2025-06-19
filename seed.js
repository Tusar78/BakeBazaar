const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Sample Products
    const products = [
      {
        name: "Chocolate Fudge Cake",
        description:
          "Rich and moist chocolate cake layered with velvety fudge and topped with chocolate ganache. Perfect for birthdays and special occasions.",
        price: 550,
        image: "https://via.placeholder.com/500x375?text=Chocolate+Cake",
        category: "Cake",
      },
      {
        name: "Red Velvet Cake",
        description:
          "Classic red velvet layered cake with cream cheese frosting. Soft, moist, and visually stunning — a showstopper dessert.",
        price: 600,
        image: "https://via.placeholder.com/500x375?text=Red+Velvet+Cake",
        category: "Cake",
      },
      {
        name: "Black Forest Cake",
        description:
          "Layers of chocolate sponge cake with whipped cream and cherries. A German classic loved worldwide.",
        price: 580,
        image: "https://via.placeholder.com/500x375?text=Black+Forest+Cake",
        category: "Cake",
      },
      {
        name: "Classic White Bread",
        description:
          "Soft and fluffy white bread loaf, perfect for sandwiches and daily breakfast.",
        price: 80,
        image: "https://via.placeholder.com/500x375?text=White+Bread",
        category: "Bread",
      },
      {
        name: "Whole Wheat Bread",
        description:
          "Healthy whole wheat bread rich in fiber. Ideal for a nutritious diet.",
        price: 90,
        image: "https://via.placeholder.com/500x375?text=Wheat+Bread",
        category: "Bread",
      },
      {
        name: "Chocolate Éclair",
        description:
          "A classic pastry filled with vanilla cream and topped with rich chocolate icing.",
        price: 120,
        image: "https://via.placeholder.com/500x375?text=Chocolate+Eclair",
        category: "Pastry",
      },
      {
        name: "Strawberry Danish",
        description:
          "Flaky pastry filled with cream cheese and fresh strawberries.",
        price: 140,
        image: "https://via.placeholder.com/500x375?text=Strawberry+Danish",
        category: "Pastry",
      },
      {
        name: "Cheese Burst Pizza",
        description:
          "Loaded with mozzarella and cheddar cheese for an unforgettable cheesy experience.",
        price: 750,
        image: "https://via.placeholder.com/500x375?text=Cheese+Pizza",
        category: "Pizza",
      },
      {
        name: "Pepperoni Pizza",
        description:
          "Crispy pepperoni slices with spicy tomato sauce and melted cheese on a thin crust.",
        price: 820,
        image: "https://via.placeholder.com/500x375?text=Pepperoni+Pizza",
        category: "Pizza",
      },
      {
        name: "Choco Chip Cookies",
        description:
          "Crunchy on the outside, gooey on the inside — loaded with chocolate chips.",
        price: 150,
        image: "https://via.placeholder.com/500x375?text=Choco+Chip+Cookies",
        category: "Cookies",
      },
      {
        name: "Oatmeal Raisin Cookies",
        description:
          "Wholesome oatmeal cookies with chewy raisins and a hint of cinnamon.",
        price: 160,
        image:
          "https://via.placeholder.com/500x375?text=Oatmeal+Raisin+Cookies",
        category: "Cookies",
      },
      {
        name: "Gulab Jamun",
        description:
          "Soft milk-solid balls soaked in rose-flavored sugar syrup — an Indian favorite.",
        price: 100,
        image: "https://via.placeholder.com/500x375?text=Gulab+Jamun",
        category: "Sweets",
      },
      {
        name: "Rasgulla",
        description:
          "Spongy white balls made from chhena and soaked in light sugar syrup.",
        price: 90,
        image: "https://via.placeholder.com/500x375?text=Rasgulla",
        category: "Sweets",
      },
      {
        name: "Potato Chips",
        description:
          "Crispy and salty potato chips — a perfect snack for any time.",
        price: 50,
        image: "https://via.placeholder.com/500x375?text=Potato+Chips",
        category: "Snacks",
      },
      {
        name: "Spicy Mix",
        description:
          "A crunchy mix of fried lentils, peanuts, and spices. A spicy delight!",
        price: 60,
        image: "https://via.placeholder.com/500x375?text=Spicy+Mix",
        category: "Snacks",
      },
      {
        name: "Orange Juice",
        description: "Refreshing and natural orange juice with no added sugar.",
        price: 70,
        image: "https://via.placeholder.com/500x375?text=Orange+Juice",
        category: "Drinks",
      },
      {
        name: "Lemon Iced Tea",
        description: "Cool and energizing iced tea with a twist of lemon.",
        price: 65,
        image: "https://via.placeholder.com/500x375?text=Lemon+Iced+Tea",
        category: "Drinks",
      },
    ];

    await Product.insertMany(products);
    console.log("✅ Products Added to Database!");
    process.exit();
  })
  .catch((err) => console.error("❌ Database Error:", err));
