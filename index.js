import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Book from './models/book.js';
const app=express()
app.use('/uploads', express.static('uploads'));
mongoose.connect('mongodb://127.0.0.1:27017/NewTask')
.then(() => console.log('Connected!'));
app.use(cors())
app.use(express.json({limit:'50mb'}))

  let verifyToken=(req,res,next)=>{
    try{

        console.log(req.headers.authorization);
        let response=jwt.verify(req.headers.authorization,'abc')
        console.log(response);
        next()
    }
    catch(e){
        res.status(401).json(e.message)
    }
}


app.post('/register', async (req,res)=>{
    try{
       
        
       const {username, password}=req.body
        let hashedPassword=await bcrypt.hash(password,10)
        console.log(hashedPassword);

        req.body={...req.body,password:hashedPassword}

        console.log(req.body,'new body');
        let newdata=new User(req.body)
        console.log(newdata)
        
        let response=await newdata.save()
        //    let response=await  db.collection('Newusers').insertOne(req.body)
        console.log(response);
        res.json(response)
    }
    catch(e){
        res.status(500).json(e.message)
    }

})

app.post('/login',async (req,res)=>{
    console.log(req.body);
    const {username,password}=req.body
    let users=await User.findOne({username:username})
    console.log(users);
   if(!users){
     return res.status(401).json('invalid username or password')
   }
 
   let matchPassword=await bcrypt.compare(password,users.password)
   console.log(matchPassword);
   if(!matchPassword){
     return res.status(401).json('invalid username or password')
   }
   let token=jwt.sign({id:users._id,username:users.username},'abc')
   console.log(token);
   res.json({users,token})
 })

app.post('/addBook',async(req,res)=>{
  let newBook=new Book(req.body)
  let response=await newBook.save()
  res.json(response)
})

app.get('/viewBook',async(req,res)=>{
  let response=await Book.find()
  res.json(response)
})

app.delete('/deleteBook/:id',async(req,res)=>{
  let id=req.params.id
  let response=await Book.findByIdAndDelete(id)
  res.json(response)
})

app.get('/findOneBook/:id',async(req,res)=>{
  let id=req.params.id
  let response=await Book.findById(id)
  res.json(response)
})

app.put('/updateBook/:id',async(req,res)=>{
  let id=req.params.id
  let response=await Book.findByIdAndUpdate(id,req.body)
  res.json(response)
})

app.get('/auth/:id',verifyToken,async (req,res)=>{
  let id=req.params.id
  let response=await User.findById(id)
  console.log(response);
  res.json(response)
})


 app.listen(4000,()=>{
    console.log('running');
})
