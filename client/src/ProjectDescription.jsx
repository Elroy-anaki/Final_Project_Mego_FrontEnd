import React from "react";

function ProjectDescription() {
  return (
    <div className="text-center space-y-4 my-5 text-white">
      <h1 className="text-5xl">Plate Ahead</h1>
      <h2 className="text-3xl">
        Revolutionizing the Restaurant Experience with Smart Ordering
      </h2>
      <p className="w-3/4 mx-auto text-2xl ">
        Inspired by a personal experience, this project simplifies restaurant
        food ordering, making it faster and stress-free. <br /> 
        <span className="underline block my-3">Built with React, Node.js, and MongoDB, it includes:</span>
      </p>
      <div className="w-1/2 mx-auto text-2xl">
        ✅ Customer App – Order in advance, track prep times, and pay easily. <br />✅
        Admin App – Manage menus, track orders, and streamline operations.
      </div>{" "}
      <p className="text-2xl">
        With Google & PayPal API integrations and React Query optimization, it
        delivers high performance and a seamless experience.
      </p>
    </div>
  );
}

export default ProjectDescription;
