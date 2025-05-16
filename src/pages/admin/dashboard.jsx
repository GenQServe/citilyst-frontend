import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Manage your Citilyst application here.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded-md">
          <h2 className="font-bold">Users</h2>
          <p>Manage system users</p>
          <Button className="mt-2" variant="outline">
            Manage
          </Button>
        </div>
        <div className="p-4 border rounded-md">
          <h2 className="font-bold">Settings</h2>
          <p>System configuration</p>
          <Button className="mt-2" variant="outline">
            Configure
          </Button>
        </div>
        <div className="p-4 border rounded-md">
          <h2 className="font-bold">Reports</h2>
          <p>View analytics</p>
          <Button className="mt-2" variant="outline">
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
