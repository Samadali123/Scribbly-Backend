const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');
const { generateToken } = require('../utils/generateToken');


const register = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.status(400).json({success :false, message : "All fields are required"});
  }

  try {
    const existingUser = await userDao.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userDao.createUser({ name, email, password: hashedPassword });
    if(! user) {
      return res.status(400).json({success :false, message : "User not created"});
    }
    const token = generateToken(res,user._id);
    if(!token) {
      return res.status(400).json({success :false, message : "Token not generated"});
    }
    res.status(201).json({success :true, message : "User register successfully", user, token});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({success :false, message : "All fields are required"});
  }
  try {
    const user = await userDao.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(res,user._id);
    if(!token) {
      return res.status(400).json({success :false, message : "Token not generated"});
    }
    res.status(200).json({success :true, message : "User login successfully", user, token});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({success :true, message : "User logout successfully"});
}

module.exports = { register, login,logout }; 