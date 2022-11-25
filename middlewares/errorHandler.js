export default (err, req, res, next) => {
  const code = err.code;

  switch(code) {
    case 'USER_REGISTER_FAILURE':
      res.status(422).json({
        message: 'Failed to create user',
      });

    case 'INTERNAL_SERVER_ERROR':
      res.status(500).json({
        message: err.details || 'Internal server error',
      });

    case 'INVALID_USERNAME_OR_PASSWORD':
      res.status(400).json({
        message: 'Invalid username or password',
        detail: 'Check if there is any mistype from username or password'
      })

    case 'INVALID_JWT_TOKEN':
      // if(error.message == 'jwt expired') {
      //   error.message = 'REFRESH_TOKEN_EXPIRED'
      // } else if(error.message == 'invalid signature' || error.message == 'jwt malformed' || error.message == 'jwt must be provided' || error.message == 'invalid token') {
      //   error.message = 'INVALID_REFRESH_TOKEN'
      // }
      res.status(400).json({
        message: 'Invalid jwt detected',
        detail: 'Might be wrong jwt or expired jwt',
      })

    default:
      res.status(500).json({
        message: 'Internal server error',
        detail: 'Unhandled error',
      });
  }
}