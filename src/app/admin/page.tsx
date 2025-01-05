import React from "react";
import AdminNav from "../_components/AdminPage/AdminNav";
import Dashboard from "../_components/AdminPage/Dashboard";

const AdminPage = async () => {
  return (
    <section className="bg-bgGray min-h-screen">
      <div className="flex items-center p-4 md:hidden">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="flex">
        <AdminNav />
        <section className="my-2 mr-2 flex-grow rounded-lg bg-white p-4">
          <Dashboard />
        </section>
      </div>
    </section>
  );
};

export default AdminPage;
