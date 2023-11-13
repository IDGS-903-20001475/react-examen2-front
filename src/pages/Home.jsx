import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redireccionar a la página de resultados con la consulta de búsqueda
    navigate(`/api/items/${searchQuery}`);
  };

  return (
    <div className="container text-center">
      <h1 className=" text-center">
        Bienvenido a Bazar Online
      </h1>
      <img className="col-md-6 mx-auto" src="data:image/png;base64,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" alt="" />
      <br /><br />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleSearch}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
