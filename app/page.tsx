import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex gap-3 mt-10 ml-5">
      <div>
        <Link
          className="p-5 bg-primary text-white rounded-full"
          href="/auth/login"
        >
          Login
        </Link>
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
  );
};

export default HomePage;
