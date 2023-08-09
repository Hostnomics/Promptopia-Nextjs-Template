'use client';

//Built out (2:14:47) - https://youtu.be/wm5gMKuwSYk?t=8087
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';

 
// (2:17:33) - the PromptCardList component is only used in this Feed.jsx component so we can create it here: 
  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {/* Map over the data and view the prompts (2:18:13 => 2:19:57) */}
          {data.map((post) => (
            <PromptCard 
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
            />
          ))}
      </div>
    )
  }

const Feed = () => {

// (2:16:43) - set up search states
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {

  }

// Make useEffect to make a get request to our own API so we can map over them in PromptCardList (2:18:26)
const [posts, setPosts] = useState([]);

useEffect(() => {
  // Built out at (2:18:45): https://youtu.be/wm5gMKuwSYk?t=8325
    const fetchPosts = async () => {
//At 2:36:03 - made fetch route a dynamic template string so we only get posts for currently logged in user.
      const response = await fetch(`/api/prompt/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts(); //call fetchPosts method right here in the useEffect to trigger on page load
}, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          // onChange={e => setSearchText(e.target.value)}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

{/* Add Prompts via PromptCard at (2:17:17) */}
    <PromptCardList 
    // Set data to an empty array and handleTagClick to an empty callback function
      // data={[]}
      // handleTagClick={() => {}}
      data={posts} // (2:19:40)
      handleTagClick={() => {}}

    />

    </section>
  )


}

export default Feed