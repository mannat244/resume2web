"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="font-semibold mx-auto my-auto">Loading...</p>;

  return (
    <div>
      <div className="bg-slate-300 h-14">

      </div>

      {session ? (
        <>
          <h1>Welcome, {session.user.name}!</h1>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <h1>You're not logged in</h1>
          <button onClick={() => signIn("google")}>Login</button>
        </>
      )}
    </div>
  );
}
