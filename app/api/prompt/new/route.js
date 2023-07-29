// created at (2:04:45)- https://youtu.be/wm5gMKuwSYk?t=7485


// (2:05:45) - Connect to our DB (Here with our utility function connectToDB )
import { connectToDB } from '@utils/database';





// **** FORMAT FOR ROUTE *****
// export const + ROUTE TYPE = async (req, res) function (req and res)
// export const POST = async (req, res) => {
  export const POST = async (req) => { //Here we won't even use the res, (response?) So JUST the request
    //Grab the things we pass through the POST request
      const { userId, prompt, tag } = await req.json();

      try {
        await connectToDB(); // [(2:06:16)](https://youtu.be/wm5gMKuwSYk?t=7576) - Create the **MODEL FOR SAVING OUR PROMPT** 
      } catch (error) {
        console.log(error)
      }

}