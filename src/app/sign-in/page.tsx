// app/sign-in/page.tsx
"use client";
import { SignIn } from "@clerk/nextjs";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-12 px-6 sm:px-8">
      <motion.div
        className="max-w-md w-full bg-white p-10 rounded-xl shadow-2xl border border-gray-200 relative overflow-hidden"
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF7A28] to-[#FF4C00] opacity-30 -z-10"></div>
        
        <motion.h2
          className="text-4xl font-bold text-[#FF7A28] text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sign In
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Please sign in to access your account and explore all features.
        </motion.p>

        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
        />

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="text-gray-600">Don't have an account? </span>
          <button 
            onClick={() => router.push("/sign-up")}
            className="text-[#FF7A28] font-semibold hover:text-[#FF4C00] transition-colors"
          >
            Sign Up
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SignInPage;
