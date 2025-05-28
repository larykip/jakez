import mongoose from 'mongoose'
import React from 'react'

const connectDB = async() => {
  const uri = process.env.MONGODB_URI

  try {
    await mongoose.connect(uri)
    console.log('MongoDB Successfully Connected')
  }catch (error) {
    console.error('MongoDB Connection Error:', error.message)
    process.exit(1)
  }
}

export default connectDB