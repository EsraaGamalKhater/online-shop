import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import dbConnection from "./config/BD";
import categoriesRoute from "./routes/categorieRoute";
import subcategoriesRoute from "./routes/subcategorieRoute"

const app:express.Application = express(); 
app.use(express.json())

dotenv.config()
dbConnection()

app.use('/api/v1/categorie', categoriesRoute)
app.use('/api/v1/Subcategorie', subcategoriesRoute)



app.listen(process.env.PORT,()=> console.log('server is running'))