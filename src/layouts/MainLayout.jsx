import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar will come here */}

      <main>
        <Outlet />
      </main>

      {/* Footer will come here */}
    </div>
  );
};

export default MainLayout;