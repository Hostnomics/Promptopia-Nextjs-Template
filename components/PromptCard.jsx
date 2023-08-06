// Built out at 2:22:41: https://youtu.be/wm5gMKuwSYk?t=8561

'use client'; //Because using some states

import { useState } from 'react';

//optimize image from Next 
import Image from 'next/image';

import {useSession} from 'next-auth/react';
import {usePathname, useRouter} from 'next/navigation';


// bring in some PROPS (2:23:20)
const PromptCard = ( { post, handleTagClick, handleEdit, handleDelete }) => {

//Added (2:27:26) copied state to copy a prompt
  const [copied, setCopied] = useState("");

  const {data: session } = useSession()
  return (
    <div className="prompt_card">
      <div classname="flex justify-between items-start gap-5">
        <div>
          <Image 
            // src={session?.user.image}
            src={post?.creator?.image}
            alt='user_image'
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post?.creator?.username}
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email}
            </p>
          </h3>
        </div>
{/* 2:27:10-ish Added Copy Prompt button */}
        <div className="copy_btn" onClick={() => {}}>
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
    </div>
{/* (2:28:21)- p tags for prompt and tag */}
          <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
          <p className="font-inter text-sm blue_gradient cursor-pointer">{post.tag}</p>  
         
  </div>
  )
} 

export default PromptCard