// const routes = {
//   "/": "/home.html",
//   "/products": "/products.html",
//   "/about": "/pages/about.html",
//   "/admin": "/pages/admin.html",
// };

// const pageScripts = {
//   "/": initHome,
//   "/products": initProducts,
//   "/admin": initAdmin
// };

// const app = document.getElementById("app");

// function normalizePath(path) {
//   return path.replace(/\/+$/, "") || "/";
// }

// async function navigateTo(url, addToHistory = true) {
//   const parsedUrl = new URL(url, window.location.origin);
//   const path = normalizePath(parsedUrl.pathname);

//   const route = routes[path] || routes["/"];

//   const res = await fetch(route);
//   const html = await res.text();

//   app.innerHTML = html;

//   if (addToHistory) {
//     window.history.pushState({}, "", url);
//   }

//   window.scrollTo({ top: 0 });
//   pageScripts[path]?.();
// }

// function handleLinks() {
//   console.log("INIT")
//   document.body.addEventListener("click", e => {
//     const link = e.target.closest("a[data-link]");
//     if (!link) return;

//     e.preventDefault();
//     navigateTo(link.getAttribute("href"));
//   });
// }

// window.addEventListener("popstate", () => {
//   navigateTo(window.location.pathname + window.location.search, false);
// });

// // INIT
// navigateTo(window.location.pathname + window.location.search, false);
// handleLinks();
