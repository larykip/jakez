import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import connectDB from "@/lib/mongodb"
import User from "@/models/user"

export async function POST (req) {
    try{
        // Connect to the database
        await connectDB()
        const { username, email, password, confirmPassword } = await req.json()
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        //validate fields
        if (!username || !email || !password || !confirmPassword) {
            return NextResponse.json({ error: 'Please fill in all the fields' }, { status: 400 })
        }

        //validate password
        if(password !== confirmPassword) {
            return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        })
        await user.save()

        
        return NextResponse.json({ message: 'Testing hapo sawa' }, { status: 202 })

    } catch (error) {
        return NextResponse.json({ error.message }, { status: 500 })
    }
    

    if (password != confirmPassword){
        return NextResponse.json
    }
    const newData = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }
    
}