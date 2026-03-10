const priceElement = document.getElementById("product-price")

function changeModalImage(img) {
  const modalImg = document.getElementById("modal-img");

  modalImg.style.opacity = 0;

  setTimeout(() => {
    modalImg.src = `/image/${img}`;
    modalImg.style.opacity = 1;
  }, 200);
}

function setActiveColor(activeSpan) {
  document
    .querySelectorAll(".modal-colors span")
    .forEach(span => span.classList.remove("active"));

  activeSpan.classList.add("active");
}

const calcularAumento = (monto, tasa) => {
  return Number((monto * (1 + tasa / 100)).toFixed(2));
};

const navigateToHome = (e) => {
  if (e) e.preventDefault();
  // Usamos .origin para asegurar que siempre vaya a la raíz absoluta
  window.location.href = window.location.origin;
};

const goHomeBtn = document.getElementById('go-home');
// Verificamos que el botón exista antes de asignarle el evento (evita errores en consola)
if (goHomeBtn) {
  goHomeBtn.addEventListener('click', navigateToHome);
}

// 1. Cargar precio del producto en USD
async function loadProductPrice(id) {
  try {
    const response = await fetch(`https://tjmwebback-production.up.railway.app/${id}`);
    const data = await response.json();
    const porcentage = 49;
    const priceUSD = calcularAumento(data.precio, porcentage);
    priceElement.dataset.usd = priceUSD; // Guardamos el precio original
    priceElement.dataset.mode = "usd"; // Estado inicial
    priceElement.innerHTML = `${priceUSD}$`;
  } catch (error) {
    console.error("Error cargando el producto:", error);
  }
}

// 2. Obtener precio del dólar
async function getDollarRate() {
  try {
    const response = await fetch("https://ve.dolarapi.com/v1/dolares/oficial");
    const data = await response.json();
    return data.promedio;
  } catch (error) {
    console.error("Error obteniendo el dólar:", error); return null;
  }
}

function renderColors(colors, container) {
  container.innerHTML = "";

  colors.forEach((item, index) => {
    const dot = document.createElement("span");
    dot.style.background = item.color;
    dot.className = "color-dot";

    dot.onclick = () => {
      changeModalImage(item.img);
      setActiveColor(dot);
    };

    if (index === 0) dot.classList.add("active");

    container.appendChild(dot);
  });
}

function setupBaseModal(product) {
  document.getElementById("modal-img").src = `/image/${product.img}`;
  document.getElementById("modal-name").textContent = product.name;

  const desc = document.getElementById("modal-desc");
  const btn = document.getElementById("toggle");

  desc.textContent = product.desc;

  btn.onclick = () => {
    desc.classList.toggle("clamp");
    btn.textContent =
      desc.classList.contains("clamp") ? "Leer más" : "Leer menos";
  };

  document.getElementById("size").textContent = product.size || "";
}

function setupSofas(product) {
  const colors = document.getElementById("modal-colors");
  const price = document.getElementById("product-price");
  price.innerHTML = '<span class="loader"></span>'
  loadProductPrice(product.id);
  renderColors(product.colors, colors);
}

function setupColchones(product){
  const topContainer = document.getElementById("modal-top");
  topContainer.classList.remove("modal-opens")
  topContainer.className = "modal-top";

  const topBtn1 = document.createElement("span");
  topBtn1.className = "span-top";
  const topBtn2 = document.createElement("span");
  topBtn2.className = "span-top";
  const topBtn3 = document.createElement("span");
  topBtn3.className = "span-top";
  const topBtn4 = document.createElement("span");
  topBtn4.className = "span-top";

  topBtn1.textContent = "Individual";
  topBtn2.textContent = "Matrimonial";
  topBtn3.textContent = "Queen";
  topBtn4.textContent = "King";

  function updatePrice(position) {
    const price = document.getElementById("product-price");
    price.innerHTML = '<span class="loader"></span>'
    loadProductPrice(`${product.id}${position}`);
  }

  topBtn1.onclick = () => { updatePrice(1) }
  topBtn2.onclick = () => { updatePrice(14) }
  topBtn3.onclick = () => { updatePrice(16) }
  topBtn4.onclick = () => { updatePrice(2) }

  topContainer.innerHTML = "";
  topContainer.appendChild(topBtn1);
  topContainer.appendChild(topBtn2);
  topContainer.appendChild(topBtn3);
  topContainer.appendChild(topBtn4);

  updatePrice(1) // inicial
}

function setupDormitorio(product){
  const colors = document.getElementById("modal-colors");
  const topContainer = document.getElementById("modal-top");
  topContainer.classList.remove("modal-opens")
  topContainer.className = "modal-top";

  const topBtn1 = document.createElement("span");
  topBtn1.className = "span-top";
  const topBtn2 = document.createElement("span");
  topBtn2.className = "span-top";
  const topBtn3 = document.createElement("span");
  topBtn3.className = "span-top";
  const topBtn4 = document.createElement("span");
  topBtn4.className = "span-top";

  topBtn1.textContent = "Individual";
  topBtn2.textContent = "Matrimonial";
  topBtn3.textContent = "Queen";
  topBtn4.textContent = "King";

  function updatePrice(position) {
    const price = document.getElementById("product-price");
    price.innerHTML = '<span class="loader"></span>'
    loadProductPrice(`${product.id}${position}`);
  }

  renderColors(product.colors, colors);

  topBtn1.onclick = () => { updatePrice(1) }
  topBtn2.onclick = () => { updatePrice(14) }
  topBtn3.onclick = () => { updatePrice(16) }
  topBtn4.onclick = () => { updatePrice(2) }

  topContainer.innerHTML = "";
  topContainer.appendChild(topBtn1);
  topContainer.appendChild(topBtn2);
  topContainer.appendChild(topBtn3);
  topContainer.appendChild(topBtn4);

  updatePrice(1) // inicial
}

