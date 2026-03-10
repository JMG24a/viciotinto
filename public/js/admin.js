let selectedProduct = null;

function initProductsObserver() {
  const cards = document.querySelectorAll('.furniture-card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.55 }
  );
  cards.forEach((card) => observer.observe(card));
}

async function loadAdminProducts() {
  const grid = document.getElementById("admin-grid");
  grid.innerHTML = "";
  products = PRODUCTS['sofas']

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "furniture-card";
    card.innerHTML = `
      <img src="/image/${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
    `;
    card.addEventListener("click", () => {
      openAdminModal(product);
    });
    grid.appendChild(card);
  });
  initProductsObserver();
}

function loadProduct(category){
  console.log("🚀 ~ loadProduct ~ category:", category)
  const grid = document.getElementById("admin-grid");
  grid.innerHTML = "";
  products = PRODUCTS[category]

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "furniture-card";
    card.innerHTML = `
      <img src="/image/${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
    `;
    card.addEventListener("click", () => {
      openAdminModal(product);
    });
    grid.appendChild(card);
  });
  initProductsObserver();
}

function openAdminModal(product) {
  selectedProduct = product;

  document.getElementById("admin-name").textContent = product.name;
  document.getElementById("admin-price").value = product.price;

  document.getElementById("admin-modal").classList.remove("hidden");
}

function closeAdminModal() {
  document.getElementById("admin-modal").classList.add("hidden");
}

async function submitForm (){
  console.log("HELLO")
  const price = document.getElementById("admin-price").value;
  console.log("🚀 ~ submitForm ~ price:", price)
  const password = document.getElementById("admin-password").value;
  console.log("🚀 ~ submitForm ~ password:", password)

  // await fetch(`/api/products/${selectedProduct.id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ price })
  // });

  closeAdminModal();
  loadAdminProducts(); // refresca lista
};

function initAdmin() {
  loadAdminProducts();
}
