document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("FAFPS0wg0lyBrToe8"); // your public key here
  
    const form = document.getElementById("contact-form");
  
    if (!form) {
      console.error("Form element not found!");
      return;
    }
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (!name || !email || !message) {
        showPopup("❌ Please fill in all fields.");
        return;
      }
  
      if (!isValidEmail(email)) {
        showPopup("❌ Invalid email address format.");
        return;
      }
  
      const params = {
        name: name,
        email: email,
        message: message
      };
  
      // Send the email using EmailJS with the correct template ID
      emailjs.send("service_xjszysl", "template_k07e3gf", params)
        .then(response => {
          console.log("SUCCESS!", response.status, response.text);
          showPopup("✅ Message sent successfully!");
          form.reset();  // Reset form after successful submission
        })
        .catch(error => {
          console.error("FAILED...", error);
          showPopup("❌ Failed to send message. Please try again later.");
          console.log("Error details: ", error);
        });
    });
  
    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    function showPopup(message) {
      // Create popup if not exists
      let popup = document.getElementById("popup-message");
      if (!popup) {
        popup = document.createElement("div");
        popup.id = "popup-message";
        popup.style.position = "fixed";
        popup.style.top = "20px";
        popup.style.left = "50%";
        popup.style.transform = "translateX(-50%)";
        popup.style.backgroundColor = "#333";
        popup.style.color = "#fff";
        popup.style.padding = "10px 20px";
        popup.style.borderRadius = "8px";
        popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
        popup.style.zIndex = "1000";
        popup.style.fontSize = "16px";
        document.body.appendChild(popup);
      }
      
      popup.textContent = message;
      popup.style.display = "block";
  
      // Hide popup after 3 seconds
      setTimeout(() => {
        popup.style.display = "none";
      }, 5000);
    }
  });
