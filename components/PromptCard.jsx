// Built out at 2:22:41: https://youtu.be/wm5gMKuwSYk?t=8561

'use client'; //Because using some states

import { useState } from 'react';

//optimize image from Next 
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import {usePathname, useRouter} from 'next/navigation';


// bring in some PROPS (2:23:20)
const PromptCard = ( { post, handleTagClick, handleEdit, handleDelete }) => {

//Added (2:27:26) copied state to copy a prompt
  const [copied, setCopied] = useState("");

  const {data: session } = useSession();

  //************ GET CURRENT PATHNAME WITH: usePathName() and router at (2:46:55) */
  const pathName = usePathname(); 
  const router = useRouter(); 

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
         

{/* ADDED EDIT (2:45:13) - check if (1) logged in user via session user id is (2) equal to post creator id AND (3) path name is on /profile !  
    - cursor-pointer makes it clickable
    - node.js saves those buttons as _id, so it's post.creator._id
*/}

          {session?.user.id === post.creator._id && pathName === '/profile' && (
              <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                  <p className="font-inter text-sm green_gradient cursor-pointer"
                  onClick={handleEdit}> 
                    Edit
                  </p>

                  <p className="font-inter text-sm orange_gradient cursor-pointer"
                  onClick={handleDelete}> 
                    Delete
                  </p>
                
              </div>


          )}
  </div>
  )
} 

export default PromptCard