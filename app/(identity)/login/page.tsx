import LoginForm from "@/src/identity/forms/form.login";
import { Vote } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 px-4 sm:px-6">
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold text-2xl sm:text-3xl"
      >
        <div className="bg-primary text-primary-foreground flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md">
          <Vote className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <span>Vote Inc.</span>
      </Link>

      <div className="w-full max-w-md sm:max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
}
