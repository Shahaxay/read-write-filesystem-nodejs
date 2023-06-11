//importing global or third party module
const http=require('http');

//importing custom module
const route=require('./route'); //automatically add .js

//create server 
//route is callcack which is called on each request by event loop and assigned task to os async
const server=http.createServer(route.handler);

//listen to port
server.listen(3000,()=>{
    console.log("listening to port 3000");
})