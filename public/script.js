function showResult(title, message, icon) {
  Swal.fire({
    title: title,
    html: message,
    icon: icon,
  //  showCancelButton: true,
    confirmButtonColor: "#0061ff",
  // cancelButtonColor: "#d33",
    confirmButtonText: "Okay"
  });
}

async function submitForm() {
   event.preventDefault();
   const result = document.getElementById('result');
   const button = document.getElementById('submit-button');
   try {
     result.style.display = 'block';
     button.style.display = 'none';
     const response = await fetch('/submit', {
       method: 'POST',
       body: JSON.stringify({
         cookie: document.getElementById('cookies').value,
         url: document.getElementById('urls').value,
         amount: document.getElementById('amounts').value,
         interval: document.getElementById('intervals').value,
       }),
       headers: {
         'Content-Type': 'application/json',
       },
     });
     const data = await response.json();

     if (data.status === 200) {
       result.style.backgroundColor = '#32ff0dc7';
       result.style.color = '#ffffff';
       result.innerHTML = 'Submitted successfully!';
       button.style.display = 'block';
       } else {
       result.style.backgroundColor = '#3D1619';
       result.style.color = '#ffffff';
       result.innerHTML = 'Error: ' + data.error;
       button.style.display = 'block';
     }
   } catch (e) {
     console.error(e);
   }
 }