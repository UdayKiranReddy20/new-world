import React, { useState, useEffect } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username && password) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          setUserData(data.user);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Please enter both username and password.");
    }
  };

  useEffect(() => {
    if (userData) {
      console.log("User data loaded:", userData);
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center text-white px-4">
      <header className="w-full max-w-3xl text-center py-12">
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl mr-2">🌍</span>
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            ConnectSphere
          </h1>
        </div>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
          A Hyper-Personalized Social Good Platform<br />
          <span className="text-indigo-300">Connecting you to causes that matter, powered by AI, blockchain, and community.</span>
        </p>
        <a href="#get-started">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all">
            Get Started
          </button>
        </a>
      </header>
      <section className="w-full max-w-4xl grid md:grid-cols-3 gap-8 mt-8 mb-16">
        <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-3xl mb-2">🤖</span>
          <h2 className="font-bold text-xl mb-1">AI-Powered Personalization</h2>
          <p className="text-sm text-indigo-100">Analyzes your X activity to match you with social impact initiatives tailored to your passions.</p>
        </div>
        <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-3xl mb-2">🔗</span>
          <h2 className="font-bold text-xl mb-1">Blockchain Transparency</h2>
          <p className="text-sm text-indigo-100">Track your donations and impact with full transparency and trust, powered by blockchain.</p>
        </div>
        <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-3xl mb-2">🎮</span>
          <h2 className="font-bold text-xl mb-1">Gamified Engagement</h2>
          <p className="text-sm text-indigo-100">Earn badges, points, and climb leaderboards as you make a difference in the world.</p>
        </div>
      </section>
      <section className="w-full max-w-md bg-white/10 rounded-xl p-8 shadow-lg flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-indigo-200">Login</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 rounded bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded transition-all flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-indigo-100">{message}</p>}
      </section>
      {loading && (
        <div className="text-indigo-200 text-lg">Loading your data...</div>
      )}
      {userData && (
        <section className="w-full max-w-4xl bg-white/10 rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-200">Your Personalized Feed</h2>
          <div className="space-y-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg">Environmental Initiative</h3>
              <p className="text-sm text-indigo-100">Join a local tree-planting event this weekend!</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg">Education Support</h3>
              <p className="text-sm text-indigo-100">Volunteer to tutor students in your community.</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg">Health & Wellness</h3>
              <p className="text-sm text-indigo-100">Donate to a campaign for clean water in developing regions.</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-200">Your Impact</h2>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm text-indigo-100">You've contributed to {userData.donations.length} initiatives and earned {userData.points} points!</p>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-200">Dashboard</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg">Quick Actions</h3>
              <ul className="list-disc list-inside text-sm text-indigo-100">
                <li>Update your profile</li>
                <li>View your badges</li>
                <li>Check leaderboard</li>
              </ul>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg">Recent Activity</h3>
              <ul className="list-disc list-inside text-sm text-indigo-100">
                {userData.donations.map((donation, index) => (
                  <li key={index}>{donation}</li>
                ))}
                {userData.badges.map((badge, index) => (
                  <li key={index}>Earned "{badge}" Badge</li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-200">AI-Inferred Interests</h2>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm text-indigo-100">Based on your X activity, you're passionate about: {userData.interests.join(", ")}.</p>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-200">Blockchain Donation Tracking</h2>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm text-indigo-100">Your recent donations are tracked on the blockchain for full transparency.</p>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-200">Gamification</h2>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm text-indigo-100">Earn badges, points, and climb leaderboards as you make a difference in the world.</p>
          </div>
        </section>
      )}
      <footer className="text-indigo-200 text-sm mt-auto mb-4">
        &copy; {new Date().getFullYear()} ConnectSphere. Built for social good.
      </footer>
    </div>
  );
}
