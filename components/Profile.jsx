//Built out at 2:39:05: https://youtu.be/wm5gMKuwSYk?t=9545

import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
{/* Bring in the mapping from components/Feed.jsx function PromptCardList (2:43:17): */}
{/* Check if handleEdit/handleDelete exist, then (&&) if so, call the function and pass it the post: */}
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;