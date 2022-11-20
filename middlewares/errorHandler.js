export default (err, req, res, next) => {
  console.log("OK-1", JSON.stringify(err, null, 2));
  const code = err.code;

  switch(code) {
    case 'USER_REGISTER_FAILURE':
      res.status(422).json({
        message: 'Failed to create user',
      });
      
    case 'INTERNAL_SERVER_ERROR':
      res.status(500).json({
        message: err.details || 'Internal server error'
      });

    case 'USER_UNAUTHORIZED_ACCESS':
      res.status(401).json({
        message: 'User unable to access the store',
        detail: 'Might be wrong store id or user credential',
      });

    default:
      res.status(500).json({
        message: 'Internal server error',
        detail: 'Unhandled error',
      });
  }
}