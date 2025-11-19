import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <p className="pl-5">Form Login Disini</p>
      <div className="flex items-center gap-3 mt-10 ml-5">
        <div>
          <p>Belum punya akun?</p>
        </div>
        <div>
          <Link
            className="p-5 bg-primary text-white rounded-full"
            href="/auth/register"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
