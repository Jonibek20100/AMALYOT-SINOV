import React, { useState } from 'react';
import './App.css';

function App() {
  // Aktiv sahifani boshqarish: 'amaliyot', 'test', 'userlar'
  const [activeTab, setActiveTab] = useState('amaliyot');

  // Global foydalanuvchilar ro'yxati (Diagrammadagi 3 ta namuna boshlang'ich qiymat sifatida)
  const [users, setUsers] = useState([
    { id: 1, fullname: "Aliyev Vali", kurs: "Frontend", verselLink: "https://project1.vercel.app", testNatija: "25/30", ball: 85 },
    { id: 2, fullname: "Olimova Malika", kurs: "Node.js", verselLink: "https://project2.vercel.app", testNatija: "28/30", ball: 92 },
    { id: 3, fullname: "Karimov Umar", kurs: "React Foundation", verselLink: "https://project3.vercel.app", testNatija: "22/30", ball: 78 }
  ]);

  // Amaliyot formasi uchun state
  const [amaliyotForm, setAmaliyotForm] = useState({ fullname: '', link: '', kurs: 'React guruh' });
  
  // Test holati uchun state
  const [testForm, setTestForm] = useState({ fullname: '', belgilanganJavoblar: {}, isSubmited: false });

  // 1. Amaliyot topshirish funksiyasi
  const handleAmaliyotSubmit = (e) => {
    e.preventDefault();
    if (!amaliyotForm.fullname || !amaliyotForm.link) return alert("Hamma maydonlarni to'ldiring!");

    // Diagramma bo'yicha: Botga va Userlar sahifasiga boradi
    console.log("Telegram Botga yuborildi: ", amaliyotForm);
    
    const newUser = {
      id: Date.now(),
      fullname: amaliyotForm.fullname,
      kurs: amaliyotForm.kurs,
      verselLink: amaliyotForm.link,
      testNatija: "Topshirilmagan",
      ball: 0
    };

    setUsers([newUser, ...users]);
    alert("Amaliyot muvaffaqiyatli topshirildi va Telegram botga yuborildi!");
    setAmaliyotForm({ fullname: '', link: '', kurs: 'React guruh' });
    setActiveTab('userlar'); // Foydalanuvchini avtomatik userlar sahifasiga o'tkazish
  };

  // 2. Testni yakunlash funksiyasi
  const handleTestSubmit = (e) => {
    e.preventDefault();
    if (!testForm.fullname) return alert("Ismingizni kiriting!");

    // TO'G'RILANDI: O'zgaruvchi nomi birlashtirildi (togriJavoblarSoni)
    const togriJavoblarSoni = Object.keys(testForm.belgilanganJavoblar).length; // Shunchaki simulyatsiya
    const umumiyBall = togriJavoblarSoni * 10; 

    console.log("Telegram Botga test natijasi ketdi:", testForm.fullname, umumiyBall);

    const newUserWithTest = {
      id: Date.now(),
      fullname: testForm.fullname,
      kurs: "Onlayn Test",
      verselLink: "Topshirilmagan",
      // TO'G'RILANDI: Bu yerda ham o'zgaruvchi to'g'ri chaqirildi
      testNatija: `${togriJavoblarSoni}/30`,
      ball: umumiyBall
    };

    setUsers([newUserWithTest, ...users]);
    alert(`Test tugadi! Natija: ${togriJavoblarSoni}/30 botga va foydalanuvchilar ro'yxatiga yuborildi.`);
    setTestForm({ fullname: '', belgilanganJavoblar: {}, isSubmited: true });
    setActiveTab('userlar');
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Bilimlarimizni sinab ko'rish</h1>

      {/* Tepadagi Menu bo'limi */}
      <div className="nav-menu">
        <button 
          className={`nav-button ${activeTab === 'amaliyot' ? 'active' : ''}`}
          onClick={() => setActiveTab('amaliyot')}
        >
          Amaliyot
        </button>
        <button 
          className={`nav-button ${activeTab === 'test' ? 'active' : ''}`}
          onClick={() => setActiveTab('test')}
        >
          Testlar
        </button>
        <button 
          className={`nav-button ${activeTab === 'userlar' ? 'active' : ''}`}
          onClick={() => setActiveTab('userlar')}
        >
          Foydalanuvchilar (Userlar)
        </button>
      </div>

      {/* KONTENT QISMI */}
      <div className="main-content">
        
        {/* AMALIYOT SAHIFASI */}
        {activeTab === 'amaliyot' && (
          <div className="content-section">
            <h2>Amaliyot vazifasini topshirish</h2>
            <form onSubmit={handleAmaliyotSubmit}>
              <div className="form-group">
                <label>To'liq ismingiz (Fullname):</label>
                <input 
                  type="text" 
                  placeholder="Ism va familiyangizni kiriting..."
                  value={amaliyotForm.fullname}
                  onChange={(e) => setAmaliyotForm({...amaliyotForm, fullname: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Kurs nomi:</label>
                <input 
                  type="text" 
                  value={amaliyotForm.kurs}
                  onChange={(e) => setAmaliyotForm({...amaliyotForm, kurs: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Vercel loyiha linki:</label>
                <input 
                  type="url" 
                  placeholder="https://example.vercel.app"
                  value={amaliyotForm.link}
                  onChange={(e) => setAmaliyotForm({...amaliyotForm, link: e.target.value})}
                />
              </div>
              <button type="submit" className="submit-btn">Button bosilganda Botga va Userlarga boradi</button>
            </form>
          </div>
        )}

        {/* TEST SAHIFASI */}
        {activeTab === 'test' && (
          <div className="content-section">
            <h2>Bilimni sinash uchun testlar (30 ta)</h2>
            <form onSubmit={handleTestSubmit}>
              <div className="form-group">
                <label>To'liq ismingiz (Fullname):</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ismingizni kiriting..."
                  value={testForm.fullname}
                  onChange={(e) => setTestForm({...testForm, fullname: e.target.value})}
                />
              </div>

              {/* Namuna sifatida 2 ta savol */}
              <div className="test-box">
                <p><strong>1-Savol:</strong> React-da component nima?</p>
                <label><input type="radio" name="q1" onChange={() => setTestForm({...testForm, belgilanganJavoblar: {...testForm.belgilanganJavoblar, q1: true}})} /> Qayta ishlatiladigan kod bo'lagi</label> <br/>
                <label><input type="radio" name="q1" /> Ma'lumotlar bazasi</label>
              </div>

              <div className="test-box">
                <p><strong>2-Savol:</strong> useState nima uchun ishlatiladi?</p>
                <label><input type="radio" name="q2" onChange={() => setTestForm({...testForm, belgilanganJavoblar: {...testForm.belgilanganJavoblar, q2: true}})} /> State (holat)ni saqlash uchun</label> <br/>
                <label><input type="radio" name="q2" /> Stil berish uchun</label>
              </div>

              <button type="submit" className="submit-btn">Natija chiqadi va Telegram botga hamda Userlarga boradi</button>
            </form>
          </div>
        )}

        {/* USERLAR SAHIFASI */}
        {activeTab === 'userlar' && (
          <div className="content-section">
            <h2>Foydalanuvchilar Ro'yxati (Natijalar)</h2>
            <div className="users-grid">
              {users.map((user, index) => (
                <div className="user-card" key={user.id}>
                  <div className="badge">{index + 1}</div>
                  <div className="avatar-circle">rasm</div>
                  
                  <div className="user-info">
                    <p><strong>Fullname:</strong> {user.fullname}</p>
                    <p><strong>Kurs:</strong> {user.kurs}</p>
                    <p>
                      <strong>Amaliyot Vercel Linki:</strong> {" "}
                      {user.verselLink.startsWith('http') ? (
                        <a href={user.verselLink} target="_blank" rel="noreferrer">Havola</a>
                      ) : user.verselLink}
                    </p>
                    <p><strong>Test Natijasi:</strong> {user.testNatija}</p>
                    <p><strong>Umumiy Ball:</strong> {user.ball}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;