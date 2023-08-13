//Added at (2:48:43): https://youtu.be/wm5gMKuwSYk?t=10123
// Three different types of requests: 

// (1) GET ROUTE (Copy paste from app/api/prompt/route.js)
    import { connectToDB } from '@utils/database';

    import Prompt from '@models/prompt';

                                    //add params to get post id
    export const GET = async (request, { params }) => {
        try {
            //connect to DB
            await connectToDB(); 

            // find specific prompt with findById(params.id)
                    // filter out our prompts ==> find({}) all posts and populate the creator as well to know who created it (2:21:38)
            const prompt = await Prompt.findById(params.id).populate('creator');

            // IF prompt id does not exist: 
            if(!prompt) return new Response("Prompt not found  for GET to load EDIT page from app/api/prompt/[id]/route.js", { status: 404 });


            //return single new resposne, passing the stringified JSON of the prompt matching id
            return new Response(JSON.stringify(prompt), { status: 200 })

        } catch (error) {
            console.log("error from GET to load EDIT in app/api/prompt/route.js is: ", error)
            //Return new message of failed with custom string message and status 500
            return new Response("Failed to fetch single prompt from app/api/prompt/[id]/route.js", { status: 500 })
            
        }
    }


    // (2) PATCH ROUTE to update/edit (2:50:22)
    export const PATCH = async (request, { params }) => {
        const { prompt, tag } = await request.json(); 

        try {
            await connectToDB();

            const existingPrompt = await Prompt.findById(params.id);

            if(!existingPrompt) return new Response("Single prompt not found in PATCH route in app/api/prompt/[id]/route.js", 
            { status: 404 });

            // UPDATE THE PROMPT (2:51:24)
            existingPrompt.prompt = prompt; 
            // UPDATE THE TAG 
            existingPrompt.tag = tag;

//SAVED UPDATED prompt and tag:
            await existingPrompt.save(); 

            return new Response(JSON.stringify(existingPrompt), {status: 200 })

        } catch (error) {
            console.log("error from EDIT PATCH ROUTE in app/api/prompt/route.js is: ", error)
            return new Response("Failed to update single prompt EDIT PATCH route from app/api/prompt/[id]/route.js", { status: 500 })
        }
    }


    // (3) DELETE ROUTE - (2:52:21)
    export const DELETE = async(request, { params }) => {

        try {
            await connectToDB(); 

            await Prompt.findByIdAndRemove(params.id);

            return new Response("Prompt deleted successfully", {status: 200})

        } catch(error) {
            console.log("error from DELETE in app/api/prompt/route.js is: ", error)
            //Return new message of failed with custom string message and status 500
            return new Response("Failed to DELETE single prompt from app/api/prompt/[id]/route.js", { status: 500 })
        }

    }

