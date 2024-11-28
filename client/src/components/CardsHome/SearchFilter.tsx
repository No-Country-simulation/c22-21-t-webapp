// import React from "react";

// const SearchFilter: React.FC = () => (
//     <div className="flex gap-2">
//         <input type="text" placeholder="Buscar por nombre" className="p-2 border rounded w-full" />
//         <select className="p-2 border rounded">
//             <option>Ordenar por</option>
//             <option>Nombre</option>
//             <option>Fecha</option>
//         </select>
//     </div>
// );

// export default SearchFilter;

import React, { ChangeEvent } from "react";

interface SearchFilterProps {
    onSearch: (term: string) => void;
    onSort: (sortBy: string) => void; 
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onSort }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onSort(event.target.value); 
    };

    return (
        <div className="d-flex gap-2 mb-4">
            <input
                type="text"
                placeholder="Buscar por nombre u operación"
                className="form-control"
                onChange={handleInputChange}
            />
            <select className="form-select" onChange={handleSortChange}>
                <option value="">Ordenar por</option>
                <option value="Nombre">Nombre</option>
                <option value="Fecha">Fecha</option>
            </select>
        </div>
    );
};

export default SearchFilter;


