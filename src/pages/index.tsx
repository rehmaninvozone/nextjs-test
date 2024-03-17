import Head from "next/head";
import UserList from "@/pages/components/UserList";

const Home = () => {
  return (
    <div>
      <Head>
        <title>User Listing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserList />
    </div>
  );
};

export default Home;
