import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Home Page</h1>
      <p className="mb-4">Welcome to the Citilyst user area!</p>
      <Button>User Action</Button>
    </div>
  );
};

export default Home;
