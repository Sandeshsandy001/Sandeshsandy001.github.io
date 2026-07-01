// menu or hamburger button toggle
const menu=document.getElementById("menu");
const nav=document.getElementById("navigation");

menu.addEventListener("click", ()=>{
    nav.classList.toggle("active");
});

// function validate(){
//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("message").value;

   
//    if (!name || name.length < 8){
//        alert("Your Name must be at least 8 char.");
//        return false;
//    }

//    if (!email.includes("@")){
//        alert("Invalid Email");
//        return false;
//    }

//    if(!password || password.length < 6){
//     alert("Invalid Password");
//     return false;
//    }

//    alert("Form Submitted successfully.")
//    return true;
// }



  // Change this to your actual backend URL
  const BACKEND_URL = 'https://portfolio-backend-oj6i.onrender.com'; // or your website URL

  document.getElementById('notes-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageValue = document.getElementById('message').value; // Unique variable for the text value
    const submitBtn = document.getElementById('submit-btn');

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Submitting...';

    try {
      const response = await fetch(`${BACKEND_URL}/api/submit-note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message: messageValue }) // Sends text cleanly
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ ' + (data.message || 'Note submitted successfully!'));
        document.getElementById('notes-form').reset();
      } else {
        alert('❌ Error: ' + (data.error || 'Failed to submit'));
      }
    } catch (error) {
      alert('❌ Connection error. Make sure your backend is running.');
      console.error('Error:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '📤 Submit Note';
    }
});