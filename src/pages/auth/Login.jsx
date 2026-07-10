import AuthLayout from "../../components/auth/AuthLayout";
import LoginCard from "../../components/auth/LoginCard";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout>

      <LoginCard>

        <h1 className="text-center text-4xl font-black text-white">
          Manthan Nova
        </h1>

        <p className="mt-3 text-center text-slate-300">
          Student Learning Portal
        </p>

        <LoginForm />

      </LoginCard>

    </AuthLayout>
  );
}