function setupMultimuebles(product) {
  const colors = document.getElementById("modal-colors");
  const openContainer = document.getElementById("modal-open");

  const price = document.getElementById("product-price");
  price.innerHTML = '<span class="loader"></span>'
  loadProductPrice(product.id);

  if(product.open){
    openContainer.classList.remove("modal-opens")
  }else{
    openContainer.classList.add("modal-opens")
  }
  renderColors(product.colors, colors);
  openContainer.innerHTML = "";
  if (product.open) {
    const btn = document.createElement("span");
    btn.textContent = "Abrir";
    btn.className = "open-dot";
    btn.onclick = () => changeModalImage(product.open);
    openContainer.appendChild(btn);
  }
}

function setupComedores(product) {
  const colors = document.getElementById("modal-colors");
  const chairContainer = document.getElementById("modal-chairs");
  const topContainer = document.getElementById("modal-top");
  let isFour = false; // estado toggle
  chairContainer.classList.remove("modal-opens")
  topContainer.classList.remove("modal-opens")
  topContainer.className = "modal-top";

  const topBtn1 = document.createElement("span");
  topBtn1.className = "span-top";
  const topBtn2 = document.createElement("span");
  topBtn2.className = "span-top";
  const topBtn3 = document.createElement("span");
  topBtn3.className = "span-top";

  topBtn1.textContent = "vidrio";
  topBtn2.textContent = "Pintado";
  topBtn3.textContent = "PVC";

  const chairBtn = document.createElement("span");
  chairBtn.className = "open-dot";
  function updateChairs(position) {
    if (isFour) {
      chairBtn.textContent = "Seis Sillas";

      const price = document.getElementById("product-price");
      price.innerHTML = '<span class="loader"></span>'
      loadProductPrice(`${product.id}4${position}`);

      changeModalImage(product.chairs_4[0].img);
      renderColors(product.chairs_4[position].colors, colors);
    } else {
      chairBtn.textContent = "Cuatro Sillas";

      const price = document.getElementById("product-price");
      price.innerHTML = '<span class="loader"></span>'
      loadProductPrice(`${product.id}6${position}`);

      changeModalImage(product.chairs_6[0].img);
      renderColors(product.chairs_6[position].colors, colors);
    }
  }
  chairBtn.onclick = () => {
    isFour = !isFour;
    updateChairs(0);
  };

  topBtn1.onclick = () => { updateChairs(0) }
  topBtn2.onclick = () => { updateChairs(1) }
  topBtn3.onclick = () => { updateChairs(2) }

  chairContainer.innerHTML = "";
  chairContainer.appendChild(chairBtn);

  topContainer.innerHTML = "";
  topContainer.appendChild(topBtn1);
  topContainer.appendChild(topBtn2);
  topContainer.appendChild(topBtn3);
  updateChairs(0); // inicial
}

// 3. Toggle USD ↔ Bs
priceElement.addEventListener("click", async () => {
  const mode = priceElement.dataset.mode;
  const usdPrice = parseFloat(priceElement.dataset.usd);
  if (mode === "usd") {
    // Convertir a Bs
    const dollarRate = await getDollarRate();
    if (!dollarRate) return;

    const priceBs = usdPrice * dollarRate;
    priceElement.innerHTML = `${priceBs.toFixed(2)} BsS`;
    priceElement.dataset.mode = "bs";
  }
  else { // Volver a USD
    priceElement.innerHTML = `${usdPrice}$`;
    priceElement.dataset.mode = "usd";
  }
});

function openProductModal(product, category) {
  const modal = document.getElementById("product-modal")
  setupBaseModal(product);

  switch (category) {
    case "multimuebles":
      setupMultimuebles(product);
      break;

    case "comedores":
      setupComedores(product);
      break;

    case "colchones":
      setupColchones(product);
      break;

    case "dormitorios":
      setupDormitorio(product);
      break;

    case "sofas":
    default:
      setupSofas(product);
  }

  modal.classList.remove("hidden");
  // reset animación
  modal.classList.remove("show");
  void modal.offsetWidth;
  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.remove("show");

  setTimeout(() => {
    modal.classList.add("hidden");
  }, 400);
}

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

function loadSliderByCategory(category) {
  const welcome = document.querySelector(".sliders");
  const slogan1 = document.querySelector(".slogan-main");
  const slogan2 = document.querySelector(".slogan-sub");
  const select = WELCOME[category] || [];

  welcome.innerHTML = `
    <picture>
      <source media="(max-width: 768px)" srcset="${select.image4_5}">
      <source media="(max-width: 1200px)" srcset="${select.image16_9}">
      <img src="${select.image21_9}" alt="Mueble premium">
    </picture>
  `;
  slogan1.innerHTML = select.slogan_1;
  slogan2.innerHTML = select.slogan_2;
}

function loadProductsByCategory(category) {
  const grid = document.querySelector(".furniture-grid");
  grid.innerHTML = "";
  const products = PRODUCTS[category] || [];

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "furniture-card";
    card.innerHTML = `
      <img src="/image/${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
    `;
    card.addEventListener("click", () => {
      openProductModal(product, category);
    });
    grid.appendChild(card);
  });
  initProductsObserver();
}

function initProducts() {
  showTopBar()

  document.querySelector(".modal-close")?.addEventListener("click", closeModal);
  document.querySelector(".modal-backdrop")?.addEventListener("click", closeModal);

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || "muebles";

  loadProductsByCategory(category);
  loadSliderByCategory(category)
}

initProducts()
