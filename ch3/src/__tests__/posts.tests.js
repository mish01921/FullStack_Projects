import mongoose from "mongoose"
import { describe, expect, test } from "@jest/globals"

import { createPost } from "../services/posts"
import { Post } from "../db/models/post"

describe("creating posts", () => {
  test("With all parameters should succeed", async () => {
    const post = {
      title: "Hello mongoose",
      author: "Jon Doe",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)

    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test("Without title should fail", async () => {
    const post = {
      author: "Jon Doe",
      contents: "Post with no title",
      tags: ["empty"],
    }

    try {
      await createPost(post)
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.message).toContain("`title` is required")
    }
  })
  test("with minimal parameters should succeed", async () => {
    const post = {
      title: "Only a title",
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})
