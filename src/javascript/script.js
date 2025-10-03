const botaoMobile = document.getElementById("mobile_botao");
const menuMobile = document.getElementById("mobile_menu");

if (botaoMobile) {
  botaoMobile.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
  });
}

const carrossel = document.getElementById("carrossel");
const setaEsquerda = document.getElementById("seta-esquerda");
const setaDireita = document.getElementById("seta-direita");

const cardWidth = 270;
let scrollPosition = 0;

function getCardsPorClique() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

if (setaDireita) {
  setaDireita.addEventListener("click", () => {
    const maxScroll =
      carrossel.scrollWidth -
      document.querySelector(".carrossel-wrapper").offsetWidth;
    const cardsPorClique = getCardsPorClique();
    if (scrollPosition < maxScroll) {
      scrollPosition += cardWidth * cardsPorClique;
      if (scrollPosition > maxScroll) scrollPosition = maxScroll;
      carrossel.style.transform = `translateX(-${scrollPosition}px)`;
    }
  });
}

if (setaEsquerda) {
  setaEsquerda.addEventListener("click", () => {
    const cardsPorClique = getCardsPorClique();
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth * cardsPorClique;
      if (scrollPosition < 0) scrollPosition = 0;
      carrossel.style.transform = `translateX(-${scrollPosition}px)`;
    }
  });
}

window.addEventListener("resize", () => {
  scrollPosition = 0;
  carrossel.style.transform = `translateX(0)`;
});

// =================== BANNER PROMOCIONAL ===================
const bannerCarrossel = document.querySelector(".banner-carrossel");
const bannerImgs = document.querySelectorAll(".banner-carrossel img");
const btnBannerEsq = document.querySelector(".banner-promocional .seta-esquerda");
const btnBannerDir = document.querySelector(".banner-promocional .seta-direita");
const indicadores = document.querySelectorAll(".indicador");

let bannerIndex = 0;

function atualizarBanner() {
  const largura = bannerImgs[0].clientWidth;
  bannerCarrossel.style.transform = `translateX(${-bannerIndex * largura}px)`;
  atualizarIndicadores();
}

function atualizarIndicadores() {
  indicadores.forEach((dot, i) => {
    dot.classList.toggle("ativo", i === bannerIndex);
  });
}

if (btnBannerDir) {
  btnBannerDir.addEventListener("click", () => {
    bannerIndex = (bannerIndex + 1) % bannerImgs.length;
    atualizarBanner();
  });
}

if (btnBannerEsq) {
  btnBannerEsq.addEventListener("click", () => {
    bannerIndex = (bannerIndex - 1 + bannerImgs.length) % bannerImgs.length;
    atualizarBanner();
  });
}

indicadores.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    bannerIndex = i;
    atualizarBanner();
  });
});

function proximoSlide() {
  bannerIndex = (bannerIndex + 1) % bannerImgs.length;
  atualizarBanner();
}

let intervalo = setInterval(proximoSlide, 4000);

document.querySelector(".banner-promocional")?.addEventListener("mouseenter", () => {
  clearInterval(intervalo);
});

document.querySelector(".banner-promocional")?.addEventListener("mouseleave", () => {
  intervalo = setInterval(proximoSlide, 8000);
});

window.addEventListener("resize", atualizarBanner);

// =================== NAVBAR SCROLL ===================
const navItems = document.querySelectorAll("#nav_lista .nav-item a");
const sections = document.querySelectorAll("main section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => link.parentElement.classList.remove("active"));

        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`#nav_lista a[href="#${id}"]`);
        if (activeLink) {
          activeLink.parentElement.classList.add("active");
        }

        const header = document.querySelector("header");
        if (id === "home") {
          header.classList.remove("scrolled");
        } else {
          header.classList.add("scrolled");
        }
      }
    });
  },
  {
    root: null,
    threshold: 0.6,
  }
);

sections.forEach((section) => observer.observe(section));

