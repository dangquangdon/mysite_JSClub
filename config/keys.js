module.exports = {
  mongoURI: 'your mongoDB URI',
  secretKey: 'topsecret'
};

/**
    If you are using mongoDB locally, you might need to use this configuration
 */

// if (process.env.NODE_ENV === 'production'){
//   module.exports = {
//     mongoURI: 'mlab URI',
//     secretKey: 'topsecret'
//   };
// }else{
//   module.exports = {
//     mongoURI: 'local URI',
//     secretKey: 'topsecret'
//   };
// }
