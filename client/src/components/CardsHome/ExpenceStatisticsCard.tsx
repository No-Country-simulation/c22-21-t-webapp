// import React from "react";
// import { PieChart, Pie, Cell } from "recharts";

// interface Data {
//     name: string;
//     value: number;
// }

// const data: Data[] = [
//     { name: "Servicios", value: 10 },
//     { name: "Transporte", value: 2 },
//     { name: "Compras", value: 18 },
//     { name: "Supermercado", value: 11 },
//     { name: "Sin Categoría", value: 45 },
//     { name: "Salud y Deportes", value: 10 },
// ];

// const COLORS = ["#307842", "#102D17", "#2CA74A", "#0C7928", "#05B431", "#70D389"];

// const ExpenseStatisticsCard: React.FC = () => (
//     <div className="bg-success p-2 text-dark bg-opacity-25 border border-success-subtle border-4 rounded-4">
//         <h2 className="text-lg font-bold">Análisis de gastos</h2>
//         <PieChart width={500} height={300}>
//             <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 innerRadius={40}
//                 label={({ name }) => name}
//             >
//                 {data.map((e, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//             </Pie>
//         </PieChart>
//     </div>
// );

// export default ExpenseStatisticsCard;

import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface Data {
    name: string;
    value: number;
}

const data: Data[] = [
    { name: "Servicios", value: 10 },
    { name: "Transporte", value: 2 },
    { name: "Compras", value: 18 },
    { name: "Supermercado", value: 11 },
    { name: "Sin Categoría", value: 45 },
    { name: "Salud y Deportes", value: 10 },
];

const COLORS = ["#307842", "#102D17", "#2CA74A", "#0C7928", "#05B431", "#70D389"];

const ExpenseStatisticsCard: React.FC = () => (
    <div className="bg-success bg-opacity-25 border border-success-subtle rounded-3 p-3">
        <h2 className="fs-5 fw-bold">Análisis de gastos</h2>
        <div className="d-flex justify-content-center">
            <PieChart width={400} height={250}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name }) => name}
                >
                    {data.map((e, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    </div>
);

export default ExpenseStatisticsCard;
