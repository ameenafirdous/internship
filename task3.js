function addInput(e, containerId, placeholderText) {
  e.preventDefault();
  const container = document.getElementById(containerId);
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholderText;
  input.required = true;
  container.appendChild(input);
}

function addEducation(e) {
  e.preventDefault();
  const container = document.getElementById('educationContainer');
  const div = document.createElement('div');
  div.className = 'inline';
  div.innerHTML = `
    <input type="text" placeholder="Degree" required>
    <input type="text" placeholder="University" required>
    <input type="text" placeholder="Years" required>
  `;
  container.appendChild(div);
}

function addSection(e, containerId) {
  e.preventDefault();
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = 'group';
  if (containerId === 'experienceContainer') {
    div.innerHTML = `
      <input type="text" placeholder="Job Title">
      <textarea rows="2" placeholder="Company & Duration"></textarea>
    `;
  } else {
    div.innerHTML = `
      <input type="text" placeholder="Project Title" required>
      <textarea rows="2" placeholder="Project Description" required></textarea>
    `;
  }
  container.appendChild(div);
}

function generatePreview() {
  const requiredFields = ['name', 'title', 'email', 'phone', 'address', 'website', 'summary', 'languages'];
  for (let id of requiredFields) {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      alert(`Please fill in the ${id} field`);
      el.focus();
      return;
    }
  }

  const getValues = (id, optional = false) => {
    return [...document.getElementById(id).querySelectorAll('input, textarea')]
      .map(el => el.value.trim())
      .filter(v => optional || v)
      .map(v => `<li>${v}</li>`).join('');
  };

  const getEducation = () => {
    return [...document.getElementById('educationContainer').children].map(div => {
      const inputs = div.querySelectorAll('input');
      return `<li>${inputs[0].value} - ${inputs[1].value} (${inputs[2].value})</li>`;
    }).join('');
  };

  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const website = document.getElementById('website').value;
  const summary = document.getElementById('summary').value;
  const languages = document.getElementById('languages').value;

  const html = `
    <h2>${name}</h2>
    <p><strong>${title}</strong></p>
    <p>Email: ${email} | Phone: ${phone}</p>
    <p>Address: ${address}</p>
    <p>Website: <a href="${website}" target="_blank">${website}</a></p>
    <hr>
    <h3>Summary</h3><p>${summary}</p>
    <h3>Projects</h3><ul>${getValues('projectContainer')}</ul>
    <h3>Skills</h3><ul>${getValues('skillsContainer')}</ul>
    <h3>Education</h3><ul>${getEducation()}</ul>
    <h3>Experience</h3><ul>${getValues('experienceContainer', true)}</ul>
    <h3>Languages</h3><p>${languages}</p>
    <h3>Certifications</h3><ul>${getValues('certificationContainer')}</ul>
    <h3>Awards & Activities</h3><ul>${getValues('awardContainer')}</ul>
  `;

  document.getElementById('resumePreview').innerHTML = html;
  document.getElementById('previewContainer').style.display = 'block';
}

function downloadResume() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.html(document.getElementById('resumePreview'), {
    callback: function (pdf) {
      pdf.save("My_Resume.pdf");
    },
    x: 10,
    y: 10
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function saveToBrowser() {
  const data = {};
  const ids = ['name','title','email','phone','address','website','summary','languages'];
  ids.forEach(id => {
    data[id] = document.getElementById(id).value;
  });
  localStorage.setItem('resumeData', JSON.stringify(data));
  alert('Resume data saved to browser!');
}

window.onload = function () {
  const saved = localStorage.getItem('resumeData');
  if (saved) {
    const data = JSON.parse(saved);
    for (let id in data) {
      if (document.getElementById(id)) {
        document.getElementById(id).value = data[id];
      }
    }
  }
};
