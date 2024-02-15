const express=require('express');
const app=express();
const port=3000;




app.get('/',(req,res)=>{
    // res.send('srinivas shetty hello');

    res.send('Hello, Expresstycgujchg!');
});
app.get('/about',(req,res)=>{
    res.send('this is about page')
})
app.get('/greet/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Hello, ${username}! Welcome to the personalized greeting page.`);
    // console.log(req.url);
});
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

