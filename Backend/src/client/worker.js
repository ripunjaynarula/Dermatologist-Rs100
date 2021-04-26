console.log("Service Worker Loaded...");

let id = '';
let email = '';
self.addEventListener("push", e => {
    const data = e.data.json();
    id = data.id;
    email = data.email;
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: `New consultation: ${data.description}. Click here to accept consultation.`,
        actions: [{ action: 'open_url', title: 'Accept' }, { action: 'decline', title: 'Decline' }],
        icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    });
});

self.onnotificationclick = async function(event) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cid: id, email: email })
    }

    switch (event.action) {
        case 'open_url':
            let res = await fetch('http://www.localhost:5000/acceptConsultation', requestOptions);
            break
        case 'decline':
            return event.notification.close();
            break;

    }


    event.notification.close();

};