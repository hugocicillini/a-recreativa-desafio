import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Skill = mongoose.model('Skills', skillSchema);

export default Skill;
