const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require(`${__dirname}/../../models/tourModel`);
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(process.env.DATABASE_LOCAL, { //for local db
  //for hosted one
//.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  /*console.log(con.connections);*/
  console.log("DB connection successful!");
});

//Read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
  try{
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch(err){
    console.log(err);
  }
  process.exit();
}

// Delete all data from the DB
const deleteData = async () => {
  try{
    await Tour.deleteMany();
    console.log('Data successfully deleted');
  } catch(err) {
    console.log(err);
  }
  process.exit();
};
// console.log(process.argv);
if (process.argv[2] === '--import'){
  importData();
  //process.exit();
} else if(process.argv[2] === '--delete'){
  deleteData();
}

// process.exit();

