import React, { useEffect, useState } from 'react'
import { ListCategories } from '../services/CategoryService'

const ListCategoriesComponents =() =>{

    const [categories,setCategories] = useState([])

    useEffect(() => {
        console.log("Fetching data...");
        axios.get('http://localhost:3000/api/categories')
            .then((response) => {
                console.log("Response:", response);
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    }, []);
  return (
    <div>
            <h2>List of Categories</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category.name}</li>  
                ))}
            </ul>
        </div>
  )
}

export default ListCategoriesComponents