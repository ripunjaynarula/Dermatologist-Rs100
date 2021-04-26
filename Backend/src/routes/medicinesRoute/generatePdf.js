// import nodeHtmlToImage from 'node-html-to-image'
var nodeHtmlToImage = require("node-html-to-image");


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
            <h1>Doctor Name</h1>
            <h3 class="des">Designation</h3>
            <h3 class="des"> Medical number</h3>
            <h3 class="des">Clinic Name</h3>
        </div>

        <hr class="dark" />


        <div style="display: flex;  justify-content: space-between;">
            <div>

                <h2>Paatient Name</h2>
                <p>age, gender</p>
            </div>

            <div>
                <p>date</p>
                <p>id</p>
            </div>

        </div>

        <div style="  justify-content: start;">

            <hr class="dark" />

            <h3 style="margin-top: 28px;">
                Diagnosis
            </h3>
            <p style="white-space: pre-line;"> details</p>


            <br>


            <h3>
                General Advice
            </h3>
            <p style="white-space: pre-line;">details</p>



            <hr class="dark " />


            <h3 style="margin-top: 34px; ">
                Medicines
            </h3>

            <h4 style="margin-top: 32px; ">Medicine Name</h4>
            <div class="med ">
                <p>1</p>
                <div class="dash "></div>
                <p> 0</p>
                <div class="dash "></div>
                <p> 0</p>

            </div>
            <div>
                <p style="margin-top: -6px; ">daily after food, 2 days</p>
            </div>
            <h4 style="margin-top: 32px; ">Medicine Name</h4>
            <div class="med ">
                <p>1</p>
                <div class="dash "></div>
                <p> 1</p>
                <div class="dash "></div>
                <p> 0</p>

            </div>
            <div>
                <p style="margin-top: -6px; ">daily after food, 2 days</p>
            </div>
        </div>


        <br></br>
        <div style="float: right;     ">


            <img style="width: 300px;height: 200px;" src="https://imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg"></img>



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



async function f() {
    try {
        await nodeHtmlToImage({
            output: './image.png',
            html: html
        })
    } catch (e) {
        console.log(e)
    }
}

f()