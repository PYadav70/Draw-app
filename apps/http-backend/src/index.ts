import express from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'
import { middleware } from './middleware'
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from '@repo/common/types'
import { prismaClient } from '@repo/db/client'

const app = express()
app.use(express.json());


app.post('/signup',async(req,res)=>{
    const parseData = CreateUserSchema.safeParse(req.body)
    if(!parseData.success){
        console.log(parseData.error)
        res.json({
            message:"Incorrect inputs"
        })
        return
    }
    // db call
     try {
       const user = await prismaClient.user.create({
            data:{
                email:parseData.data?.username,
                password:parseData.data.password,
                name:parseData.data.name
            }
            
        })
        res.json({
        userId : user.id
        })
        
    } catch (error) {
        res.status(411).json({
            massage:"user already exists with this username"
        })
    }

})
app.post('/signin',async(req,res)=>{
    const parseData = SigninSchema.safeParse(req.body);
    if(!parseData.success){
        res.json({
            message:"Incorrect input"
        })
        return
    }
    //db call
    const user = await prismaClient.user.findFirst({
        where:{
            email:parseData.data.username,
            password:parseData.data.password
        }
    })
    if(!user){
        res.status(403).json({
            message:"Not authorized"
        })
        return
    }

    const token = jwt.sign({
      userId:user?.id
    },JWT_SECRET)
    res.json({token})
})



app.post('/room',middleware,async(req,res)=>{

     const parseData = CreateRoomSchema.safeParse(req.body)
     if(!parseData.success){
      
        res.json({
            messsage:"Incorrect input"
        })
        return
     }
     //db call
      //@ts-ignore
     const userId = req.userId //comes from middleware
     try {
         const room = await prismaClient.room.create({
         data:{
            slug:parseData.data.name,
            adminId:userId
        }
     })

    res.json({
        roomId:room.id
    })
        
     } catch (error) {
        res.status(411).json({
            message:"Room already exists with this name"

        })
     }
    
})

app.get("/chats/:roomId",async(req,res)=>{
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where:{
            roomId:roomId
        },
        orderBy:{
            id:"desc"
        },
        take:50
    });
    res.json({
        messages
    })
})

app.listen(3001)