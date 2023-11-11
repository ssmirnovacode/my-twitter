"use client";

import AvatarForm from "./AvatarForm";
import SignoutButton from "./SignoutButton";

export default function AccountPage() {
  return (
    <div>
      <h2>Account</h2>
      <AvatarForm />
      <SignoutButton />
    </div>
  );
}
