import UsersContainer from "@/app/components/UsersContainer";

export default async function Following() {
  return (
    <main>
      <h2>Following</h2>
      <UsersContainer endpoint="following" />
    </main>
  );
}
