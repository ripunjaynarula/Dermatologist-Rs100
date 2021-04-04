console.log("Service Worker Loaded...");

let id ='';
let email = '';
self.addEventListener("push", e => {
  id = data.id;
  email = data.email;
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: `New consultation: ${data.description}. Click here to accept consultation.`,
    // icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});

self.onnotificationclick = async function(event) {
  const requestOptions = {
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({cid: id, email: email})
  }

  let res = await fetch('http://www.localhost:5000/acceptConsultation', requestOptions);
  res = JSON.parse(await res.text());
  console.log(res)
  event.showNotification.close();
  event.waitUntil(
    clients.openWindow('http://localhost:3000/login')
  );
};