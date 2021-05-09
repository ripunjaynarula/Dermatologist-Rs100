const publicVapidKey = "BJpjlvIqaOuxYlJlQhpaBdOE3r8lqbad_efST0Nu_owHRA-kt5agl4bDd5dHx2iEYYqDfBw0Mj2pJtcWmqO-VF0";
// Check for service worker

const checkForSW = (token, email) => {
    if ("serviceWorker" in navigator) {
        send(token, email).catch(err => console.error(err));
    }
}

// Register SW, Register Push, Send Push
async function send(token, email) {
    try {
        // Register Service Worker
        console.log("Registering service worker...");
        const register = await navigator.serviceWorker.register("/worker.js", {
            scope: "/"
        });

        console.log("Service Worker Registered...");
        await navigator.serviceWorker.ready;
        // Register Push

        console.log("Registering Push...");
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        console.log("Push Registered...");

        // Send Push Notification
        console.log("Sending Push...");
        let res = await fetch("/subscribe", {
            method: "POST",
            body: JSON.stringify({ sub: subscription, type: "web" }),
            headers: {
                "content-type": "application/json",
                "token": token
            }
        });

        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        m = res.message || ""
            // alert(res.success + " " + m)
        if (res.success) {
            window.close();

        }

    } catch (e) {
        alert(r)
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


console.log('loaded');
const btn = document.getElementById("submit");

// btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("pass").value;
//     checkForSW(email, password);

// })

window.onload = function exampleFunction() {

    var token = getParameterByName('token'); // "lorem"
    console.log(token)
    var email = getParameterByName('email') || ""; // "lorem"

    // const email = document.getElementById("email").value;
    //const password = document.getElementById("pass").value;
    checkForSW(token, email);
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}