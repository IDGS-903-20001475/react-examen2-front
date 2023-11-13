import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const { searchQuery } = useParams();
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/items?q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error(`La solicitud no fue exitosa: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
      setTotalResults(data.length);
      console.log(data);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  }, [searchQuery]);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/api/items/${searchInput}`);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <br />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="header text-center mb-4">{`Resultados para: ${searchQuery}`}</h1>
      <p className="text-center">{`Total de objetos encontrados: ${totalResults}`}</p>
      <div className="row">
        {results.map((product) => {
          return (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Precio: ${product.price}</p>
                  <p className="card-text">Categoria: {product.category}</p>
                  <p className="card-text">Rating: {product.rating}</p>
                </div>
                <div className="card-footer">
                  <a
                    href={`/api/item/${product.id}`}
                    className="btn btn-primary"
                  >
                    Ver detalle
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
