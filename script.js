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

document
  .getElementById("downloadPDF")
  .addEventListener("click", async function () {
    const { jsPDF } = window.jspdf;

    // Создайте новый экземпляр jsPDF
    const doc = new jsPDF();

    // Получите первую секцию
    const section1 = document.getElementById("section1");
    const section2 = document.getElementById("section2");
    const section3 = document.getElementById("section3");

    // Функция для добавления секции в PDF
    const addSectionToPDF = async (element) => {
      return new Promise((resolve) => {
        html2canvas(element, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/jpeg");
          doc.addImage(imgData, "JPEG", 0, 0);
          doc.addPage();
          resolve();
        });
      });
    };

    // Добавляем первую и вторую секции на одну страницу
    await addSectionToPDF(section1);
    await addSectionToPDF(section2);

    // Удаляем последнюю пустую страницу
    doc.deletePage(doc.internal.getNumberOfPages());

    // Добавляем третью секцию на новую страницу
    doc.addPage();
    await addSectionToPDF(section3);

    // Сохраняем PDF
    doc.save("CV_Alex_Koba.pdf");
  });
