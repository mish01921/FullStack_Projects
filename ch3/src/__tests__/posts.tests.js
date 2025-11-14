import mongoose from "mongoose"
import { describe, expect, test, beforeEach } from "@jest/globals"

import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listAllPostsByTag,
} from "../services/posts"
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

const samplePosts = [
  { title: "Leraning Redux", author: "Daniel Bugl", tags: ["redux"] },
  { title: "Learn React Hooks", author: "Daniel Bugl", tags: ["react"] },
  {
    title: "Full-Stack React Projects",
    author: "Daniel Bugl",
    tags: ["react", "nodejs"],
  },
  { title: "Guide to TypeScript" },
]

let createdSamplePosts = []

beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

describe("listing posts", () => {
  test("should return all posts ", async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })
  test("should return posts sorted by creaion date descending by default", async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  test("should take into account provided sorting optiions", async () => {
    const posts = await listAllPosts({
      sortBy: "updateAt",
      sortOrder: "ascending",
    })
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })
  test("should be able to filter posts by author", async () => {
    const posts = await listPostsByAuthor("Daniel Bugl")
    expect(posts.length).toBe(3)
  
  })
  test("should be able to filter posts by tag", async () => {
    const posts = await listAllPostsByTag("nodejs")
    expect(posts.length).toBe(1)
  })
})
