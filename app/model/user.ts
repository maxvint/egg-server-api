import { Application } from 'egg';

// 用户外键
// uid: String,
// 商品外键
// gid: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Good'
// },
// 浏览时间
// date: String

export default (app: Application) => {
  const mongoose = app.mongoose;
  const userSchema = new mongoose.Schema({
    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm',
    },
    profile: {
      type: mongoose.Schema.Types.Mixed,
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

  return mongoose.model('User', userSchema);
};
