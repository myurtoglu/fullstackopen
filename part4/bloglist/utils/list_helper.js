const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  return blogPosts.reduce((total, current) => total + current.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}