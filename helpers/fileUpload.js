const path = require('path');
module.exports = {
  checkFileType: (file, callback) => {
    //Allowed extension
    const file_types = /jpeg|jpg|png|gif/;

    // Check extension
    const ext_name = file_types.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mime_type = file_types.test(file.mimetype);

    if (ext_name && mime_type) {
      return callback(null, true);
    } else {
      return callback('error: Images only!');
    }
  }
};
