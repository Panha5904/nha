document.addEventListener("DOMContentLoaded", function () {
  const exportBtn = document.getElementById("export-csv");
  const copyBtn = document.getElementById("copy-sheets");
  const languagesTable = document.getElementById("languages-table");

  // Fetch languages from backend
  async function fetchLanguages() {
    try {
      const response = await fetch("../backend/lessons_api.php");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching languages:", error);
      return [];
    }
  }

  // Render languages in the table
  async function renderLanguages() {
    const languages = await fetchLanguages();
    languagesTable.innerHTML = languages
      .map(
        (lang) => `
            <tr class="align-top">
                <td class="py-4 font-semibold">
                    <div class="flex items-center gap-3">
                        <img src="${lang.logo_url}" alt="${lang.name} Logo" class="logo-container">
                        <span>${lang.name}</span>
                    </div>
                </td>
                <td class="py-4 text-slate-600">${lang.use_cases}</td>
                <td class="py-4 text-slate-600">${lang.recommended_courses}</td>
            </tr>
        `
      )
      .join("");
  }

  // Initial render
  renderLanguages();

  function gatherRows() {
    const rows = [];
    const trs = languagesTable.querySelectorAll("tr");
    Array.from(trs).forEach((tr) => {
      const cols = Array.from(tr.querySelectorAll("td")).map((td) =>
        td.innerText.trim().replace(/\s+/g, " ")
      );
      if (cols.length) rows.push(cols);
    });
    return rows;
  }

  function toCSV(rows) {
    return rows
      .map((r) => r.map((c) => '"' + c.replace(/"/g, '""') + '"').join(","))
      .join("\n");
  }

  exportBtn.addEventListener("click", () => {
    const rows = gatherRows();
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "weblearning_lessons.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  copyBtn.addEventListener("click", async () => {
    const rows = gatherRows();
    const tsv = rows.map((r) => r.join("\t")).join("\n");
    try {
      await navigator.clipboard.writeText(tsv);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy for Sheets"), 2000);
    } catch (e) {
      alert("Could not copy to clipboard.");
    }
  });
});
