console.log("Service Worker Loaded...");

let id = '';
let email = '';
self.addEventListener("push", e => {
    const data = e.data.json();
    id = data.id;
    email = data.email;
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: `New consultation: ${data.description}.`,
        actions: [{ action: 'open_url', title: 'Accept' }, { action: 'decline', title: 'Decline' }],
        icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    });
});
self.addEventListener('notificationclick', function(event) {
    let url = 'https://example.com/some-path/';
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
self.onnotificationclick = async function(event) {
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ cid: id, email: email })
    }

    switch (event.action) {
        case 'open_url':
            let res = await fetch(process.env.API_URL + '/acceptConsultation?cid=' + cid + '&email=' + email, requestOptions);
            break
        case 'decline':
            return event.notification.close();
            break;

    }


    event.notification.close();

};