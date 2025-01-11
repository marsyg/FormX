import React from "react";
import CreateForm from "./_components/createForm";
import FormList from "./_components/FormList";
import { SidebarTrigger } from "@/components/ui/sidebar";

function Dashboard() {
  return (
    <div className="flex flex-row w-screen bg-gray-100 ">
      <SidebarTrigger className="w-7 h-7  sticky top-0" />
      <div className="flex flex-col w-full md:ml-3 p-6 space-y-6">
        <div className="flex flex-row justify-between items-center bg-white p-4 shadow rounded-md">
          <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
          <CreateForm />
        </div>

        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Your Forms
          </h2>
          <FormList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
