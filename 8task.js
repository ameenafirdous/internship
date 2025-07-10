const products = [
  {
    name: "Smartphone",
    category: "electronics",
    price: 299,
    rating: 4,
    description: "Latest smartphone with high-end specs.",
    image: "https://via.placeholder.com/200x150?text=Smartphone"
  },
  {
    name: "Designer Dress",
    category: "fashion",
    price: 75,
    rating: 5,
    description: "Trendy and elegant designer wear.",
    image: "https://via.placeholder.com/200x150?text=Dress"
  },
  {
    name: "Microwave Oven",
    category: "home",
    price: 120,
    rating: 3,
    description: "Efficient microwave for quick meals.",
    image: "https://via.placeholder.com/200x150?text=Oven"
  },
  {
    name: "Headphones",
    category: "electronics",
    price: 40,
    rating: 4,
    description: "Noise-cancelling over-ear headphones.",
    image: "https://via.placeholder.com/200x150?text=Headphones"
  },
  {
    name: "Sofa Set",
    category: "home",
    price: 450,
    rating: 5,
    description: "Luxury 3-piece sofa set for your living room.",
    image: "https://via.placeholder.com/200x150?text=Sofa"
  },
  {
    name: "Laptop",
    category: "electronics",
    price: 999,
    rating: 5,
    description: "Powerful laptop for work and gaming.",
    image: "https://via.placeholder.com/200x150?text=Laptop"
  },
  {
    name: "Running Shoes",
    category: "fashion",
    price: 60,
    rating: 4,
    description: "Comfortable shoes for everyday use.",
    image: "https://via.placeholder.com/200x150?text=Shoes"
  },
  {
    name: "Blender",
    category: "home",
    price: 35,
    rating: 3,
    description: "Handy blender for quick mixing.",
    image: "https://via.placeholder.com/200x150?text=Blender"
  },
  {
    name: "Smartwatch",
    category: "electronics",
    price: 150,
    rating: 4,
    description: "Track your health with style.",
    image: "https://via.placeholder.com/200x150?text=Smartwatch"
  },
  {
    name: "Leather Jacket",
    category: "fashion",
    price: 120,
    rating: 5,
    description: "Stylish leather jacket for cool weather.",
    image: "https://via.placeholder.com/200x150?text=Jacket"
  },
  {
    name: "Curtains Set",
    category: "home",
    price: 70,
    rating: 4,
    description: "Elegant curtains to decorate your room.",
    image: "https://via.placeholder.com/200x150?text=Curtains"
  },
  {
    name: "Bluetooth Speaker",
    category: "electronics",
    price: 45,
    rating: 4,
    description: "Portable speaker with deep bass.",
    image: "https://via.placeholder.com/200x150?text=Speaker"
  },
  {
    name: "Jeans",
    category: "fashion",
    price: 55,
    rating: 3,
    description: "Classic blue jeans for all seasons.",
    image: "https://via.placeholder.com/200x150?text=Jeans"
  },
  {
    name: "Wall Clock",
    category: "home",
    price: 25,
    rating: 4,
    description: "Minimalist wall clock for home decor.",
    image: "https://via.placeholder.com/200x150?text=Clock"
  },
  {
    name: "Tablet",
    category: "electronics",
    price: 220,
    rating: 3,
    description: "Lightweight tablet for entertainment.",
    image: "https://via.placeholder.com/200x150?text=Tablet"
  },
  {
    name: "Handbag",
    category: "fashion",
    price: 85,
    rating: 5,
    description: "Chic leather handbag for women.",
    image: "https://via.placeholder.com/200x150?text=Handbag"
  },
  {
    name: "Coffee Maker",
    category: "home",
    price: 95,
    rating: 4,
    description: "Perfect coffee at the push of a button.",
    image: "https://via.placeholder.com/200x150?text=Coffee+Maker"
  },
  {
    name: "Power Bank",
    category: "electronics",
    price: 30,
    rating: 4,
    description: "Charge on the go with this fast power bank.",
    image: "https://via.placeholder.com/200x150?text=Power+Bank"
  },
  {
    name: "Sneakers",
    category: "fashion",
    price: 50,
    rating: 3,
    description: "Trendy and lightweight sneakers.",
    image: "https://via.placeholder.com/200x150?text=Sneakers"
  },
  {
    name: "LED Lamp",
    category: "home",
    price: 20,
    rating: 4,
    description: "Energy-efficient LED desk lamp.",
    image: "https://via.placeholder.com/200x150?text=Lamp"
  },
  {
    name: "Gaming Mouse",
    category: "electronics",
    price: 25,
    rating: 4,
    description: "Responsive mouse for gamers.",
    image: "https://via.placeholder.com/200x150?text=Mouse"
  },
  {
    name: "Formal Shirt",
    category: "fashion",
    price: 35,
    rating: 4,
    description: "Smart fit shirt for office or events.",
    image: "https://via.placeholder.com/200x150?text=Shirt"
  },
  {
    name: "Vacuum Cleaner",
    category: "home",
    price: 180,
    rating: 5,
    description: "Clean your space with ease.",
    image: "https://via.placeholder.com/200x150?text=Vacuum"
  },
  {
    name: "TV",
    category: "electronics",
    price: 500,
    rating: 5,
    description: "Ultra HD 50-inch Smart TV.",
    image: "https://via.placeholder.com/200x150?text=TV"
  },
  {
    name: "Winter Coat",
    category: "fashion",
    price: 140,
    rating: 5,
    description: "Stay warm and stylish this winter.",
    image: "https://via.placeholder.com/200x150?text=Coat"
  }
];

const productGrid = document.getElementById("productGrid");
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const ratingFilter = document.getElementById("ratingFilter");

const popup = document.getElementById("popup");
const popupName = document.getElementById("popupName");
const popupImage = document.getElementById("popupImage");
const popupPrice = document.getElementById("popupPrice");
const popupRating = document.getElementById("popupRating");
const popupDescription = document.getElementById("popupDescription");

function displayProducts(productList) {
  productGrid.innerHTML = "";
  productList.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h4>${product.name}</h4>
        <p>💲 ${product.price}</p>
        <p>⭐ ${product.rating}</p>
      </div>
    `;
    card.onclick = () => showPopup(product);
    productGrid.appendChild(card);
  });
}

function showPopup(product) {
  popupName.textContent = product.name;
  popupImage.src = product.image;
  popupPrice.textContent = `Price: 💲${product.price}`;
  popupRating.textContent = `Rating: ⭐${product.rating}`;
  popupDescription.textContent = product.description;
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}

function filterProducts() {
  let filtered = products.filter(product => {
    const categoryMatch = categoryFilter.value === "all" || product.category === categoryFilter.value;
    const ratingMatch = ratingFilter.value === "all" || product.rating >= parseInt(ratingFilter.value);
    const price = product.price;
    let priceMatch = true;
    if (priceFilter.value === "0-50") priceMatch = price <= 50;
    else if (priceFilter.value === "50-100") priceMatch = price > 50 && price <= 100;
    else if (priceFilter.value === "100") priceMatch = price > 100;
    return categoryMatch && ratingMatch && priceMatch;
  });

  const searchTerm = searchBar.value.toLowerCase();
  filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm));
  displayProducts(filtered);
}

searchBar.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
ratingFilter.addEventListener("change", filterProducts);

// Initial load
displayProducts(products);
