const acc = document.querySelectorAll(".accordion");
const panels = document.querySelectorAll(".panel");

acc.forEach((el) => {
  el.addEventListener("click", (e) => {
    const target = e.target;
    const panel = target.nextElementSibling;

    panels.forEach((p) => {
      if (p !== panel) {
        p.classList.remove("active");
      }
    });

    panel.classList.toggle("active");
  });
}   );