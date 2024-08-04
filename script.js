document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[contenteditable]").forEach((element) => {
    const key = element.tagName + "-" + element.getAttribute("data-attr");

    element.addEventListener("input", () => {
      localStorage.setItem(key, element.innerText);
    });

    const savedData = localStorage.getItem(key);
    if (savedData) {
      element.innerText = savedData;
    }
  });
});
