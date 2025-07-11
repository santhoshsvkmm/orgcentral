import Link from 'next/link';
import logo from "../../public/logo.svg"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-bold text-primary ${className}`}>
         {/* <Logo/>; */}
    </Link>
  );
}
