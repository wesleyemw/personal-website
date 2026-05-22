document.addEventListener("DOMContentLoaded", () => {
  const themeBtnToggle = document.querySelector("button[data-toggle]");
  let toggle = true;
  themeBtnToggle.addEventListener("click", function (ev) {
    // console.log("button clicked", ev.target);
    if (toggle) {
      toggle = !toggle;
      setTheme("dark");
    } else {
      toggle = !toggle;
      setTheme("light");
    }
  });
});

// const getCurrentScheme = function () {
//   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//     return "dark";
//   }
//   return "light";
// };

const setTheme = (theme) => {
  document.body.dataset.theme = theme;
};

// window
//   .matchMedia("(prefers-color-scheme: dark)")
//   .addEventListener("change", function ({ matches }) {
//     if (matches) {
//       console.log("change to dark mode!");
//     } else {
//       console.log("change to light mode!");
//     }
//   });
