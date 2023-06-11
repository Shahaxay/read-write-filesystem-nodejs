const fs=require('fs');
//request handler of the server
const requestHandler=(req,res)=>{
    let url=req.url;
    if(url==='/'){
        //console.log("main",req.header);
        console.log("home route");
        res.write("<html><body>");
        try{
            res.write(`<p>${fs.readFileSync("./message.txt")}</p>`)
        }catch(e){
            console.log("file is not created yet");
            res.write(`<p>undefined</p>`)
        }
        res.write('<form action="/message" method="post"><input type="text" name="message"><button type="submit">Send</button></form></body></html>');
        return res.end();
    }
    else if(url==="/message"){
        // console.log("message",req.headers);
        let ar=[];
        req.on("data",(chunks)=>{
            ar.push(chunks);
        });
        return req.on('end',()=>{
            const msg=Buffer.concat(ar).toString();
            const actualMsg=msg.split("=")[1];
            console.log(actualMsg);
            fs.writeFile("./message.txt",actualMsg,err=>{
                res.statusCode=302; //redirection
                res.setHeader('location','/');
                res.end();
            })
        })
    }
    
    res.write('<p>out of home and message route</p>');
}
//exporting the functionality of request handler
//ways1 : func
// module.exports=requestHandler;

// ways2 : obj
// module.exports={
//     handler:requestHandler,
//     text:"exported from route js file"
// }

//ways3 : explicitly exporting all property
// module.exports.handler=requestHandler;
// module.exports.text="exported property from js";

//NOTE: module can be omitted in ways3 only
exports.handler=requestHandler;
exports.text="exported property from js";