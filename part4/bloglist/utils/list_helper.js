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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}