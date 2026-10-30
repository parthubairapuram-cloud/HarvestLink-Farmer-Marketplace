import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
const uri=process.env.MONGODB_URI;
if(!uri){console.error("Set MONGODB_URI before running npm run seed");process.exit(1);}
await mongoose.connect(uri);
const userSchema=new mongoose.Schema({name:String,email:{type:String,unique:true},password:String,role:String,location:String,farmName:String,verified:Boolean},{timestamps:true});
const productSchema=new mongoose.Schema({farmer:mongoose.Schema.Types.ObjectId,name:String,category:String,description:String,unit:String,quantity:Number,price:Number,location:String,availabilityDate:Date,pickup:Boolean,delivery:Boolean,status:String},{timestamps:true});
const User=mongoose.models.User||mongoose.model("User",userSchema);const Product=mongoose.models.Product||mongoose.model("Product",productSchema);
const password=await bcrypt.hash("Harvest123!",12);
const farmers=[
["Ananya Rao","ananya@harvestlink.demo","Green Valley Farm","Nandyal"],
["Ravi Kumar","ravi@harvestlink.demo","Sunrise Fields","Kurnool"],
["Meera Reddy","meera@harvestlink.demo","Mango Grove","Kadapa"],
["Suresh Naidu","suresh@harvestlink.demo","Riverbend Organics","Anantapur"],
["Lakshmi Devi","lakshmi@harvestlink.demo","Lakshmi Dairy & Greens","Guntur"]
];
for(const [name,email,farmName,location] of farmers){await User.updateOne({email},{ $setOnInsert:{name,email,password,role:"farmer",farmName,location,verified:true}},{upsert:true});}
await User.updateOne({email:"admin@harvestlink.demo"},{ $setOnInsert:{name:"HarvestLink Admin",email:"admin@harvestlink.demo",password,role:"admin",location:"Platform",verified:true}},{upsert:true});
const docs=await User.find({email:{$in:farmers.map(x=>x[1])}});
const produce=[
["Tomatoes","Vegetables","kg",120,28,"Nandyal"],["Green chilli","Vegetables","kg",45,52,"Nandyal"],["Spinach","Vegetables","kg",30,24,"Nandyal"],
["Banana","Fruits","dozen",80,38,"Kurnool"],["Sweet lime","Fruits","kg",90,48,"Kurnool"],["Papaya","Fruits","kg",60,32,"Kurnool"],
["Mango","Fruits","kg",100,75,"Kadapa"],["Guava","Fruits","kg",55,42,"Kadapa"],["Pomegranate","Fruits","kg",40,110,"Kadapa"],
["Groundnut","Grains","kg",200,95,"Anantapur"],["Millets","Grains","kg",150,68,"Anantapur"],["Red gram","Grains","kg",100,115,"Anantapur"],
["Fresh milk","Dairy","litre",40,56,"Guntur"],["Curd","Dairy","litre",25,65,"Guntur"],["Coriander leaves","Vegetables","kg",18,35,"Guntur"]
];
for(let i=0;i<produce.length;i++){const [name,category,unit,quantity,price,location]=produce[i];await Product.updateOne({name,location},{ $setOnInsert:{farmer:docs[i%docs.length]._id,name,category,description:`Fresh ${name.toLowerCase()} directly from ${location} growers. Contact the farmer through an order request.`,unit,quantity,price,location,availabilityDate:new Date(),pickup:true,delivery:i%2===0,status:"active"}},{upsert:true});}
console.log("Seed complete: 5 farmer accounts and 15 product listings.");
console.log("Demo farmer login: ananya@harvestlink.demo / Harvest123!");
console.log("Demo buyer: register a buyer account in the app.");
console.log("Demo admin login: admin@harvestlink.demo / Harvest123!");
await mongoose.disconnect();