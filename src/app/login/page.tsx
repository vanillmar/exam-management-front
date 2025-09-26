import LoginCard from '@/components/LoginCard';
import Topbar from '@/components/Topbar';

const LoginPage = () => {
  return (

    <div>
      <Topbar />
      <LoginCard />
    </div>
    // <div className="login-card"> {/* Custom class from style.css */}
    //   <h2 className="signin-title">Sign In</h2> {/* Custom class */}
    //   <label htmlFor="username">Username</label>
    //   <input id="username" type="text" className="w-full" /> {/* Tailwind + custom input styles */}
    //   <label htmlFor="password">Password</label>
    //   <input id="password" type="password" />
    //   <button className="cta" id="loginBtn">Sign In</button> {/* Custom CTA button */}
    // </div>
  );
};

export default LoginPage;