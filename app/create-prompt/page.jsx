'use client';

//Built out around (1:51:00)
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Form from '@components/Form';


const CreatePrompt = () => {
  
//(1:51:29) - set up state of form to pass to form component
  const [submitting, setSubmitting] = useState(false) //Are we currently submitting the form (~1:51:30)
  const [post, setPost] = useState({prompt: '', tag: ''   });
    

  const createPrompt = async (e) => {
    e.preventDefault();
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