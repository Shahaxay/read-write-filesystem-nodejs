const http=require('http');
const fs=require('fs');
//create server
const server=http.createServer((req,res)=>{
    let url=req.url;
    if(url==='/'){
        res.write("<html><body>");
        try{
            res.write(`<p>${fs.readFileSync("message.txt")}</p>`)
        }catch(e){
            console.log("file is not created yet");
            res.write(`<p>file is not created yet</p>`)
        }
        res.write('<form action="/message" method="post"><input type="text" name="message"><button type="submit">Send</button></form></body></html>');
        return res.end();
    }
    else if(url==="/message"){
        let ar=[];
        req.on("data",(chunks)=>{
            ar.push(chunks);
        });
        return req.on('end',()=>{
            const msg=Buffer.concat(ar).toString();
            const actualMsg=msg.split("=")[1];
            console.log(actualMsg);
            fs.writeFile("message.txt",actualMsg,err=>{
                res.statusCode=302; //redirection
                res.setHeader('location','/');
                res.end();
            })
        })
    }
    res.write('<p>last one</p>');

});
//listen to port
server.listen(3000,()=>{
    console.log("listening to port 3000");
})