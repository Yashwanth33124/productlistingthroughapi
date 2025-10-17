import React, { useEffect, useState } from 'react';
import './product.css';

function Product() {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);

    async function fetchdata() {
        setloading(true);
        seterror(null);
        try {
            let result = await fetch("https://fakestoreapi.com/products");
            if (!result.ok) {
                throw new Error("Network response was not ok");
            }
            let show = await result.json();
            setdata(show);
        } catch (err) {
            seterror(err.message);
        } finally {
            setloading(false);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []); 

    if (loading) {
        return <h1 className="loading">Loading........</h1>;
    }

    if (error) {
        return <h1 className="error">Error: {error}</h1>;
    }

    return (
        <div className="product-grid">
            {data.map((item) => (
                <div className="product-card" key={item.id}>
                    <img className="product-image" src={item.image} alt={item.title} />
                    <h2 className="product-title">{item.title}</h2>
                    <p className="product-price">${item.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Product;
