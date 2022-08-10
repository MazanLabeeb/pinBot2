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
      <div style="padding-left:16px;max-width:600px; margin:0 auto; margin:16px; border:1px solid red; border-left-width: 20px;">
      <p><b style=";color:red;">Error</b>: ${error.msg}</p>
      </div>
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
