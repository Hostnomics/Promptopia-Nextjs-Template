'use client';

//Built out around (1:51:00)
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Form from '@components/Form';


const CreatePrompt = () => {

// At (2:12:51) - define useRouter variable like we did with const navigate = useNavigate()
  const router = useRouter(); 
// Get the session with: 
  const { data: session } = useSession();  //need to define session for our post method in createPrompt fn 'userId: session?.user.id,'
  
//(1:51:29) - set up state of form to pass to form component
  const [submitting, setSubmitting] = useState(false) //Are we currently submitting the form (~1:51:30)
  const [post, setPost] = useState({prompt: '', tag: ''   });
    

  //Build out createPrompt function at (2:01:26): https://youtu.be/wm5gMKuwSYk?t=7286
  const createPrompt = async (e) => {
    e.preventDefault();
    // set setSubmitting to true so we can use that as a loader later on
    setSubmitting(true);

    // (2:02:04) - create our first prompt to our API route and pass the options object
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if(response.ok) {
        router.push('/');
      }

    } catch (error){
        console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};
export default CreatePrompt