import mongoose from 'mongoose'

const mongoose_url: any = process.env.DB_URL

mongoose.connect(mongoose_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, (err) => {
    if (!err) {
      console.log('Connected to DB successfully');
    } else {
      console.log(`Error in DB connection ${err}`);
    }
  });