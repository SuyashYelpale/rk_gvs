let isAdmin = false;
let galleryData = JSON.parse(localStorage.getItem("galleryData")) || [
    { src: "images/edu1.jpg", category: "education", caption: "Computer Literacy Classes" },
    { src: "images/edu2.jpg", category: "education", caption: "Books Distribution Drive" },
    { src: "images/health1.jpg", category: "health", caption: "Free Eye Checkup Camp" },
    { src: "images/health2.jpg", category: "health", caption: "Maternal Health Workshop" },
    { src: "images/farm1.jpg", category: "farming", caption: "Organic Fertilizer Training" },
    { src: "images/farm2.jpg", category: "farming", caption: "Drip Irrigation Installation" }
];

// Function to render gallery
function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    grid.innerHTML = "";

    galleryData.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.dataset.category = item.category;

        div.innerHTML = `
            ${isAdmin ? `<button class="delete-btn" onclick="deleteImage(${index})">✕</button>` : ""}
            <img src="${item.src}">
            <div class="overlay"><span>${item.caption}</span></div>
        `;

        grid.appendChild(div);
    });
}

renderGallery();

        /* =====================
        GALLERY FILTER
        ===================== */
        const filterCards = document.querySelectorAll('.topic-card');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterCards.forEach(card => {
            card.addEventListener('click', () => {
                filterCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                const filter = card.dataset.filter;
                galleryItems.forEach(item => {
                    item.style.display =
                        filter === 'all' || item.dataset.category === filter
                        ? 'block'
                        : 'none';
                });
            });
        });


    /* Modal Controls */
    function openModal(id) {
        document.getElementById(id).classList.remove('hidden');
    }
    function closeModal(id) {
        document.getElementById(id).classList.add('hidden');
    }

    /* Admin Login */
    document.getElementById('adminBtn').onclick = () => openModal('adminModal');
    document.getElementById('addImageBtn').onclick = () => openModal('uploadModal');

function loginAdmin() {
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;

    if (user === "admin" && pass === "1234") {
        isAdmin = true;
        closeModal('adminModal');

        document.getElementById('adminBtn').classList.add('hidden');
        document.getElementById('logoutBtn').classList.remove('hidden');
        document.getElementById('addImageBtn').classList.remove('hidden');

        renderGallery();
        alert("Admin Logged In");
    } else {
        alert("Invalid Credentials");
    }
}

function logoutAdmin() {
    isAdmin = false;

    document.getElementById('adminBtn').classList.remove('hidden');
    document.getElementById('logoutBtn').classList.add('hidden');
    document.getElementById('addImageBtn').classList.add('hidden');

    renderGallery();
    alert("Logged Out Successfully");
}



/* Add Image */
function addImage() {
    const fileInput = document.getElementById('imageFile');
    const caption = document.getElementById('imageCaption').value;
    const category = document.getElementById('imageCategory').value;

    if (!fileInput.files[0]) {
        alert("Please select an image");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        galleryData.push({
            src: e.target.result,
            category: category,
            caption: caption
        });

        localStorage.setItem("galleryData", JSON.stringify(galleryData));
        renderGallery();
    };
    reader.readAsDataURL(fileInput.files[0]);

    closeModal('uploadModal');
    fileInput.value = '';
    document.getElementById('imageCaption').value = '';
}

/* Delete Image */
function deleteImage(index) {
    if (confirm("Are you sure you want to delete this image?")) {
        galleryData.splice(index, 1);
        localStorage.setItem("galleryData", JSON.stringify(galleryData));
        renderGallery();
    }
}


    /* Enable delete on existing images */
    function enableDeleteButtons() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (!item.querySelector('.delete-btn')) {
                const btn = document.createElement('button');
                btn.className = 'delete-btn';
                btn.innerHTML = '✕';
                btn.onclick = () => deleteImage(btn);
                item.appendChild(btn);
            }
        });
    }
