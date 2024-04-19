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

// darkmode
// Ambil elemen toggle dan tema yang akan diubah
const darkModeToggle = document.getElementById("darkMode");
const body = document.body;

// Cek status toggle saat halaman dimuat
if (localStorage.getItem("darkMode") === "enabled") {
  enableDarkMode();
}

// Fungsi untuk mengaktifkan dark mode
function enableDarkMode() {
  body.classList.add("darkMode");
  localStorage.setItem("darkMode", "enabled");
}

// Fungsi untuk menonaktifkan dark mode
function disableDarkMode() {
  body.classList.remove("darkMode");
  localStorage.setItem("darkMode", null);
}

// Event listener untuk toggle switch
darkModeToggle.addEventListener("change", () => {
  darkModeToggle.checked ? enableDarkMode() : disableDarkMode();
});


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


// Sign Logic (START)
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let writingMode = false;
let lastX, lastY; // Store the previous position

// Adapt getCursorPosition for touch events
const getCursorPosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  let positionX, positionY;

  if (event.touches) {
    positionX = event.touches[0].clientX - rect.left;
    positionY = event.touches[0].clientY - rect.top;
  } else {
    positionX = event.clientX - rect.left;
    positionY = event.clientY - rect.top;
  }

  return [positionX, positionY];
}

// Handle touch events
const handleTouchStart = (event) => {
  event.preventDefault(); // Prevent scrolling when touching canvas
  handlePointerDown(event);
}

const handleTouchMove = (event) => {
  event.preventDefault(); // Prevent scrolling when touching canvas
  handlePointerMove(event);
}

const handleTouchEnd = (event) => {
  event.preventDefault();
  handlePointerUp();
}

const handlePointerDown = (event) => {
  writingMode = true;
  ctx.beginPath();
  const [positionX, positionY] = getCursorPosition(event);
  ctx.moveTo(positionX, positionY);
  lastX = positionX;
  lastY = positionY;
  // Ketika pengguna mulai menandatangani, ubah teks tombol menjadi 'Clear'
  clrButton.textContent = 'Clear';
}

const handlePointerUp = () => {
  writingMode = false;
  // Ubah teks tombol menjadi 'Save' setelah pengguna selesai menandatangani
  saveButton.textContent = 'Save Signature';
}

const handlePointerMove = (event) => {
  if (!writingMode) return;
  const [positionX, positionY] = getCursorPosition(event);
  ctx.lineTo(positionX, positionY);
  ctx.stroke();
  lastX = positionX;
  lastY = positionY;
}

canvas.addEventListener('pointerdown', handlePointerDown, { passive: false });
canvas.addEventListener('pointerup', handlePointerUp, { passive: false });
canvas.addEventListener('pointermove', handlePointerMove, { passive: false });

// Adding touch event listeners
canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

ctx.lineWidth = 2;
ctx.lineJoin = ctx.lineCap = 'round';

const saveButton = document.querySelector('.clear-button'); // Tombol yang awalnya untuk 'Clear' sekarang untuk 'Save'
const clrButton = document.querySelector('.submit-button');
// Ubah event listener untuk tombol save
saveButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (saveButton.textContent === 'Save Signature') {
    const imageURL = canvas.toDataURL();
    const downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = 'digitalSignature.png'; // Set the desired file name
    downloadLink.click(); // Trigger download
  }
});

// Fungsionalitas untuk menghapus gambar pada canvas
clrButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (clrButton.textContent === 'Clear') {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus seluruh isi canvas
  }
});
// Sign Logic (END)
