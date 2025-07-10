let students = JSON.parse(localStorage.getItem("students")) || [];
let sortMarksAsc = true;
let sortYearAsc = true;

const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("search");
const yearFilter = document.getElementById("yearFilter");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const student = {
    name: form.name.value,
    regNo: form.regNo.value,
    dept: form.dept.value,
    year: parseInt(form.year.value),
    marks: parseInt(form.marks.value),
  };

  const exists = students.find(stu => stu.regNo === student.regNo);
  if (exists) return alert("Reg No already exists!");

  students.push(student);
  saveAndRender();
  form.reset();
});

function saveAndRender() {
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

function renderTable(data = students) {
  tableBody.innerHTML = "";
  data.forEach((stu, index) => {
    const row = `
      <tr>
        <td>${stu.name}</td>
        <td>${stu.regNo}</td>
        <td>${stu.dept}</td>
        <td>${stu.year}</td>
        <td>${stu.marks}</td>
        <td class="actions">
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function deleteStudent(index) {
  if (confirm("Are you sure?")) {
    students.splice(index, 1);
    saveAndRender();
  }
}

function editStudent(index) {
  const stu = students[index];
  form.name.value = stu.name;
  form.regNo.value = stu.regNo;
  form.dept.value = stu.dept;
  form.year.value = stu.year;
  form.marks.value = stu.marks;
  students.splice(index, 1);
  saveAndRender();
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = students.filter(
    s => s.name.toLowerCase().includes(keyword) || s.regNo.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

yearFilter.addEventListener("change", () => {
  const year = parseInt(yearFilter.value);
  const filtered = year ? students.filter(s => s.year === year) : students;
  renderTable(filtered);
});

document.getElementById("sortMarks").addEventListener("click", () => {
  students.sort((a, b) => sortMarksAsc ? a.marks - b.marks : b.marks - a.marks);
  sortMarksAsc = !sortMarksAsc;
  saveAndRender();
});

document.getElementById("sortYear").addEventListener("click", () => {
  students.sort((a, b) => sortYearAsc ? a.year - b.year : b.year - a.year);
  sortYearAsc = !sortYearAsc;
  saveAndRender();
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("exportCSV").addEventListener("click", () => {
  let csv = "Name,Reg No,Dept,Year,Marks\n";
  students.forEach(stu => {
    csv += `${stu.name},${stu.regNo},${stu.dept},${stu.year},${stu.marks}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

renderTable();
