function detectRootPrefix() {
  const path = window.location.pathname.replace(/\\/g, "/");
  return /\/(?:site|avant|valor|braspine)(?:\/|$)/.test(path) ? "../" : "";
}

const rootPrefix = document.body.dataset.rootPrefix || detectRootPrefix();

const siteConfig = {
  company: "Avant Assessoria Florestal LTDA",
  brand: "Avant",
  tagline: "Inteligência artificial e precisão operacional para decisões mais claras no campo.",
  email: "avant.marcosj@gmail.com",
  phoneDisplay: "47 98811-0609",
  phoneIntl: "5547988110609",
  city: "Brasil",
  logo: `${rootPrefix}avant/imagens/avant-logo.png`
};

const routes = {
  home: `${rootPrefix}index.html`,
  servicos: `${rootPrefix}site/servicos.html`,
  ia: `${rootPrefix}site/inteligencia-artificial.html`,
  geotecnologias: `${rootPrefix}site/geotecnologias.html`,
  manejo: `${rootPrefix}site/manejo-florestal.html`,
  clientes: `${rootPrefix}site/clientes.html`,
  contato: `${rootPrefix}site/contato.html`,
  plataforma: `${rootPrefix}site/plataforma.html`,
  avant: `${rootPrefix}avant/index.html`,
  valor: `${rootPrefix}valor/index.html`,
  braspine: `${rootPrefix}braspine/index.html`
};

const navItems = [
  { id: "home", label: "Home", href: routes.home },
  { id: "servicos", label: "Serviços", href: routes.servicos },
  { id: "ia", label: "IA", href: routes.ia },
  { id: "geotecnologias", label: "Geotecnologias", href: routes.geotecnologias },
  { id: "manejo", label: "Manejo", href: routes.manejo },
  { id: "clientes", label: "Parceiros", href: routes.clientes },
  { id: "contato", label: "Contato", href: routes.contato },
  { id: "plataforma", label: "Plataforma", href: routes.plataforma, isSelector: true }
];

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function applyTranslationGuard() {
  document.documentElement.lang = "pt-BR";
  document.documentElement.setAttribute("translate", "no");
  document.documentElement.classList.add("notranslate");
  document.body.setAttribute("translate", "no");
  document.body.classList.add("notranslate");

  if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
    const meta = document.createElement("meta");
    meta.name = "google";
    meta.content = "notranslate";
    document.head.appendChild(meta);
  }
}

