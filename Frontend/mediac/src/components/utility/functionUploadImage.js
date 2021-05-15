export async function uploadFile(target, url, currentUser, socket, to, chatId, type, pname) {

    try {


        const token = await currentUser.getIdToken()

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'token': token },
            body: JSON.stringify({

                fileName: target["name"]

            })
        };

        let res = await fetch(process.env.REACT_APP_API_URL + url, requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        if (res.url == null)

        {

            return { error: true, msg: "Some error occured" };
        }
        let r = await fetch(res.url, {
            method: "PUT",
            body: target,
            headers: {
                "Content-Type": "image/jpeg",
                "x-amz-acl": "public",

            },
        });

        if (r.status !== 200) {

            return { error: true, msg: "Some error occured" };;
        }


        if (type === "presc") {
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: await currentUser.getIdToken() },
                body: JSON.stringify({
                    patientName: pname,
                    history: "",
                    diagnosis: "",
                    suggestion: "",
                    medicines: "",
                    names: "",
                    patientEmail: to,
                    type: "image",
                    url: res.fileName

                })
            };
            console.log("+++++++++++++++++++++++")

            var re = await fetch(process.env.REACT_APP_API_URL + 'add-prescription', request)
            re = await re.text()
            re = JSON.parse(re)
            console.log(re);
            if (re.error) {
                return { error: true, msg: "Some error occured" };;

            }
        }


















        let msgData = {
            chatId: chatId,
            from: currentUser.email,
            to: to,
            type: type,
            text: type === "image" ? "Image" : "Prescription",
            url: res.fileName
        };
        console.log(msgData)
        console.log(socket)
        if (socket) {
            console.log("________________________")

            socket.emit("send", msgData);
            console.log("done")

        }

        console.log(res.cdnurl)

        return { error: false, msg: "Successful", url: res.cdnurl, chatId: chatId };


    } catch (e) {

        return { error: true, msg: "Some error occured" };



    }



}