// =================== MODAL COLEÇÃO ===================
const modalColecao = document.getElementById("modal-colecao");
const colecaoContainer = modalColecao?.querySelector(".colecao-container");
const botaoVerColecao = document.querySelector(".botao-home");

if (botaoVerColecao) {
  botaoVerColecao.addEventListener("click", (e) => {
    e.preventDefault();
    colecaoContainer.innerHTML = "";
    document.querySelectorAll("#carrossel .card").forEach((card) => {
      colecaoContainer.appendChild(card.cloneNode(true));
    });
    modalColecao.style.display = "flex";
  });
}

// =================== MODAL PRODUTO ===================
const modalProduto = document.getElementById("modal-produto");
const detalheImagem = document.getElementById("detalhe-imagem");
const detalheNome = document.getElementById("detalhe-nome");
const detalhePreco = document.getElementById("detalhe-preco");
const detalhePrecoPromocao = document.getElementById("detalhe-preco-promocao");
const detalheDescricao = document.getElementById("detalhe-descricao");

const descricoesNFT = {
  "Aetheris - Guardião dos Ventos":
    "🦅 Uma águia lendária de energia pura, símbolo da liberdade em forma digital.",
  "Nyxbyte - O Mensageiro Veloz":
    "🐇 Um coelho cibernético com reflexos sobre-humanos e controle de dados quânticos.",
  "Oculus Prime - O Vigilante Noturno":
    "🦉 Coruja ancestral que tudo observa, detentora da sabedoria das redes.",
  "Dravonix - Senhor dos Portais":
    "🐉 Dragão lendário que domina o fogo digital e comanda o fluxo entre mundos.",
  "Neonpurr - Guardião das Sombras":
    "🐱 Gato ágil e furtivo que se move entre códigos invisíveis.",
  "Kronox - O Colosso Primordial":
    "🦍 Gorila guerreiro cuja força molda o próprio ciberespaço.",
  "Valyron - Rei dos Circuitos":
    "🦁 Leão majestoso e líder supremo do reino digital.",
  "Lunawolf - A Sentinela das Estrelas":
    "🐺 Lobo solitário que corre entre constelações de dados.",
  "Bytechimp - Engenheiro do Caos":
    "🐒 Macaco hacker com intelecto inigualável e domínio total sobre sistemas.",
  "Gravok - Guardião do Núcleo":
    "🐻 Urso indestrutível, protetor dos segredos mais profundos da rede."
};

function abrirModalDetalhes(card) {
  const nome = card.querySelector("h3").textContent;
  const imgSrc = card.querySelector("img").src;
  const precoOriginalEl = card.querySelector(".preco");
  const precoPromocaoEl = card.querySelector(".preco-promocao");

  detalheImagem.src = imgSrc;
  detalheNome.textContent = nome;

  if (precoPromocaoEl) {
    detalhePreco.innerHTML = `<span style="text-decoration: line-through; color: #888;">${precoOriginalEl.textContent}</span>`;
    detalhePrecoPromocao.textContent = precoPromocaoEl.textContent;
    detalhePrecoPromocao.style.display = "block";
  } else {
    detalhePreco.textContent = precoOriginalEl.textContent;
    detalhePrecoPromocao.style.display = "none";
  }

  detalheDescricao.textContent = descricoesNFT[nome] || "Descrição não disponível.";
}

colecaoContainer?.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) {
    abrirModalDetalhes(card);
    modalColecao.style.display = "none";
    modalProduto.style.display = "flex";
  }
});

document.querySelectorAll("#carrossel .card").forEach((card) => {
  card.addEventListener("click", () => abrirModalDetalhes(card));
  card.addEventListener("click", () => {
    modalProduto.style.display = "flex";
  });
});

// =================== FECHAR MODAIS ===================
document.querySelectorAll(".modal-fechar").forEach((btn) => {
  btn.addEventListener("click", () => {
    modalColecao.style.display = "none";
    modalProduto.style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  if (e.target === modalColecao) modalColecao.style.display = "none";
  if (e.target === modalProduto) modalProduto.style.display = "none";
});
