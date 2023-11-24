const message = (req,res,next) => {
  if (req.session.message) {
      console.log(req.session.message)
      delete req.session.message
  }
  next()
}

export default message