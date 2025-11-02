const container = document.getElementById("productContainer");
const filterBtn = document.getElementById("filterBtn");
const categoryFilter = document.getElementById("categoryFilter");

let products = [];
let allProducts = [];

// Fetch all products initially
async function fetchProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    products = data.products;
    allProducts = data.products;
    renderCategoryOptions(allProducts);
    renderProducts(products);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

// Fetch products by category
async function fetchProductsByCategory(category) {
  try {
    if (category === "all") {
      renderProducts(allProducts);
      return;
    }
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await res.json();
    products = data.products;
    renderProducts(products);
  } catch (err) {
    console.error("Error fetching category products:", err);
  }
}

// Render product cards
function renderProducts(data) {
  if (!data || data.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500 text-lg col-span-full">No products found.</p>`;
    return;
  }

  container.innerHTML = data
    .map(
      (p) => `
        <div onclick="viewDetails(${p.id})"
          class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
          
          <div class="relative bg-gray-50 flex justify-center items-center p-6">
            <img src="${p.thumbnail}" alt="${p.title}" 
                 class="object-contain w-full h-48 transition-transform duration-300">
          </div>

          <div class="p-4 flex flex-col justify-between h-48">
            <h1 class="text-lg font-semibold text-gray-800 truncate">${p.title}</h1>
            <p class="text-sm text-gray-500 line-clamp-2">${p.description}</p>

            <div class="mt-auto flex items-center justify-between">
              <span class="text-xl font-bold text-blue-600">$${p.price}</span>
              <button class="px-3 py-1 text-xs font-semibold text-gray-900 uppercase bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

// Render category dropdown
function renderCategoryOptions(data) {
  const categories = [...new Set(data.map((p) => p.category))];

  categoryFilter.innerHTML = `
        <option value="all">All Categories</option>
        ${categories
          .map((cat) => `<option value="${cat}">${cat}</option>`)
          .join("")}
      `;
}

// Handle category change (auto-fetch)
categoryFilter.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  fetchProductsByCategory(selectedCategory);
});

// Filter by price
filterBtn.addEventListener("click", () => {
  const min = parseFloat(document.getElementById("minPrice").value) || 0;
  const max = parseFloat(document.getElementById("maxPrice").value) || Infinity;
  const filtered = products.filter((p) => p.price >= min && p.price <= max);
  renderProducts(filtered);
});

// Navigate to product details
function viewDetails(id) {
  window.location.href = `product-details.html?id=${id}`;
}

fetchProducts();
