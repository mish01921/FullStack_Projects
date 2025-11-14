import { initDatabase } from "./db/init.js"
import { Post } from "./db/models/post.js"
await initDatabase()

const post = new Post({
  title: "Hello Mongoose!",
  author: "Misha Baghdasayan",
  contents: "This post is stored in a MongoDB database using Mongoose.!",
  tags: ["mongoose", "mongoDB"],
})
await post.save()
const posts = await Post.find()
console.log(posts)

const createdPost = await post.save()
await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: "Hello again, Mongoose!!!!!", author: "Jon Doe" },
})
