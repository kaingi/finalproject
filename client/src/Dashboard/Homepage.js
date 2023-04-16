import React from "react";
export function Navbar() {
  return (
      <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight">FarmBidder</span>
        </div>
        <div class="flex flex-row gap-5">
        <div class="flex justify-end">
         <a href="\login" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a>
        </div>

        <div>
          <a href="\signup" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Signup</a>
        </div>
        </div>
      </nav>
  );
}
