// Built out at 2:22:41: https://youtu.be/wm5gMKuwSYk?t=8561

'use client'; //Because using some states

import { useState } from 'react';

//optimize image from Next 
import Image from 'next/image';

import {useSession} from 'next-auth/react';
import {usePathname, useRouter} from 'next/navigation';


// bring in some PROPS (2:23:20)
const PromptCard = ( { post, handleTagClick, handleEdit, handleDelete }) => {

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

      </div>

    </div>
  )
} 

export default PromptCard