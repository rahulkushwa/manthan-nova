import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { login } from "../../firebase/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await login(email, password);

      const user = userCredential.user;

      // Temporary Admin Check
      if (user.email === "rahulkushrnj@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        case "auth/invalid-email":
          setError("Invalid email address.");
          break;

        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        default:
          setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-6"
    >
      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email Address
        </label>

        <div className="flex items-center rounded-2xl border border-white/15 bg-white/10 px-4 backdrop-blur">
          <Mail
            size={18}
            className="text-slate-400"
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Password
        </label>

        <div className="flex items-center rounded-2xl border border-white/15 bg-white/10 px-4 backdrop-blur">
          <Lock
            size={18}
            className="text-slate-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full bg-transparent px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff
                size={20}
                className="text-slate-400"
              />
            ) : (
              <Eye
                size={20}
                className="text-slate-400"
              />
            )}
          </button>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Forgot Password */}

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-amber-400 hover:text-amber-300"
        >
          Forgot Password?
        </button>
      </div>

      {/* Login Button */}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 font-semibold text-slate-900 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2
              className="mr-2 animate-spin"
              size={20}
            />
            Signing In...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}