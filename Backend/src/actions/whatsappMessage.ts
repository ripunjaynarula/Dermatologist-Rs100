import http from "https";
export default function sendWhatsapp(phone : any, message : any){
var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v5/whatsapp/whatsapp-outbound-message/",
  "headers": {
    "authkey": "361829AZH8IEk38rUU60b7e81aP1",
    "content-type": "application/JSON"
  }};

try{
  var req = http.request(options, function (res) {
  var chunks :any = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  }); 

  req.write("{\n  \"recipient_number\": \""+ phone +"\",\n  \"content_type\": \"text\",\n  \"text\": \""+ message +"\",\n  \"authkey\": \"361829AZH8IEk38rUU60b7e81aP1\"\n}");
req.end();
  // var msg = "{\n  \"recipient_number\": "+ phone +",\n  \"content_type\": \"text\",\n  \"text\": " +message + ",\n  \"authkey\": \"361829AZH8IEk38rUU60b7e81aP1\"\n}"
  // console.log(msg)
  // req.write(msg);


  // req.end();

}catch(e){
  
}
}