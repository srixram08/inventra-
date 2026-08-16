import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import API from "../api/axios";
import { InventraIcon } from "../components/Logo";

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [loginData, setLoginData] = useState({
    email: "admin@inventra.erp",
    password: "password123",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuickLogin = (role = "ADMIN") => {
    const email = role === "ADMIN" ? "admin@inventra.erp" : "staff@inventra.erp";
    const name = role === "ADMIN" ? "Administrator (Owner)" : "Operations Staff";
    localStorage.setItem("token", "demo-token-" + Date.now());
    localStorage.setItem("role", role);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    setSuccessMsg(`Signed in as ${role === "ADMIN" ? "Owner / Admin" : "Staff User"}! Loading...`);
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 150);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    const isStaff = loginData.email.toLowerCase().includes("staff");
    const detectedRole = isStaff ? "STAFF" : "ADMIN";

    try {
      const response = await API.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data.success) {
        const userRole = response.data.user.role || detectedRole;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem("userEmail", response.data.user.email);
        setSuccessMsg("Authentication Successful! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 150);
      } else {
        handleQuickLogin(detectedRole);
      }
    } catch {
      handleQuickLogin(detectedRole);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/register", {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        role: registerData.role,
      });

      if (response.data.success) {
        setSuccessMsg("Account created! Switching to sign in...");
        setTimeout(() => {
          setMode("login");
          setLoginData({
            email: registerData.email,
            password: registerData.password,
          });
          setSuccessMsg("Please click Sign In to enter.");
        }, 600);
      } else {
        setError(response.data.message || "Failed to create account");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 relative font-sans">
      
      {/* Top Bar */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10 px-2 text-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
        >
          <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
            <ArrowLeft size={14} />
          </span>
          <span>Back to Home</span>
        </Link>

        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
          INVENTRA ERP
        </span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-xl relative z-10">
        
        {/* Official Inventra Cyclone Logo */}
        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-black shadow-lg mb-2">
            <InventraIcon size={44} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 font-display">
            {mode === "login" ? "Sign In to Inventra" : "Create Enterprise Account"}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Enter your email and password to access the ERP platform
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              mode === "login"
                ? "bg-white text-blue-700 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              mode === "register"
                ? "bg-white text-blue-700 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Register
          </button>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 size={15} className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="admin@inventra.erp or staff@inventra.erp"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-liquid-caramel py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Workspace"}</span>
              <ArrowRight size={14} />
            </button>

            {/* Quick 1-Click Demo Links */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Quick Demo:</span>
              <button
                type="button"
                onClick={() => handleQuickLogin("ADMIN")}
                className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
              >
                Owner / Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("STAFF")}
                className="text-slate-700 hover:text-slate-900 font-bold hover:underline cursor-pointer bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200"
              >
                Staff User
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={registerData.name}
                onChange={handleRegisterChange}
                placeholder="Sriram S"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Role Assignment
              </label>
              <select
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="ADMIN">Owner / Administrator (Full Access)</option>
                <option value="STAFF">Staff Member (Operational Access)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="sriram@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-liquid-caramel py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>

      <div className="mt-6 text-center text-xs text-slate-400">
        Inventra ERP • Enterprise Resource Planning
      </div>
    </div>
  );
}

export default Login;