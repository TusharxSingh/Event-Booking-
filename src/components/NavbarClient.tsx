'use client';

import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export function NavbarClient({ userName }: { userName: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="navbar-user">
      <span className="navbar-avatar">{userName.charAt(0).toUpperCase()}</span>
      <button onClick={handleSignOut} className="btn btn-ghost btn-sm" id="sign-out-btn">
        Sign Out
      </button>
    </div>
  );
}
