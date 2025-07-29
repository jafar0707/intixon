    const API_URL = 'https://fakestoreapi.com/products';
    const productGrid = document.getElementById('productGrid');
    const loading = document.getElementById('loading');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceSort = document.getElementById('priceSort');
    const searchInput = document.getElementById('searchInput');

    let products = [];

    async function fetchProducts() {
      loading.style.display = 'block';
      const res = await fetch(API_URL);
      products = await res.json();
      loading.style.display = 'none';
      populateCategories();
      displayProducts(products);
    }

    function populateCategories() {
      const categories = [...new Set(products.map(p => p.category))];
      categoryFilter.innerHTML = '<option value="">Barchasi</option>';
      categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
      });
    }

    function displayProducts(data) {
      productGrid.innerHTML = '';
      data.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${product.image}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <p><small>${product.category}</small></p>
        `;
        productGrid.appendChild(div);
      });
    }

    function applyFilters() {
      let filtered = [...products];

      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm));
      }

      const selectedCategory = categoryFilter.value;
      if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }

      const sortValue = priceSort.value;
      if (sortValue === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortValue === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
      }

      displayProducts(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    priceSort.addEventListener('change', applyFilters);

    fetchProducts();
    



jg












