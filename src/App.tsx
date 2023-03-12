import React from "react";

import "styles/App.scss";
import Repositories from "components/repositories/Repositories";
import { RepositoryDescription } from "components/repositories/RepositoryDescription";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Repositories, RepositoryDescription  } from "@components";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Repositories />} />
          <Route
            path="/repo/:organization/:repo"
            element={<RepositoryDescription />}
          />
          <Route path="/repos/:organization" element={<Repositories />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
