// app/sign-up/page.tsx
"use client";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-12 px-6 sm:px-8 relative">
      <motion.div
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border border-gray-100 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative z-10">
          {/* Heading */}
          <motion.h2
            className="text-4xl font-bold text-[#FF7A28] text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Create Your Account
          </motion.h2>

          {/* SignUp Clerk Component */}
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            afterSignUpUrl="/dashboard"
          />

          {/* Sign In Prompt */}
          <motion.div
            className="mt-6 flex justify-center items-center text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span className="mr-2">Already have an account?</span>
            <button
              onClick={() => router.push("/sign-in")}
              className="text-[#FF7A28] font-semibold hover:text-[#FF4C00] transition-colors duration-300"
            >
              Sign In
            </button>
          </motion.div>

          
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
