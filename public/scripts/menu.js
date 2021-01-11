// *** TRIED DOING AJAX BUT IGNORE ALL THIS I WAS JUST TESTING STUFF

// const createMenuElement = function (menu) {
//   const { name, photo_url, price } = menu.item;
//   const $menu = `
//   <article>
//     <header>
//       <div>
//         <img src="${photo_url}"><span class="name">${name}</span>
//       </div>
//       <span class="username">${price}</span>
//     </header>
//     </article>
//   `;
//   return $menu;
// };

// const loadMenus = function () {
//   $.ajax("/tweets", { method: "GET" })
//     .then((response) => {
//       renderMenus(response);
//     })
//     .catch((error) => {
//       alertMessage("Error loading Menus. Try again later");
//     });
// };

// const renderMenus = function (Menus) {
//   for (const menu of Menus) {
//     const $newMenu = createMenuElement(menu);
//     $("#menu-container").append($newMenu);
//   }
// };

// $(document).ready(function () {
//   alert("loaded!");
//   loadMenus();
// });
