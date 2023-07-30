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
                key={post.id}
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
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
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
      data={posts}
      handleTagClick={() => {}}

    />

    </section>
  )


}

export default Feed