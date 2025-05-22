import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'; // Import CSS for neumorphism styling

function App() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [candidate, setCandidate] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isWalletGenerated, setIsWalletGenerated] = useState(false);
  const navigate = useNavigate();

  const sendVerificationCode = async () => {
    try {
      console.log('Attempting to send verification code to:', email); // Log for debugging
      await axios.post('http://localhost:3001/generate-wallet', { email });
      setIsCodeSent(true);
      console.log('Verification code sent to:', email); // Log for debugging
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const verifyCodeAndGenerateWallet = async () => {
    try {
      console.log('Attempting to verify code for:', email); // Log for debugging
      const response = await axios.post('http://localhost:3001/verify-code', { email, code });
      setIsWalletGenerated(true);
      console.log('Wallet generated for:', email, 'Address:', response.data.address); // Log for debugging
    } catch (error) {
      console.error('Error verifying code:', error);
      alert(error.response?.data || 'Error verifying code');
    }
  };

  const vote = async () => {
    try {
      console.log('Attempting to vote for candidate:', candidate, 'with email:', email); // Log for debugging
      await axios.post('http://localhost:3001/vote', { email, candidate });
      alert('투표가 완료되었습니다.!');
    } catch (error) {
      console.error('Error casting vote:', error);
      alert(error.response?.data || 'Error casting vote');
    }
  };

  const goToResults = () => {
    navigate('/results');
  };

  return (
    <div className="container neumorphism-background">
      <div className="card neumorphism">
        <h1>별하제 장기자랑 투표</h1>
        <div className="input-group">
          <input
            type="email"
            className="neumorphism-input"
            placeholder="이메일 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="neumorphism-button" onClick={sendVerificationCode}>인증 코드 받기</button>
        </div>
        {isCodeSent && !isWalletGenerated && (
          <div className="input-group">
            <input
              type="text"
              className="neumorphism-input"
              placeholder="인증코드를 입력해주세요."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="neumorphism-button" onClick={verifyCodeAndGenerateWallet}>인증하기</button>
          </div>
        )}
        {isWalletGenerated && (
          <div className="voting-section">
            <select
              className="neumorphism-select"
              value={candidate}
              onChange={(e) => setCandidate(e.target.value)}
            >
              <option value="">투표해주세요</option>
              <option value="Candidate 1">정제훈</option>
              <option value="Candidate 2">최지한</option>
              <option value="Candidate 3">조준영</option>
            </select>
            <button className="neumorphism-button" onClick={vote}>투표</button>
          </div>
        )}
        <button className="neumorphism-button" onClick={goToResults}>결과 보기</button>
      </div>
    </div>
  );
}

export default App;