import { useState, useEffect } from 'react';
import './product.css';
import { NavLink } from "react-router-dom"
const ProductList = () => {
    const [Product, setProduct] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [editedProduct, setEditedProduct] = useState({
        id: '',
        titulo: '',
        marca: '',
        precio: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/apiRoutes/"
                );
                const data = await response.json();
                setProduct(data);
                setFilteredProduct(data);
                updateTotalPages(data);
            } catch (error) {
                console.error('Error fetching Product data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Apply search filter
        const filteredData = Product.filter((Product) => {
            if (!Product) { // Check if Product is not null
              return false;
            }
            return Object.values(Product).some(
              (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
          });
        setFilteredProduct(filteredData);
        setCurrentPage(1);
        updateTotalPages(filteredData);
    }, [searchTerm, Product]);

    const updateTotalPages = (data) => {
        setTotalPages(Math.ceil(data.length / pageSize));
    };

    const handleEditClick = (Product) => {
        // Set the edited Product when the edit button is clicked
        setEditedProduct(Product);
    };

    const handleSaveEdit = () => {
        // Implement edit logic in memory
        const updatedProduct = Product.map((u) => (u.id === editedProduct.id ? editedProduct : u));
        setProduct(updatedProduct);
        setFilteredProduct(updatedProduct);
        setEditedProduct({
            id: '',
        titulo: '',
        marca: '',
        precio: '',
        });
    };

    const handleDeleteClick = (ProductId) => {
        // Implement delete logic in memory
        const updatedProduct = Product.filter((Product) => Product.id !== ProductId);
        setProduct(updatedProduct);
        setFilteredProduct(updatedProduct);
        setSelectedRows(selectedRows.filter((id) => id !== ProductId));
    };

    const handleCheckboxChange = (ProductId) => {
        // Toggle selected row
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(ProductId)) {
                return prevSelectedRows.filter((id) => id !== ProductId);
            } else {
                return [...prevSelectedRows, ProductId];
            }
        });
    };

    const handleSelectAll = () => {
        // Select or deselect all rows on the current page
        const allIdsOnPage = filteredProduct.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        ).map((Product) => Product.id);

        if (selectedRows.length === allIdsOnPage.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(allIdsOnPage);
        }
    };

    const handleDeleteSelected = () => {
        // Delete selected rows in memory
        const updatedProduct = Product.filter((Product) => !selectedRows.includes(Product.id));
        setProduct(updatedProduct);
        setFilteredProduct(updatedProduct);
        setSelectedRows([]);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleInputChange = (e) => {
        setEditedProduct({
            ...editedProduct,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='Product-Main'>
            <h1>Product List</h1>
          
            <input
                className='search'
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
          <NavLink to="http://localhost:3000/products/createProduct"  className='edit-btn' href="/">Crear Productos</NavLink>
            <table className='Product-table'>
                <thead>
                    <tr>
                        <th>Select</th>
                      
                        <th>Imagen</th>
                        <th>Titulo</th>
                        <th>Marca</th>
                        <th>precio</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProduct
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        .map((Product) => (
                            <tr key={Product.id} className={selectedRows.includes(Product.id) ? 'selected' : ''}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(Product.id)}
                                        onChange={() => handleCheckboxChange(Product.id)}
                                    />
                                </td>
                                
                                <td><img src={ `http://localhost:3000/img/products/${Product.Images[0].name}`} className='imagenpro' /></td>
                                
                                <td className='brands'>{Product.titulo}</td>
                                <td >{Product.brands.name}</td>
                                <td>${Product.price}</td>
                                <td>
                                
                                    <button className='edit-btn' onClick={() => handleEditClick(Product)}>Edit</button>
                                    <button className='delete-btn' onClick={() => handleDeleteClick(Product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className='allbuttons'>
                <div>
                    <button onClick={handleSelectAll}>Select/Deselect All</button>
                    <button onClick={handleDeleteSelected}>Delete Selected</button>
                </div>
                <div>
                    <button onClick={() => handlePageChange(1)}>First Page</button>
                    <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    >
                        Previous Page
                    </button>
                    <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    >
                        Next Page
                    </button>
                    <button onClick={() => handlePageChange(totalPages)}>Last Page</button>
                    <span>
                        {"  "} Page {currentPage} of {totalPages}
                    </span>
                </div>
            </div>

            {editedProduct.id && (
                <div className='edit-form'>
                    <h2>Edit Product</h2>
                    <form>
                        <label>
                            Id:
                            <input
                                type="text"
                                name="id"
                                value={editedProduct.id}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Imagen:
                            <input
                                type="file"
                                name="imagen"
                                value={editedProduct.imagen}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Marca:
                            <input
                                type="text"
                                name="marca"
                                value={editedProduct.brands.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Titulo:
                            <input
                                type="text"
                                name="titulo"
                                value={editedProduct.titulo}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Precio:
                            <input
                                type="text"
                                name="precio"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button type="button" onClick={handleSaveEdit}>Save</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductList;