// import React, { useState, useEffect } from "react";
// import BackgroundComponent from "../../components/BackgroundComponent";
// import { SEO } from "../../components/SEO/SEO";
// import AvailableBalanceCard from "../../components/CardsHome/AvailableBalanceCard";
// import ExpenseStatisticsCard from "../../components/CardsHome/ExpenceStatisticsCard";
// import SearchFilter from "../../components/CardsHome/SearchFilter";
// import TransactionsTable from "../../components/CardsHome/TransaccionsTable";

// const Home: React.FC = () => {
//     const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 1024);
//         window.addEventListener("resize", handleResize);

//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return (
//         <>
//             <SEO
//                 title="HOME | BANKI"
//                 description="Bienvenido a la página de inicio de nuestro sitio web. Aquí podrás encontrar información importante."
//                 keywords={["inicio", "bienvenida", "sitio web"]}
//                 image="../assets/BANKIico.png"
//                 url="https://localhost:5173/home"
//                 type="website"
//             />
//             <BackgroundComponent>
//                 <div
//                     className="bg-white p-4 rounded shadow"
//                     style={{
//                         width: isMobile ? "100%" : "90%",
//                         maxWidth: isMobile ? "100vw" : "80vw",
//                         height: isMobile ? "80vh" : "100vh",
//                         margin: isMobile ? "0 auto" : "",
//                         position: "relative",
//                         zIndex: 1,
//                         marginTop: isMobile ? "20vh" : "",
//                         display: isMobile ? "grid" : "",
//                         gridTemplateRows: isMobile ? "auto auto 1fr" : "",
//                         gap: isMobile ? "1rem" : "",
//                     }}
//                 >
//                     <header className="flex justify-between items-center">
//                         <h1 className="fs-3 bold text-start pb-4">
//                             Movimientos de tu cuenta para el mes de Noviembre
//                             del 2024
//                         </h1>
//                     </header>
//                     <div className="d-flex flex-column justify-content-center align-items-center flex-md-row">
//                         <div className="d-flex flex-column gap-4 mx-auto">
//                             <div>
//                                 <AvailableBalanceCard />
//                             </div>
//                             <div>
//                                 <div className="bg-success p-4 rounded-4 h-2">
//                                     <h2 className="fs-4 bold text-start">
//                                         Opción de financiamiento
//                                     </h2>
//                                     <p className="fs-1 text-center text-light">
//                                         $0
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <ExpenseStatisticsCard />
//                         </div>
//                     </div>
//                     <SearchFilter />
//                     <TransactionsTable />
//                 </div>
//             </BackgroundComponent>
//         </>
//     );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import BackgroundComponent from "../../components/BackgroundComponent";
import { SEO } from "../../components/SEO/SEO";
import AvailableBalanceCard from "../../components/CardsHome/AvailableBalanceCard";
import ExpenseStatisticsCard from "../../components/CardsHome/ExpenceStatisticsCard";
import SearchFilter from "../../components/CardsHome/SearchFilter";
import TransactionsTable from "../../components/CardsHome/TransaccionsTable";

interface Transaction {
    operation: string;
    name: string;
    date: string;
    status: string;
    amount: string;
}

const transactionsData: Transaction[] = [
    {
        operation: "Transferencia recibida",
        name: "Manuel Gonzales Pereira",
        date: "28-11-2024",
        status: "Éxitoso",
        amount: "$30.000",
    },
    {
        operation: "Transferencia enviada",
        name: "Gino Hours",
        date: "28-11-2024",
        status: "Pendiente",
        amount: "$42.000",
    },
    {
        operation: "Consumo",
        name: "Mercadopetit Buenos Aires",
        date: "27-11-2024",
        status: "Éxitoso",
        amount: "$5.995",
    },
    {
        operation: "Transferencia enviada",
        name: "Nicolas Hours",
        date: "27-11-2024",
        status: "Pendiente",
        amount: "$42.000",
    },
    {
        operation: "Consumo",
        name: "BonApetit S.A",
        date: "25-11-2024",
        status: "Éxitoso",
        amount: "$8.995",
    },
    {
        operation: "Transferencia enviada",
        name: "Julian Nahuel Arias",
        date: "25-11-2024",
        status: "Éxitoso",
        amount: "$1.503,35",
    },
];

const Home: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredTransactions, setFilteredTransactions] =
        useState<Transaction[]>(transactionsData);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const filtered = transactionsData.filter(
            (transaction) =>
                transaction.name.toLowerCase().includes(term.toLowerCase()) ||
                transaction.operation.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredTransactions(filtered);
    };

    const handleSort = (sortBy: string) => {
        if (sortBy === "") {
            setFilteredTransactions(transactionsData);
            return;
        }

        const sortedTransactions = [...filteredTransactions];
        if (sortBy === "Nombre") {
            sortedTransactions.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "Fecha") {
            sortedTransactions.sort((a, b) => {
                const [dayA, monthA, yearA] = a.date.split("-").map(Number);
                const [dayB, monthB, yearB] = b.date.split("-").map(Number);
                return (
                    new Date(yearA, monthA - 1, dayA).getTime() -
                    new Date(yearB, monthB - 1, dayB).getTime()
                );
            });
        }
        setFilteredTransactions(sortedTransactions);
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <SEO
                title="HOME | BANKI"
                description="Bienvenido a la página de inicio de nuestro sitio web. Aquí podrás encontrar información importante."
                keywords={["inicio", "bienvenida", "sitio web"]}
                image="../assets/BANKIico.png"
                url="https://localhost:5173/home"
                type="website"
            />
            <BackgroundComponent>
                <div
                    className="bg-white p-4 rounded shadow"
                    style={{
                        width: isMobile ? "100%" : "90%",
                        maxWidth: isMobile ? "100vw" : "80vw",
                        height: isMobile ? "80vh" : "100vh",
                        margin: isMobile ? "0 auto" : "0",
                        position: "relative",
                        zIndex: 1,
                        marginTop: isMobile ? "20vh" : "0",
                        display: isMobile ? "grid" : "block",
                        gridTemplateRows: isMobile ? "auto auto 1fr" : "none",
                        gap: isMobile ? "1rem" : "0",
                        overflowX: "hidden",
                        boxSizing: "border-box",
                    }}
                >
                    <div className="py-4">
                        <div className="row g-4">
                            {/* Header */}
                            <div className="col-12">
                                <h1 className="fs-3 fw-bold">
                                    Movimientos de tu cuenta para el mes de
                                    Noviembre del 2024
                                </h1>
                            </div>

                            {/* Tarjetas superiores */}
                            <div className="col-md-6 col-lg-4 gap-4">
                                <div className="pb-4">
                                    <AvailableBalanceCard />
                                </div>
                                <div className="bg-success text-white p-3 rounded-3 opacity-50">
                                    <h2 className="fs-5 fw-bold">
                                        Opción de financiamiento
                                    </h2>
                                    <p className="fs-2 text-center">$0</p>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <ExpenseStatisticsCard />
                            </div>

                            {/* Filtro */}
                            <div className="col-12">
                                <SearchFilter
                                    onSearch={handleSearch}
                                    onSort={handleSort}
                                />
                            </div>

                            {/* Tabla de transacciones */}
                            <div className="col-12">
                                <TransactionsTable
                                    transactions={filteredTransactions}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </BackgroundComponent>
        </>
    );
};

export default Home;
