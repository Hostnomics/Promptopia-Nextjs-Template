// route api/prompt created at (2:21:00) - https://youtu.be/wm5gMKuwSYk?t=8460

import { connectToDB } from '@utils/database';

import Prompt from '@models/prompt';

export const GET = async (request) => {
  try {
    //connect to DB
    await connectToDB(); 

    //filter out our prompts ==> find({}) all posts and populate the creator as well to know who created it (2:21:38)
    const prompts = await Prompt.find({}).populate('creator');

    //return new resposne, passing the stringified JSON of the prompts
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log("error from app/api/prompt/route.js is: ", error)
    //Return new message of failed with custom string message and status 500
    return new Response("Failed to fetch all prompts from app/api/prompt/route.js", { status: 500 })
    
  }
}