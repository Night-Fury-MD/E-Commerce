function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
let products = [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let users = JSON.parse(localStorage.getItem("users")) || [];
let authMode = "login";

const container = document.getElementById("products-container");

async function getproduct() {
  await delay(1000);
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to catch");
    const data = await res.json();
    products = data;
    updateAuthUI();
  } catch (error) {
    container.innerHTML = `<p class="loading-text" style="color:red;"> Error: ${error.message} ⚠️</p>`;
  }
}

async function renderProducts(dataList) {
  if (dataList.length == 0) {
    container.innerHTML = `<p class="loading-text"> No products found matching your criteria ❌</p>`;
    return;
  }
  container.innerHTML = dataList
    .map(
      (element) => `
        <div class="product-card">
            <img src="${element.image}" alt="${element.title}">
            <div>
                <span class="category">${element.category}</span>
                <h3>${element.title}</h3>
            </div>
            <p class="price">$${element.price}</p>
            ${
              currentUser?.role === "admin"
                ? `
            <div class="admin-actions">
            <button class="btn-edit" onclick="edit(${element.id})">Edit</button>
            <button class="btn-delete" onclick="deleteProduct(${element.id})">Delete</button>
            </div>
             `
                : ""
            }
        </div>
    `,
    )
    .join("");
}

function applyFiltersAndSort() {
  let res = [...products];
  const query = document.getElementById("search-input").value.toLowerCase();
  const category = document.getElementById("category-filter").value;
  const order = document.getElementById("sort-select").value;
  if (query) {
    res = res.filter((pro) => pro.title.toLowerCase().includes(query));
  }
  if (category) {
    res = res.filter(
      (pro) => pro.category.toLowerCase() == category.toLowerCase(),
    );
  }
  if (order == "asc") {
    res.sort((a, b) => a.price - b.price);
  }
  if (order == "desc") {
    res.sort((a, b) => b.price - a.price);
  }
  renderProducts(res);
}

function updateAuthUI() {
  const statusB = document.getElementById("auth-status");
  const addBtn = document.getElementById("add-product-btn");
  const openAuthBtn = document.getElementById("open-auth-btn");
  const logoutBtn = document.getElementById("logout-btn");
  if(currentUser){
    if(currentUser.role=="admin"){
      statusB.innerHTML = `Current User: <b style="color:#e67e22;">Admin 👨‍💼 (${currentUser.username})</b>`;
      addBtn.style.display = "flex";
    }
    else {
      statusB.innerHTML = `Current User: <b style="color:#3498db;">Customer 👤 (${currentUser.username})</b>`;
      addBtn.style.display = "none";
    }
    openAuthBtn.style.display = "none";
    logoutBtn.style.display = "flex";
  }
  else {
    statusB.innerHTML = `Current User: <b>Guest 🚶‍♂️</b>`;
    addBtn.style.display = "none";
    openAuthBtn.style.display = "flex";
    logoutBtn.style.display = "none";
  }
  applyFiltersAndSort();
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUser = null;
  updateAuthUI();
  alert("Logged out successfully! 🚪");
}

function openAuthModal() {
  document.getElementById("auth-modal").style.display = "flex";
  setAuthMode("login"); 
}

function closeAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
  document.getElementById("auth-username").value = "";
  document.getElementById("auth-password").value = "";
}

function toggleAuth() {
  if (authMode === "login") {
    setAuthMode("register");
  } else {
    setAuthMode("login");
  }
}

function setAuthMode(mode) {
  authMode = mode;
  const title = document.getElementById("auth-modal-title");
  const submitBtn = document.getElementById("auth-submit-btn");
  const roleSelect = document.getElementById("auth-role");
  const toggleText = document.getElementById("toggle-auth-mode");

  if (mode === "register") {
    title.innerText = "Register New Account 📝";
    submitBtn.innerText = "Register 🎉";
    roleSelect.style.display = "block";
    toggleText.innerText = "Already have an account? Login here";
  } else {
    title.innerText = "Login 🔐";
    submitBtn.innerText = "Login";
    roleSelect.style.display = "none";
    toggleText.innerText = "Don't have an account? Register here";
  }
}

function handleAuthSubmit() {
  const username = document.getElementById("auth-username").value.trim();
  const password = document.getElementById("auth-password").value;
  const role = document.getElementById("auth-role").value;
  if (!username || !password) {
    alert("Please fill all fields! ⚠️");
    return;
  }
  if (authMode === "register") {
    const userExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (userExists) {
      alert("Username already taken! ❌");
      return;
    }
    const newUser = { username, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully! Now you can Login. 🎉");
    setAuthMode("login");
  }
   else {
    const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (!foundUser) {
      alert("Invalid Username or Password! ❌");
      return;
    }
    currentUser = foundUser;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    closeAuthModal();
    updateAuthUI();
    alert(`Welcome back, ${currentUser.username}! 👋`);
  }
}

function edit(id) {
  if (currentUser?.role != "admin") {
    alert(" Access Denied! Admins only 🚨");
    return;
  }
  const product = products.find((p) => p.id == id);
  if (!product) return;
  const title = prompt("Enter new title : ", product.title);
  if (title) {
    product.title = title;
    applyFiltersAndSort();
  }
}

function deleteProduct(id) {
  if (currentUser?.role != "admin") {
    alert(" Access Denied! Admins only 🚨");
    return;
  }
  const confirmm = confirm("Are you sure you want to delete this product?");
  if (confirmm) {
    products = products.filter((pro) => pro.id != id);
    applyFiltersAndSort();
  }
}

function addproduct() {
  if (currentUser?.role != "admin") {
    alert(" Access Denied! Admins only 🚨");
    return;
  }
  document.getElementById("product-modal").style.display = "flex";
}

function savem() {
  const title = document.getElementById("modal-title").value.trim();
  const price = document.getElementById("modal-price").value;
  const category = document.getElementById("modal-category").value;
  if (!title || !price || !category) {
    alert("Please fill all fields! ⚠️");
    return;
  }
  const product = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    title: title,
    category: category,
    price: parseFloat(price),
    image:
      "https://img.freepik.com/premium-vector/noor-name-arabic-diwani-calligraphy_587453-1043.jpg?w=740",
  };
  products.unshift(product);
  applyFiltersAndSort();
  closem();
  alert("Product Added Successfully! 🎉");
}

function closem() {
  document.getElementById("product-modal").style.display = "none";
  document.getElementById("modal-title").value = "";
  document.getElementById("modal-price").value = "";
  document.getElementById("modal-category").value = "";
}

document.getElementById("search-input").addEventListener("input", applyFiltersAndSort);
document.getElementById("category-filter").addEventListener("change", applyFiltersAndSort);
document.getElementById("sort-select").addEventListener("change", applyFiltersAndSort);
document.getElementById("add-product-btn").addEventListener("click", addproduct);
document.getElementById("save-product-btn").addEventListener("click", savem);
document.getElementById("cancel-product-btn").addEventListener("click", closem);
document.getElementById("open-auth-btn").addEventListener("click", openAuthModal);
document.getElementById("auth-cancel-btn").addEventListener("click", closeAuthModal);
document.getElementById("toggle-auth-mode").addEventListener("click", toggleAuth);
document.getElementById("auth-submit-btn").addEventListener("click", handleAuthSubmit);
document.getElementById("logout-btn").addEventListener("click", logout);
getproduct();
