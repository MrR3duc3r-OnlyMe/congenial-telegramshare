function showResult(title, message, icon) {
  Swal.fire({
    title: title,
    html: message,
    icon: icon,
    background: "#141A25 url(dg.svg)",
  //  showCancelButton: true,
    confirmButtonColor: "#042970",
  // cancelButtonColor: "#d33",
    confirmButtonText: "Okay"
  });
}

async function submitForm() {
   event.preventDefault();
   const result = document.getElementById('result');
   const nigga = document.getElementById('nigga');
   const button = document.getElementById('submit-button');
   try {
     result.style.backgroundColor = '#212103';
     result.style.color = '#ffffff';
     result.innerHTML = 'Please wait while sharing your post process.';
     button.style.display = 'none';
     nigga.style.display = 'block';
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
       showResult("Success", data.message, "success");
       button.style.display = 'block';
       } else {
       showResult("Failed", data.error, "error");
       button.style.display = 'block';
     }
   } catch (e) {
     console.error(e);
     showResult("Failed", e.message, "error");
     button.style.display = 'block';
   }
   nigga.style.display = 'none';
 }