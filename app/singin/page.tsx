"use client";
import { createClient } from "@/lib/client";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";

export default function SigninPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const supabase = createClient();
  const router = useRouter();
  async function handleAuth(event : React.FormEvent) {
    event.preventDefault();
    try{
      if(isSignUp) {
        const {error} = await supabase.auth.signUp({
          email,
          password
        });
        if(error) throw error;
        setMessage("Check your email for the confirmation link.");
      } else {
        const {error} = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if(error) throw error;
        setMessage("Check your email for the confirmation link.");
        router.push("/dashboard");
      }

    } catch (error) {
      console.error("Authentication error:", error);
      setMessage("An error occurred. Please try again.");}

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-lg font-medium text-gray-900">Personalized AI Newsletter</h1>
          <p className="mt-1 text-gray-600">{isSignUp ? "Sign up for your account" : "Sign in to your account"}</p>
        </div>
        <form className="space-y-5" onSubmit={handleAuth}>
          {message && <div className="bg-green-500 border border-green-200 rounded-md p-4"><div className="text-green-600 text-sm mb-4">Message: {message}</div></div>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp((prev) => !prev)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
