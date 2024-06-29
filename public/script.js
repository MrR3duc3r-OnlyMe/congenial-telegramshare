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
     result.style.backgroundColor = '#212103';
     result.style.color = '#ffffff';
     result.innerHTML = 'Please wait while sharing your post process.';
     result.style.display = 'block';
     button.style.display = 'none';
     const response = await fetch('https://sharebooster.neth.workers.dev/submit', {
       method: 'POST',
       body: JSON.stringify({
         cookie: document.getElementById('cookies').value,
         url: document.getElementById('urls').value,
         amount: document.getElementById('amounts').value,
         interval: document.getElementById('intervals').value,
       }),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         
         },
     });
     const data = await response.json();

     if (data.status === 200) {
       result.style.backgroundColor = '#32ff0dc7';
       result.style.color = '#ffffff';
       result.innerHTML = data.message;
       button.style.display = 'block';
       } else {
       result.style.backgroundColor = '#3D1619';
       result.style.color = '#ffffff';
       result.innerHTML = 'Error: ' + data.error;
       button.style.display = 'block';
     }
   } catch (e) {
     console.error(e);
     result.style.backgroundColor = '#3D1619';
     result.style.color = '#ffffff';
     result.innerHTML = 'Error: ' + e.message;
     button.style.display = 'block';
   }
   setTimeout(() => result.style.display = 'none', 5*1000);
 }