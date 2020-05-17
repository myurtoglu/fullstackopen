const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  return blogPosts.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogPosts) => {
  if (blogPosts.length === 0) { return {} }

  const maxLikes = Math.max(...blogPosts.map(post => post.likes))
  const mostLikedPost = blogPosts.find(post => post.likes === maxLikes)
  return {
    title: mostLikedPost.title,
    author: mostLikedPost.author,
    likes: mostLikedPost.likes
  }
}

const mostBlogs = (blogPosts) => {
  if (blogPosts.length === 0) { return {} }
  let authorsWithPostCounts = {}
  blogPosts.forEach(post => {
    const author = post.author
    authorsWithPostCounts[author] = Object.prototype.hasOwnProperty.call(
      authorsWithPostCounts, author) ? authorsWithPostCounts[author] + 1 : 1
  })
  const maxPostCount = Math.max(...Object.values(authorsWithPostCounts))
  let topEntry = Object.entries(authorsWithPostCounts).find(([, posts]) => {
    return posts === maxPostCount
  })
  return {
    author: topEntry[0],
    blogs: topEntry[1]
  }
}

const mostLikes = (blogPosts) => {
  if (blogPosts.length === 0) { return {} }
  let authorsWithLikeCounts = {}
  blogPosts.forEach(post => {
    const author = post.author
    authorsWithLikeCounts[author] = Object.prototype.hasOwnProperty.call(
      authorsWithLikeCounts, author) ? authorsWithLikeCounts[author] + post.likes : post.likes
  })
  const maxLikeCount = Math.max(...Object.values(authorsWithLikeCounts))
  let topEntry = Object.entries(authorsWithLikeCounts).find(([, posts]) => {
    return posts === maxLikeCount
  })
  return {
    author: topEntry[0],
    likes: topEntry[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}