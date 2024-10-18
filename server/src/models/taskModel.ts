import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  goals: {
    type: String,
    required: true,
  },
  collectionSkills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skills',
      default: [],
    },
  ],
  totalTime: {
    type: String,
  },
  resources: {
    type: String,
  },
  stepByStep: {
    type: String,
  },
});

const Task = mongoose.model('Tasks', taskSchema);

export default Task;
