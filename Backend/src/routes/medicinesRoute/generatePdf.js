const nodeHtmlToImage = require('node-html-to-image')


module.exports = {
    genrateImg: async function f(doctorName, clinicName, date, patientName,
        medicines, history, diagnosis, suggestion, signature,
        gender, age, designation, medicalNumber, filePath, fileName) {



        var meds = ``




        for (var i = 0; i < medicines.length; i++) {

            meds = meds + `<h4 style="margin-top: 32px; ">` + capitalizeFirstLetter(medicines[i].name) + `</h4>`;
            meds = meds + `<div class="med ">`

            if (medicines[i].isMorning || medicines[i].isAfternoon || medicines[i].isNight) {
                if (medicines[i].isMorning)
                    meds = meds + `<p>` + medicines[i].dosage + `</p>`
                else
                    meds = meds + `<p>` + `0` + `</p>`

                meds = meds + `<div class="dash "></div>`

                if (medicines[i].isAfternoon)
                    meds = meds + `<p>` + medicines[i].dosage + `</p>`
                else
                    meds = meds + `<p>` + `0` + `</p>`

                meds = meds + `<div class="dash "></div>`

                if (medicines[i].isNight)
                    meds = meds + `<p>` + medicines[i].dosage + `</p>`
                else
                    meds = meds + `<p>` + `0` + `</p>`
                meds = meds + `<p>,&nbsp;` + medicines[i].frequency + `</p></div> `

            } else {
                meds = meds + `<p>` + capitalizeFirstLetter(medicines[i].frequency) + `</p></div> `

            }



            meds = meds + `<div> <p style="margin-top: -6px; ">`

            if (medicines[i].meal == 1) {
                meds = meds + `Before food, ` + medicines[i].duration
            }
            if (medicines[i].meal == 2) {
                meds = meds + `After food, ` + medicines[i].duration
            }
            meds = meds + ` ` + medicines[i].days
            meds = meds + `</p>`

            if (medicines[i].instructions) {
                meds = meds + `<p > ` + capitalizeFirstLetter(medicines[i].instructions) + `</p>`
            }

            meds = meds + `</div>`

        }


        console.log("----------------------------------")

        var advice = ``
        if (suggestion) {
            advice = `<div>
                <h3>
                    General Advice
                </h3>
                <p style="white-space: pre-line;">` + suggestion + `</p>

            </div>`
        }

        var diag = ``
        if (diagnosis) {
            diag = `
            <div>
                <h3 style="margin-top: 28px;">
                    Diagnosis
                </h3>
                <p style="white-space: pre-line;"> ` +
                diagnosis +
                `</p>


                <br>
            </div>`
        }

        var pH = ``
        if (history) {
            pH = ` <div>
                <h3 style="margin-top: 28px;">
                    History
                </h3>
                <p style="white-space: pre-line;"> ` + history + `</p>
                <br>
            </div>`

        }


        var ageGender = ``

        if (age && gender) {
            ageGender = `<p>` + age + ", " + gender + ` </p>`
        } else if (age) {
            ageGender = `<p>` + age + ` </p>`

        } else if (gender) {
            ageGender = `<p>` + gender + ` </p>`

        }
        var html = `<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=roboto">

    <style>
        table {
            border-collapse: collapse;
        }
        
        .des {
            font-weight: 400;
            line-height: 0.5em;
            color: #000000b7;
        }
        
        h2 {
            line-height: 0.4em;
            color: #000000e7;
        }
        
        p {
            color: #000000e7;
        }
        
        .dash {
            background-color: #000000e7;
            height: 1px;
            border: none;
            width: 20px;
            margin-left: 3px;
            margin-right: 3px;
        }
        
        h1 {
            line-height: 0.4em;
        }
        
        h3 {
            line-height: 0.5em;
            color: #000000e5;
        }
        
        body {
            font-family: "roboto", sans-serif;
        }
        
        .dark {
            background-color: rgba(0, 0, 0, 0.096);
            height: 1px;
            border: none;
        }
        
        .med {
            justify-content: start;
            display: flex;
            margin-top: -22px;
            align-items: center;
        }
        
        table,
        th,
        td {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <br/>
    <div style="width: 85%; margin: 0 7.5%;">

        <div style="text-align: center;">
            <h1>Dr. ` + doctorName + `</h1>

            <h3 class="des">` + designation + `</h3>
           ` + ` <h3 class="des">Medical Registeration Number: ` + medicalNumber + ` </h3>` + `
            <h3 class="des">` + clinicName + `</h3>
        </div>

        <hr class="dark" />


        <div style="display: flex;  justify-content: space-between;">
            <div>

                <h2>` + patientName + `</h2>
                ` + ageGender +
            `
            </div>

            <div>
                <p>` + date + `</p>
                <p>` + fileName + `</p>
            </div>

        </div>

        <div style="  justify-content: start;">

            <hr class="dark" />

           ` +

            pH +
            `




            ` +
            diag

            +
            `




            ` +

            advice +
            `



            <hr class="dark " />

            ` +

            `<div>

                <h3 style="margin-top: 34px; ">
                    Medicines
                </h3>


                ` +
            meds +
            `
            </div>`


        +
        `





        </div>


        <br></br>
        <div style="float: right;     ">


            <img style="width: 300px;height: 200px;" src="` + signature + `"></img>



            <h3>
                Doctor's signature
            </h3>
        </div>

        <div></div>

        <br/>
        <br/> <br/> <br/> <br/> <br/>
        <br/> <br/> <br/>
        <br/> <br/> <br/> <br/> <br/>

        <div style="text-align: center; margin-top: 35px;">

            <img style="width: auto;height: 50px;" src="https://imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg"></img>


            <h1>LOGO</h1>

        </div>
    </div>


    <br/>




</body>


</html>`
        console.log(html)

        try {

            await nodeHtmlToImage({
                output: filePath,
                html: html
            })

            return true;
        } catch (e) {
            console.log(e)
            return false
        }
    }
}


function capitalizeFirstLetter(string) {
    if (!string) return ""
    return string.charAt(0).toUpperCase() + string.slice(1);
}