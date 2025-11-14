import { Post } from "../db/models/post.js"

export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}

async function listsPosts(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {},
) {
  const direction = sortOrder === "ascending" ? 1 : -1
  return await Post.find(query).sort({ [sortBy]: direction })
}

export async function listAllPosts(options = {}) {
  return await listsPosts({}, options)
}

export async function listPostsByAuthor(author, options = {}) {
  return await listsPosts({ author }, options)
}

export async function listAllPostsByTag(tag, options = {}) {
  return await listsPosts({ tags: tag }, options)
}
