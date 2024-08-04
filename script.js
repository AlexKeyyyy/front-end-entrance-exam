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

document.getElementById("downloadPDF").addEventListener("click", function () {
  var element = document.body;
  var opt = {
    margin: [0.5, 0.5, 0.5, 0.5], // Устанавливаем поля
    filename: "CV_Alex_Koba.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }, // Изменяем формат на A4
    pagebreak: { mode: ["avoid-all"] }, // Избегаем разрыва секций
  };

  html2pdf().set(opt).from(element).save();
});
