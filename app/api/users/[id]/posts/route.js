// created (2:37:30): https://youtu.be/wm5gMKuwSYk?t=9450
// Copy paste template from app/api/prompt/route.js

import { connectToDB } from '@utils/database';

import Prompt from '@models/prompt';

//Add additional params so we only fetch posts from a specific user
//Those params populated from dynamic variables into the URL such as 'const response = await fetch(`/api/users/${session?.user.id}/posts`);' from app/profile/page.jsx"
export const GET = async (request, { params }) => {
  try {
    //connect to DB
    await connectToDB(); 

    //Add params.id to find (2:38:33)
    const prompts = await Prompt.find({
        creator: params.id
    }).populate('creator');

    //return new resposne, passing the stringified JSON of the prompts
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log("error from app/api/prompt/route.js is: ", error)
    //Return new message of failed with custom string message and status 500
    return new Response("Failed to fetch all prompts from app/api/prompt/route.js", { status: 500 })
    
  }
}