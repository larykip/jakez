import connectDB from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export async function POST (req) {
    try {
        // Connect to the database
        await connectDB()
        const { username, password } = await req.json()

        // Check if the user exists
        const user = await User.findOne({ username })
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 })
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
        }

        // Return success response
        return NextResponse.json({ message: 'Login successful' }, { status: 200 })
    } catch(error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
