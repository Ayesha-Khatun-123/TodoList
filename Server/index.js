const express=require('express')
const mangoose=require('mongoose')
const cors=require('cors')
const { default: mongoose } = require('mongoose')
const TodoModel = require('./Models/Todo')


const app=express()
app.use(cors())
app.use(express.json())
mangoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get', (req,res) => {
  TodoModel.find()
  .then(result => res.json(result))
  .catch(err => res.json(err))

})

app.put('/update/:id',(req,res) => {
  const{id}=req.params;
  TodoModel.findByIdAndUpdate({_id: id},{done:true})
  .then(result => res.json(result))
  .catch(err => res.json(err))
  //console.log(id);
})

app.delete('/delete/:id',(req,res)=>{
  const{id}=req.params;
  TodoModel.findByIdAndDelete({_id: id})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})
app.post('/add',(req, res) => {

  const task=req.body.task;

  TodoModel.create({
    task:task
  }).then(result => res.json(result))
  .catch(error => res.json(error))
})
app.listen(2000,()=>{
    console.log("Server is running")
})
//console.log(`Current Process ID: ${process.pid}`);
