import React, { useContext, useState, useEffect } from "react";
import CubeLink from "./CubeLink";
import { cubeLinks } from "./links";
import { AuthContext } from "../../../context/AuthContext";
import ProjectDescription from "../../../ProjectDescription";
import { Helmet } from "react-helmet-async";
import { helmetHome } from "../../../helmet/home";

function Home() {
  const { user } = useContext(AuthContext);
  const [toggleDescription, setToggleDescription] = useState(true);

  return (
    <div className="text-center">
      <Helmet {...helmetHome} />
      {toggleDescription ? (
        <ProjectDescription />
      ) : (
        <div className="mt-5 w-11/12 mx-auto flex flex-col justify-center items-center space-y-20">
          <div>
            <h1 className="text-5xl text-center text-white">
              Welcome, {user ? user?.userName : "Eater"}!
            </h1>
          </div>
          <div className="flex flex-wrap w-full text-center items-center justify-center gap-5">
            {cubeLinks.map((cubeLink) => (
              <CubeLink key={cubeLink.name} {...cubeLink} />
            ))}
          </div>
        </div>
      )}
      {toggleDescription && (
        <button
          className=" text-2xl text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-xl p-3 hover:bg-gradient-to-r hover:from-amber-500 hover:via-amber-600 hover:to-amber-500"
          onClick={() => setToggleDescription(!toggleDescription)}
        >
          Let's dive into the project!
        </button>
      )}
    </div>
  );
}

export default Home;
