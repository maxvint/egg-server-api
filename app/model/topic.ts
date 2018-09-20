import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const topicSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    node: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Node',
    },
    user: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    excellent: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  });

  return mongoose.model('Topic', topicSchema);
};
