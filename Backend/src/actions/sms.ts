var http = require("https");

export default function sendSMS(phone : any, message : any){

var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v5/flow/",
  "headers": {
    "authkey": "361829AZH8IEk38rUU60b7e81aP1",
    "content-type": "application/JSON"
  }
};

try{

var req = http.request(options, function (res:any) {
  var chunks:any = [];

  res.on("data", function (chunk:any) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write("{\n  \"flow_id\": \"EnterflowID\",\n  \"sender\": \"EnterSenderID\",\n  \"mobiles\": \"919XXXXXXXXX\",\n  \"VAR1\": \"VALUE 1\",\n  \"VAR2\": \"VALUE 2\"\n}");
req.end();



}catch(e){
  
}
}