document.querySelectorAll("nav > ul > li > a").forEach((menuOption) => {
  menuOption.addEventListener("click", function () {
    document.querySelectorAll(`nav > ul > li > a`).forEach((option) => {
      option.classList.remove("selected");
    });
    this.classList.add("selected");

    document.title = `${this.innerText}`;

    const dataTarget = this.getAttribute("data-target");

    document.querySelector(`#${dataTarget}`).classList.remove("hidden");
    document.querySelector(`#${dataTarget}`).setAttribute("aria-hidden", "false");
    document.querySelectorAll(`.page:not(#${dataTarget})`).forEach((page) => {
      page.classList.add("hidden");
      page.setAttribute("aria-hidden", "true");
    });
  });
});
