const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 13",
      preco: 3999.90,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      descricao: "Celular Apple com boa câmera e ótimo desempenho.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Samsung Galaxy S23",
      preco: 3499.90,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
      descricao: "Smartphone Android moderno e potente.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Dell Inspiron",
      preco: 4299.90,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      descricao: "Notebook ideal para estudos, trabalho e programação.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "Notebook Lenovo Ideapad",
      preco: 3199.90,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      descricao: "Notebook leve, rápido e com bom custo-benefício.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Mouse Gamer",
      preco: 149.90,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
      descricao: "Mouse com boa precisão para jogos e uso diário.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Teclado Mecânico",
      preco: 299.90,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      descricao: "Teclado confortável com teclas mecânicas.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 3899.90,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
      descricao: "Console de nova geração para jogos.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Controle Xbox",
      preco: 449.90,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500",
      descricao: "Controle sem fio confortável para jogos.",
      emEstoque: true
    }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);

  card.style.transition = "0.3s";

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);

  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.innerHTML = produto.nome;

  const price = document.createElement("p");
  price.innerHTML = formatPrice(produto.preco);

  const category = document.createElement("p");
  category.innerHTML = "Categoria: " + produto.categoria;

  const btnDetails = document.createElement("button");
  btnDetails.innerHTML = "Ver detalhes";

  const btnHighlight = document.createElement("button");
  btnHighlight.innerHTML = "Destacar";

  btnDetails.addEventListener("click", function () {
    showProductDetails(produto);
  });

  btnHighlight.addEventListener("click", function () {
    card.classList.add("highlight");
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(function (produto) {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    console.log("Card renderizado com data-id:", card.getAttribute("data-id"));
    card.style.cursor = "pointer";
  });
}

function renderCategories() {
  categorySelect.innerHTML = "";

  const optionTodas = document.createElement("option");
  optionTodas.setAttribute("value", "Todas");
  optionTodas.innerHTML = "Todas";
  categorySelect.appendChild(optionTodas);

  const categorias = [];

  data.produtos.forEach(function (produto) {
    if (!categorias.includes(produto.categoria)) {
      categorias.push(produto.categoria);
    }
  });

  categorias.forEach(function (categoria) {
    const option = document.createElement("option");
    option.setAttribute("value", categoria);
    option.innerHTML = categoria;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  const estoque = produto.emEstoque ? "Em estoque" : "Fora de estoque";

  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Status:</strong> ${estoque}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {
  const textoBusca = searchInput.value.toLowerCase();
  const categoriaSelecionada = categorySelect.value;

  const produtosFiltrados = data.produtos.filter(function (produto) {
    const nomeCombina = produto.nome.toLowerCase().includes(textoBusca);
    const categoriaCombina =
      categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada;

    return nomeCombina && categoriaCombina;
  });

  return produtosFiltrados;
}

searchInput.addEventListener("input", function () {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);