function buildHeader() {
  const active = document.body.dataset.page || "";
  const headerTarget = document.getElementById("site-header");
  if (!headerTarget) return;

  const links = navItems
    .map((item) => {
      if (item.isSelector) {
        return `
          <button
            type="button"
            class="site-nav__platform-trigger ${item.id === active ? "is-active" : ""}"
            data-platform-modal-open
            aria-haspopup="dialog"
            aria-controls="platform-selector-modal"
          >
            ${item.label}
          </button>
        `;
      }

      return `<a href="${item.href}" class="${item.id === active ? "is-active" : ""}">${item.label}</a>`;
    })
    .join("");

  headerTarget.innerHTML = `
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="brand brand--header" href="${routes.home}" aria-label="Ir para a página inicial da Avant">
          <span class="brand__mark brand__mark--header">
            <img src="${siteConfig.logo}" alt="Logo da Avant" />
          </span>
          <span class="brand__text brand__text--header">
            <strong>${siteConfig.brand}</strong>
          </span>
        </a>

        <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" data-menu-toggle>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="site-nav" aria-label="Navegação principal">
          <div class="site-nav__links">${links}</div>
        </nav>
      </div>

      <div class="platform-modal" id="platform-selector-modal" data-platform-modal hidden>
        <div class="platform-modal__backdrop" data-platform-modal-close></div>
        <div class="platform-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="platform-selector-title">
          <button type="button" class="platform-modal__close" aria-label="Fechar seleção de plataforma" data-platform-modal-close>&times;</button>
          <span class="eyebrow">Plataforma</span>
          <h2 id="platform-selector-title">Selecione o ambiente institucional</h2>
          <p>Escolha a empresa para acessar os sistemas, dashboards e módulos configurados para cada operação.</p>
          <div class="platform-modal__options">
            <a class="platform-modal__card" href="${routes.avant}">
              <span class="platform-modal__label">Avant</span>
              <strong>Acessos institucionais da Avant</strong>
              <span>Plataformas corporativas, painéis técnicos e ferramentas institucionais.</span>
            </a>
            <a class="platform-modal__card" href="${routes.valor}">
              <span class="platform-modal__label">Valor Florestal</span>
              <strong>Acessos institucionais da Valor Florestal</strong>
              <span>Ambientes dedicados, painéis operacionais e módulos vinculados à Valor Florestal.</span>
            </a>
            <a class="platform-modal__card" href="${routes.braspine}">
              <span class="platform-modal__label">Braspine</span>
              <strong>Acessos institucionais da Braspine</strong>
              <span>Página institucional da Braspine com os mesmos elementos visuais e estrutura operacional.</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

function buildFooter() {
  const footerTarget = document.getElementById("site-footer");
  if (!footerTarget) return;

  footerTarget.innerHTML = `
    <footer class="site-footer">
      <div class="container site-footer__top">
        <div class="site-footer__brand">
          <a class="brand" href="${routes.home}">
            <span class="brand__mark">
              <img src="${siteConfig.logo}" alt="Logo da Avant" />
            </span>
            <span class="brand__text">
              <strong>${siteConfig.brand}</strong>
              <span>${siteConfig.company}</span>
            </span>
          </a>
          <p>${siteConfig.tagline}</p>
          <div class="tag-cloud">
            <span class="tag">inteligencia artificial florestal</span>
            <span class="tag">geotecnologia</span>
            <span class="tag">sensoriamento remoto</span>
            <span class="tag">manejo florestal</span>
          </div>
        </div>

        <div>
          <h3>Navegação</h3>
          <ul class="site-footer__list">
            ${navItems
              .map((item) =>
                item.isSelector
                  ? `<li><a href="${routes.plataforma}">${item.label}</a></li>`
                  : `<li><a href="${item.href}">${item.label}</a></li>`
              )
              .join("")}
          </ul>
        </div>

        <div>
          <h3>Contato</h3>
          <ul class="site-footer__list">
            <li><a href="mailto:${siteConfig.email}">${siteConfig.email}</a></li>
            <li><a href="https://wa.me/${siteConfig.phoneIntl}" target="_blank" rel="noreferrer">${siteConfig.phoneDisplay}</a></li>
            <li>${siteConfig.city}</li>
            <li><a href="${routes.contato}">Solicitar contato</a></li>
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>&copy; <span data-current-year></span> ${siteConfig.brand}. Todos os direitos reservados.</span>
        <span>Site institucional com foco em IA aplicada, manejo e soluções operacionais.</span>
      </div>
    </footer>
  `;
}

function setupMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".site-nav a, .site-nav button").forEach((node) => {
    node.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const feedback = form.querySelector("[data-form-feedback]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (feedback) {
      feedback.textContent =
        "Mensagem preparada. Conecte este formulário a um e-mail, CRM ou automação para receber os leads da Avant.";
    }
    form.reset();
  });
}

function setupPlatformModal() {
  const modal = document.querySelector("[data-platform-modal]");
  const openButtons = document.querySelectorAll("[data-platform-modal-open]");
  const closeButtons = document.querySelectorAll("[data-platform-modal-close]");
  if (!modal || openButtons.length === 0) return;

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("platform-modal-open");
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("platform-modal-open");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

function hydrateDynamicFields() {
  document.querySelectorAll("[data-email]").forEach((node) => {
    node.textContent = siteConfig.email;
    node.setAttribute("href", `mailto:${siteConfig.email}`);
  });

  document.querySelectorAll("[data-whatsapp]").forEach((node) => {
    node.textContent = siteConfig.phoneDisplay;
    node.setAttribute("href", `https://wa.me/${siteConfig.phoneIntl}`);
  });

  const yearNode = document.querySelector("[data-current-year]");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
}

async function loadPlatformConfig(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Falha ao carregar ${path}`);
  }

  return response.json();
}

function renderPlatformCards(container, config) {
  const items = Array.isArray(config.links) ? config.links : [];
  if (items.length === 0) {
      container.innerHTML =
        '<article class="card"><h3>Nenhum link configurado</h3><p>Edite o arquivo config.json desta empresa para adicionar os ambientes externos.</p></article>';
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <a class="platform-tool-card" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}" />
          <div class="platform-tool-card__body">
            <h3>${escapeHtml(item.title)}</h3>
            ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
          </div>
        </a>
      `
    )
    .join("");
}

async function renderPlatformLinks() {
  const containers = document.querySelectorAll("[data-platform-config]");
  if (containers.length === 0) return;

  await Promise.all(
    [...containers].map(async (container) => {
      try {
        const config = await loadPlatformConfig(container.dataset.platformConfig);
        renderPlatformCards(container, config);
      } catch (error) {
        container.innerHTML =
          '<article class="card"><h3>Links indisponiveis</h3><p>Nao foi possivel carregar a configuracao desta empresa.</p></article>';
      }
    })
  );
}

document.addEventListener("DOMContentLoaded", async () => {
  applyTranslationGuard();
  buildHeader();
  buildFooter();
  hydrateDynamicFields();
  setupMenu();
  setupContactForm();
  setupPlatformModal();
  await renderPlatformLinks();
});
