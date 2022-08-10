const scrap = require("./scrap");
const express = require("express");
const path = require("path");
const app = new express();
const port = 8080;
 
app.use(express.urlencoded({extended:true}));


app.route('/')
.get((req, res)=>{
  res.sendFile(path.join(__dirname, 'view/index.html'));
})
.post((req, res)=>{


  // res.download(path.join(__dirname, 'public/'+req.body.pin+".pdf"), (error) => {
    // if (error) {
      scrap.download(req.body.pin).then(()=>{
        res.download(path.join(__dirname, 'public/'+req.body.pin+".pdf"));
      }).catch((error)=>res.send(`
      <p>
      <center style="font-size:16px"><b style=";color:red;text-decoration:underline;">Error</b>: ${error.msg}</center>
      </p>
      `));
     
    // }
  // });
  


})

app.get('/userAgent',(req, res)=>{
  res.send(req.get('user-agent'));
});

app.use((req, res)=>{
  res.send("Forbidden :(");
})

// scrap.download("03J0150O").then(()=>console.log("ok")).catch(()=>console.log("error"));

app.listen(port, ()=>console.log("Listening to port " + port));
