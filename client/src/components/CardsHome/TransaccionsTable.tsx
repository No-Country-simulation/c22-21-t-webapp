// import React from "react";

// interface Transaction {
//     operation: string;
//     name: string;
//     date: string;
//     status: string;
//     amount: string;
// }

// const transactions: Transaction[] = [
//     { operation: "Transferencia recibida", name: "Manuel Gonzales Pereira", date: "27-11-2024", status: "Éxitoso", amount: "$30.000" },
//     { operation: "Transferencia enviada", name: "Gino Hours", date: "27-11-2024", status: "Pendiente", amount: "$42.000" },
//     { operation: "Consumo", name: "Mercadopetit Buenos Aires", date: "27-11-2024", status: "Éxitoso", amount: "$5.995" },
//     { operation: "Transferencia enviada", name: "Patricia Lucrecia Muttan", date: "27-11-2024", status: "Rechazado", amount: "$1.503,35" },
// ];

// const TransactionsTable: React.FC = () => (
//     <div className="overflow-auto">
//         <table className="min-w-full bg-white shadow">
//             <thead>
//                 <tr className="bg-gray-200 text-left">
//                     <th className="p-2">Operación</th>
//                     <th className="p-2">Nombre</th>
//                     <th className="p-2">Fecha</th>
//                     <th className="p-2">Estado</th>
//                     <th className="p-2">Monto</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {transactions.map((tx, index) => (
//                     <tr key={index} className="border-b">
//                         <td className="p-2">{tx.operation}</td>
//                         <td className="p-2">{tx.name}</td>
//                         <td className="p-2">{tx.date}</td>
//                         <td className="p-2">{tx.status}</td>
//                         <td className="p-2 text-right">{tx.amount}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
// );

// export default TransactionsTable;


import React from "react";

interface Transaction {
    operation: string;
    name: string;
    date: string;
    status: string;
    amount: string;
}

interface TransactionsTableProps {
    transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => (
    <div className="table-responsive">
        <table className="table table-hover">
            <thead className="table-light">
                <tr>
                    <th>Operación</th>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th className="text-end">Monto</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((tx, index) => (
                    <tr key={index}>
                        <td>{tx.operation}</td>
                        <td>{tx.name}</td>
                        <td>{tx.date}</td>
                        <td>{tx.status}</td>
                        <td className="text-end">{tx.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TransactionsTable;

