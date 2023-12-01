const userModel = require("../model/userModel");
const { hash_password }= require("./hash_match_password");
const dbConnect =require('../database/db');
dbConnect();
const createPoliceADMINUser = async (firstnam, lastnam, NID, emaill, phonee, password) => {
    try {
        const existingUser = await userModel.findOne({ email: emaill });
        if (!existingUser == null) {
            console.log("police admin user already exists")
        }
        else {
            const hpass = await hash_password(password);
            const PoliceOfficer = new userModel({
                firstname: firstnam,
                lastname: lastnam,
                nID: NID,
                email: emaill,
                phone: phonee,
                password: hpass,
                role: "POLICE ADMIN"
            })
            await PoliceOfficer.save()
            console.log("saved police administrator sucessfully")
        }
    } catch (error) {
        console.log(error)
    }
}

const fname = process.argv[2];
const lname = process.argv[3];
const natid = process.argv[4];
const em = process.argv[5];
const ph = process.argv[6];
const pas = process.argv[7];

createPoliceADMINUser(fname, lname,natid,em,ph,pas);