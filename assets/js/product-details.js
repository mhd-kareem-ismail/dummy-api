const details = document.getElementById("details");

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Fetch product by ID
async function fetchProductById(id) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await res.json();

    details.innerHTML = `
      <div class="grid md:grid-cols-2 bg-gray-50 gap-0">
        <!-- Product Image -->
        <div class="bg-gray-50 flex justify-center items-center p-8">
          <img src="${product.thumbnail}" alt="${product.title}" 
               class="object-contain w-full max-h-96 transition-transform duration-300 hover:scale-105">
        </div>

        <!-- Product Info -->
        <div class="p-8 flex flex-col justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-3">${product.title}</h1>
            <p class="text-gray-600 text-sm leading-relaxed">${product.description}</p>
          </div>

          <div class="mt-6">
            <div class="flex items-center justify-between">
              <span class="text-2xl font-semibold text-blue-600">$${product.price}</span>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>

            <button onclick="history.back()" 
              class="mt-6 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition">
              ← Back to Products
            </button>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    details.innerHTML = `<p class="text-gray-500">Error loading product details.</p>`;
    console.error("Error fetching product:", err);
  }
}

if (productId) {
  fetchProductById(productId);
} else {
  details.innerHTML = `<p class="text-gray-500">No product ID provided.</p>`;
}
