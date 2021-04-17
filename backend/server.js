const express=require('express');
const dotenv=require('dotenv'); //protect our keys to being public
const dbConnect=require('./config/dbConnect');
const usersRoute=require('./routes/userRoute');
const booksRoute=require('./routes/bookRoutes');
const error=require('./middlewares/errorMiddlewareHandler');

dotenv.config();

const app=express();

//Passing body data
app.use(express.json());

app.use('/api/users',usersRoute);
app.use('/api/books',booksRoute)

app.use(error.errorMiddlewareHandler)

//connect db
dbConnect();

const PORT=process.env.PORT ||5000
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`); 
})
