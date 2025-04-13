 // JavaScript for client-side validation
 const loginForm = document.getElementById('loginForm');
 const errorMessage = document.getElementById('errorMessage');

 // Mock admin credentials
 const adminCredentials = {
     username: "admin",
     password: "password123"
 };

 loginForm.addEventListener('submit', function(e) {
     e.preventDefault();

     const username = document.getElementById('username').value;
     const password = document.getElementById('password').value;

     // Simple authentication check
     if (username === adminCredentials.username && password === adminCredentials.password) {
         alert('Login successful!');
         // Redirect to admin dashboard (replace 'dashboard.html' with your actual page)
         window.location.href = "dashboard.html";
     } else {
         errorMessage.style.display = 'block';
     }
 });