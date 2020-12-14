const http = require('http');
const fs = require('fs');
var requests = require('requests')
const Homefile = fs.readFileSync('weather_app.html','utf-8');

const replaceval=(tempval, orgval)=>{
// let temperature = temp.replace("{%tempval%}", orgval.main.temp);
// temperature = temperature.replace("{%tempmin%}", orgval.main.temp_min); 
// temperature = temperature.replace("{%tempmax%}", orgval.main.temp_max); 
// temperature = temperature.replace("{%location%}", orgval.name); 
// temperature = temperature.replace("{%country%}", orgval.sys.country); 
var temperature = Homefile.replace("{%tempval%}",(orgval.main.temp-273.15).toFixed(2));
temperature = temperature.replace("{%tempmin%}", (orgval.main.temp_min - 273.15).toFixed(2));
temperature = temperature.replace("{%tempmax%}", (orgval.main.temp_max - 273.15).toFixed(2));
temperature = temperature.replace("{%location%}", orgval.name)
temperature = temperature.replace("{%country%}", orgval.sys.country)
temperature = temperature.replace("{%tempstatus%}", orgval.weather[0].main)
return temperature;
}


const server = http.createServer((req,res)=>{
if (req.url == '/'){
    requests('http://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=b14425a6554d189a2d7dc18a8e7d7263')
.on('data', function (chunk) {
    const objData = JSON.parse(chunk)
    let arr = [objData];
const RealTimeData = arr.map((val)=>{
   return  replaceval(Homefile,val); 
})
res.write(RealTimeData.join(""));
})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
   res.end();
});
}
})
server.listen(8000,'127.0.0.1');