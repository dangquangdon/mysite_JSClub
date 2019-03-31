module.exports = {
  mongoURI: 'mongodb://don:don1234@ds038319.mlab.com:38319/mysite2019',
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
