import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

    const fetchProduct = useCallback( async () => {
      try {
        // Realiza la llamada a la API para obtener detalles del producto por ID
        const response = await fetch(`http://localhost:3001/api/item/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }, [id]);

    useEffect(() => {
        fetchProduct();
        }, [fetchProduct]);

  // Renderiza el componente solo si los detalles del producto están disponibles
  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="header text-center">{product.title}</h2>
      <div className="card">
        <img src={product.thumbnail} alt={product.title} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">Precio: ${product.price}</p>
          <p className="card-text">Descuento: {product.discountPercentage}%</p>
          <p className="card-text">Rating: {product.rating}</p>
          <p className="card-text">Stock: {product.stock}</p>
          <p className="card-text">Marca: {product.brand}</p>
          <p className="card-text">Categoría: {product.category}</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary">Comprar ahora</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
