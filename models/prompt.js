// Created at (2:06:20): https://youtu.be/wm5gMKuwSYk?t=7580

// import mongoose, { Schema, model, models } from 'mongoose';

// const PromptSchema = new Schema({
//   creator: {
//     type: mongoose.Schema.Types.ObjectId
//   }
// })

// ******************* DON'T HAVE TO IMPORT mongoose BECAUSE WE ALREADY HAVE SCHEMA (2:07:08)
import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', //create ref to user, so it should be a one to many relationship, one user makes many prompts/posts (2:07:14)
  }, 
  // Next set up the prompt itself:
  prompt: {
    type: String,
    // required: true,
    required: [true, 'Prompt is required.'],
  }, 
  //Next we'll have a tag for one specific prompt
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

// (2:08:06) - get models prompt if exists - OR - Create new one: 
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;