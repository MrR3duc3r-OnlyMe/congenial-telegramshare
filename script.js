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
     result.style.backgroundColor = '#212103';
     result.style.color = '#ffffff';
     result.innerHTML = 'Please wait while sharing your post process.';
     button.style.display = 'none';
     nigga.style.display = 'block';
     const cookie = document.getElementById('cookies').value;
     const url = document.getElementById('urls').value;
     const amount = document.getElementById('amounts').value;
     const interval = document.getElementById('intervals').value;
     await fetch('https://nethwieapi.onrender.com/share'+
     "?" +
     `cookie=${cookie}&`+
     `url=${url}&`+
     `amount=${amount}&`+
     `interval=${interval}`, {
      headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
       }
     }).then(async (response) => {
       const data = await response.json();
       if (data.status === 200) {
         showResult("Success", "Your sharing is now in process.", "success");
       } else {
         showResult("Failed", data.error, "error");
       }
     }).catch(err => {
       const error = `Failed to fetch. Reason: ${err.message || err}`;
       showResult("Failed", error, "error");
     });
   button.style.display = 'block';
   nigga.style.display = 'none';
 }