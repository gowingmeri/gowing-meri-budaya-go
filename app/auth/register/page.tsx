import Link from "next/link";

const RegisterPage = () => {
  return (
    <div>
      <p className="pl-5">Form Create Account Disini</p>
      <div className="flex items-center gap-3 mt-10 ml-5">
        <div>
          <p>Sudah punya akun?</p>
        </div>
        <div>
          <Link
            className="p-5 bg-primary text-white rounded-full"
            href="/auth/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
