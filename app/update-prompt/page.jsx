//Added 2:56:28: https://youtu.be/wm5gMKuwSYk?t=10588
// Copy and paste Create Prompt in app/create-prompt/page.jsx and change as needed for EDIT / Update 

'use client';

import {useState, useEffect} from 'react'
// import {useSession} from 'next-auth/react' // won't need useSession in update-prompt.  create-prompt. 
import {useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form';


const EditPrompt = () => { 


  const router = useRouter(); 

//   const { data: session } = useSession();  // won't use useSession in update-prompt.
  
//set up state of form to pass to form component (previously (1:51:29))
  const [submitting, setSubmitting] = useState(false) //Are we currently submitting the form (~1:51:30)
  const [post, setPost] = useState({prompt: '', tag: ''   });

//Set useSearchParams to variable (2:58:17)
    const searchParams = useSearchParams(); 
//Get Prompt ID
    const promptId = searchParams.get('id');

  // Update-Prompt add useEffect to load previous prompt and tag (2:57:29)
  useEffect(() => {

    //Call the GET post end point route we set up in `app/api/prompt/[id]/route.js` (2:58:32)
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        //get the data from our response
        const data = await response.json(); 
        //set the prompt and tag data: 
        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })      
    }

    //ONLY call this function if promptId exists
    if(promptId) getPromptDetails()

  }, [promptId])



// Comment out the createPrompt since we won't use it on EditPrompt (2:59:42): https://youtu.be/wm5gMKuwSYk?t=10782
                //   //Build out createPrompt function at (2:01:26): https://youtu.be/wm5gMKuwSYk?t=7286
                //   const createPrompt = async (e) => {
                //     e.preventDefault();
                //     // set setSubmitting to true so we can use that as a loader later on
                //     setSubmitting(true);

                //     // (2:02:04) - create our first prompt to our API route and pass the options object
                //     try {
                //       const response = await fetch('/api/prompt/new', {
                //         method: 'POST',
                //         body: JSON.stringify({
                //           prompt: post.prompt,
                //           userId: session?.user.id,
                //           tag: post.tag
                //         })
                //       })

                //       if(response.ok) {
                //         router.push('/');
                //       }

                //     } catch (error){
                //         console.log(error);
                //     } finally {
                //       setSubmitting(false);
                //     }
                //   }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={() => {}}
    />
  );
};
export default EditPrompt


