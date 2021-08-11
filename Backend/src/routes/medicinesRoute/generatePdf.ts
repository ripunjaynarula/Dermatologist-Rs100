import nodeHtmlToImage from 'node-html-to-image'

      async function genrateImg(doctorName : string, clinicName : string, date : string, patientName : string,
        medicines : any, history : string, diagnosis : string, suggestion : string, signature : string,
        gender : string, age : string, designation : string, medicalNumber : string, filePath : string, fileName : string, labTest: string) {



        var meds = ``
        if(medicines.length ===0)
        {
              meds = `<div>
                <h3>
                    Medicines
                </h3>
                <p style="white-space: pre-line;">None</p>

            </div>`
        }else{
            meds = `            <table style="width:100%">`
            meds = meds +`<tr class="head">
                    <th>
                    </th>
                    <td>Medicine </td>
                    <td>Dose</td>
                    <td>Frequency</td>
                    <td>Duration</td>
                </tr>`

   for (var i = 0; i < medicines.length; i++) {




       meds = meds + `
       
       <tr>
                    <td>` + (i +1)+ `</td>
                    <td>`+    capitalizeFirstLetter(medicines[i].name)
               
                if(medicines[i].dosage && medicines[i].dosage!='none')    
                meds = meds   +   ` <br>` + medicines[i].dosage
               
                if(medicines[i].instructions)
                  meds = meds + ` <br><div class="desc">`+capitalizeFirstLetter(medicines[i].instructions)+`</div>`


                meds = meds +   ` </td><td><div class="med ">`

 if (medicines[i].isMorning || medicines[i].isAfternoon || medicines[i].isNight) {
                if (medicines[i].isMorning)
                    meds = meds + `<p>1</p>`
                else
                    meds = meds + `<p>` + `0` + `</p>`

                meds = meds + `<div class="dash "></div>`

                if (medicines[i].isAfternoon)
                    meds = meds + `<p>1</p>`
                else
                    meds = meds + `<p>` + `0` + `</p>`

                meds = meds + `<div class="dash "></div>`

                if (medicines[i].isNight)
                    meds = meds + `<p>1</p>`
                else
                    meds = meds + `<p>` + `0` + `</p>`
              
              if(medicines[i].frequency)
                meds = meds + `<p>,&nbsp;` + medicines[i].frequency + `</p></div> `

            } else {
               if(medicines[i].frequency)

                meds = meds + `<p>` + capitalizeFirstLetter(medicines[i].frequency) + `</p></div> `

            }





            meds = meds+`</div></td>
                    <td>`
             if (medicines[i].meal == 1) {
                meds = meds + `Before food`
            } else if (medicines[i].meal == 2) {
                meds = meds + `After food`
            }
            else{
                meds = meds + "__"
            }
            meds = meds + `</td> <td>`

            meds = meds + medicines[i].duration + " " + medicines[i].days
                   meds = meds + `</td>
                </tr>
       `
        
           

 
        }







            meds = meds +`</table>`
        }



     


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
                <h3 style="margin-top: 26px;">
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
                <h3 style="margin-top: 26px;">
                    History
                </h3>
                <p style="white-space: pre-line;"> ` + history + `</p>
                <br>
            </div>`

        }


   var lab = ``
        if (labTest) {
            lab = ` <div>
                <h3 style="margin-top: 26px;">
                    Lab Tests
                </h3>
                <p style="white-space: pre-line;"> ` + labTest + `</p>
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
        .desc {
            font-weight: 400;
            line-height: 1.6em;
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
        th {
            padding: 10px;
        }
        
        td {
            padding: 9px;
        }
        
        tr {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            border-collapse: collapse;
        }
        
        .head td {
            font-weight: 600;
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
            lab

            +
            `




            ` +

            advice +
            `



     
            ` +

            `<div>
 <br><br>
            </div>`


        +
        meds+
        `





        </div>


        <br></br>
        <div style="float: right;     ">


            <img style="width: 180px;" src="` + signature + `"></img>



            <h3 style="margin-top: -30px;">
                Doctor's signature
            </h3>
        </div>

        <div></div>

        <br/>
        <br/> <br/> <br/> <br/> <br/>
        <br/> <br/> <br/>
        <br/> <br/> <br/> <br/> <br/>

        <div style="text-align: center; margin-top: 35px;">

            <img style="width: auto;height: 50px;" src="https://assets.dermatologistin100rs.com/images/logo.png"></img>

 
        </div>
    </div>


    <br/>




</body>


</html>`
 


         try {
             console.log("LOOL")
console.log(process.getuid(), "UID")
            await nodeHtmlToImage({
                output: filePath,
                html: html,
                puppeteerArgs :'--no-sandbox'
            })
console.log("PDF GENERATED")
            return true;
        } catch (e) {
            console.log("PDF NOT SAVED")
            console.log(e)
            return false
        }
    }



    export default genrateImg
 

function capitalizeFirstLetter(string : string) {
     return string.charAt(0).toUpperCase() + string.slice(1);
}