const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const employees = require('./modules/employee')
const todo = require('./modules/todos')


const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/NEW_SIH')

app.post('/',(req,res)=>{
    employees.create(req.body)

    .then(emps => {
       /*  if(emps){
            if(emps.pass !== " " || emps.email !== " " || emps.name !== " " ){
                res.json("success")
            }
            else{
                res.status(400).json(" not  success")
            }
        }
        else{
            res.json("invalid data")
        }  */
        res.json(emps)
    })
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const { email, pass } = req.body;
    employees.findOne({ email })
        .then(user => {
            if (user) {
                if (user.pass === pass) {
                    res.json({ success: true, user }); // Send user data on successful login
                } else {
                    res.json({ success: false, message: "The password is incorrect" });
                }
            } else {
                res.json({ success: false, message: "Invalid email" });
            }
        })
        .catch(err => res.json({ success: false, message: "An error occurred" }));
});

/*app.post('/login',(req,res) => {
    const {email , pass } =req.body;
    employees.findOne({email: email})
    .then(user => {
        if(user){
            if(user.pass === pass){
                res.json("success")
            }
            else{
                res.json("the password is incorrect")

            }
        }
        else{
            res.json("invalid e-mail")
        }
    })

})*/

app.post('/add', (req, res) => {
    const { text, userId } = req.body; // userId comes from the logged-in user

    todo.create({ text, userId })
        .then(emps => res.json(emps))
        .catch(err => res.json(err));
});


app.get('/get', (req, res) => {
    const { userId } = req.query; // Assume userId is passed as a query parameter

    todo.find({ userId })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});



app.listen(3001, ()=>{
    console.log("server is running ")
})   