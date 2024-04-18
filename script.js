// UI Logic Content (START)
const dashboard = document.querySelector('.dashBtn')
const allButton = document.querySelectorAll('.dashBtn')
const allContent = document.querySelectorAll('.dashContent')
const hammenu = document.querySelector('.ham-menu')
const sidebar = document.querySelector('.sidebar')

hammenu.addEventListener('click', () => handleSidebarToggle());

function handleSidebarToggle() {
  hammenu.classList.toggle('active-menu');
  sidebar.classList.toggle('active-bar');
}

function setPages(btn) {
  const button = btn.closest('div');
  allButton.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  allContent.forEach(content => content.style.display = "none")
  const activeId = button.id.replace('btn', 'page')
  document.getElementById(activeId).style.display = "block"

  // Save the active page id to local storage
  localStorage.setItem('activePageId', activeId);
  handleSidebarToggle(); // toggle sidebar every page changes
}

// Set the active page based on saved value in local storage
document.addEventListener('DOMContentLoaded', () => {
  const activePageId = localStorage.getItem('activePageId');
  if (activePageId) {
    document.getElementById(activePageId).style.display = "block";
    const activeBtnId = activePageId.replace('page', 'btn');
    document.getElementById(activeBtnId).classList.add('active');
  } else {
    allContent[0].style.display = "block";
    allButton[0].classList.add('active');
  }
});

allButton.forEach(btn => btn.setAttribute("onclick", "setPages(this)"))
// UI Logic Content (END)


// TODO - List Logic (START)
const TODOBTN = document.getElementById('todo-btn')
TODOBTN.addEventListener('click', function() {
  var itemText = document.getElementById('todo-input').value;
  if (itemText) {
      addItem(itemText);
      document.getElementById('todo-input').value = ''; // Mengosongkan input setelah ditambahkan
  }
});

const deleteItem = (btn) => {
  console.log(btn);
  const li = btn.closest("li");
  li.remove();
}

const addItem = (text) => {
  var li = document.createElement('li');
  const editBtn = document.createElement('button');
  editBtn.textContent = "Edit";
  editBtn.onclick = function() { editItem(editBtn); };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Hapus";
  deleteBtn.onclick = function() { deleteItem(deleteBtn); };

  li.textContent = text;
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  document.getElementById('todo-list').appendChild(li);
}

const editItem = (editBtn) => {
  const li = editBtn.closest("li");
  const text = li.childNodes[0].nodeValue.trim();
  const input = document.createElement('input');
  input.type = 'text';
  input.value = text;
  li.insertBefore(input, li.firstChild);
  li.removeChild(li.childNodes[1]); // Menghapus teks lama

  const saveBtn = document.createElement('button');
  saveBtn.textContent = "Save";
  saveBtn.onclick = function() { saveItem(saveBtn); };
  li.appendChild(saveBtn);

  // Sembunyikan tombol edit dan hapus selama mode edit
  editBtn.style.display = 'none';
  li.childNodes[2].style.display = 'none'; // Tombol hapus
}

const saveItem = (saveBtn) => {
  const li = saveBtn.closest("li");
  const input = li.querySelector('input');
  const newText = input.value;

  // Membuat teks baru dan menggantikan input field dengan teks
  li.insertBefore(document.createTextNode(newText + " "), li.firstChild);
  li.removeChild(input);

  // Menampilkan kembali tombol hapus
  li.childNodes[2].style.display = '';

  // Mengganti tombol save dengan tombol edit yang sudah ada
  // Pastikan tombol edit hanya satu yang ditampilkan
  saveBtn.textContent = "Edit";
  saveBtn.onclick = function() { editItem(saveBtn); };

  // Tidak perlu menambahkan tombol edit baru, cukup ubah fungsi dan teks pada tombol save menjadi edit
}
// TODO - List Logic (END)