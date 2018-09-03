import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const nodeSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    summary: String,
    sort: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
  });

  return mongoose.model('Node', nodeSchema);
};
