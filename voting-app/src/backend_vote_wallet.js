const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory store for wallets, votes, and verification codes (in production, use a proper database)
const wallets = {};
const votes = {};
const verificationCodes = {};

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jhlove4061@gwnu.ac.kr',
    pass: '@jeahan2001@',
  },
});

// Endpoint to generate wallet and send verification email
app.post('/generate-wallet', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Generate a verification code
  const verificationCode = crypto.randomBytes(3).toString('hex');
  verificationCodes[email] = verificationCode;

  // Send verification email
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: '강릉원주대학교 과학기술대학 별하제 장기자랑 투표 인증번호입니다.',
    text: `안녕하세요! 요청하신 인증번호는 ${verificationCode} 입니다. 이 코드는 보안상 5분 이내에 사용해 주시기 바랍니다.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send email:', error); // Log the error for debugging
      return res.status(500).send('이메일로 보내지 못했습니다.');
    } else {
      console.log('Email sent:', info.response); // Log the response for debugging
      res.status(200).send('이메일로 보냈습니다.');
    }
  });
});

// Endpoint to verify code and generate wallet
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).send('Email and code are required');
  }

  if (verificationCodes[email] !== code) {
    return res.status(400).send('Invalid verification code');
  }

  // Generate a new wallet
  const wallet = ethers.Wallet.createRandom();
  wallets[email] = wallet;

  // Clear the verification code after successful verification
  delete verificationCodes[email];

  res.status(200).send({ address: wallet.address });
});

// Endpoint to vote
app.post('/vote', (req, res) => {
  const { email, candidate } = req.body;
  const wallet = wallets[email];

  if (!wallet) {
    return res.status(400).send('Wallet not found');
  }

  if (votes[email]) {
    return res.status(400).send('이미 투표를 완료했습니다.');
  }

  // Register the vote
  votes[email] = candidate;

  console.log('Vote registered:', email, candidate); // Log the vote for debugging

  res.status(200).send(`Vote casted by ${wallet.address} for candidate ${candidate}`);
});

// Endpoint to get real-time vote counts
app.get('/results', (req, res) => {
  const results = {};
  Object.values(votes).forEach((candidate) => {
    if (!results[candidate]) {
      results[candidate] = 0;
    }
    results[candidate] += 1;
  });

  console.log('Current voting results:', results); // Log the results for debugging

  res.status(200).send(results);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});