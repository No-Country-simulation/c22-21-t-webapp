import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import BackgroundComponent from "../../components/BackgroundComponent";
import { SEO } from "../../components/SEO/SEO";
import AvailableBalanceCard from "../../components/CardsHome/AvailableBalanceCard";
import ExpenseStatisticsCard from "../../components/CardsHome/ExpenceStatisticsCard";
import SearchFilter from "../../components/CardsHome/SearchFilter";
import TransactionsTable from "../../components/CardsHome/TransaccionsTable";
import { useAuthStore } from "../../components/store/authStore";
import { API_Url } from "../../components/types/authAPI";
import "./Home.css";

interface AccountData {
    balance: string;
}

interface Transaction {
    id: number;
    amount: string;
    type: string;
    status: string;
    description: string;
    fromAccount: string;
    toAccount: string;
    date: string;
    isDebit: boolean;
}

const Home: React.FC = () => {
    const [accountBalance, setAccountBalance] = useState<string>("0");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, token } = useAuthStore();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch(`${API_Url}/accounts/1000010/balance`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) throw new Error('Failed to fetch balance');
                
                const data = await response.json();
                setAccountBalance(data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${API_Url}/accounts/1000010/transactions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) throw new Error('Failed to fetch transactions');
                
                const { data } = await response.json();
                const transactionsArray = Array.isArray(data.transactions) ? data.transactions : [];
                setTransactions(transactionsArray);
                setFilteredTransactions(transactionsArray);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setTransactions([]);
                setFilteredTransactions([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBalance();
        fetchTransactions();
    }, [token]);

    const handleSearch = (term: string) => {
        const filtered = transactions.filter(
            (transaction) =>
                transaction.description.toLowerCase().includes(term.toLowerCase()) ||
                transaction.type.toLowerCase().includes(term.toLowerCase()) ||
                transaction.status.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredTransactions(filtered);
    };

    const handleSort = (sortBy: string) => {
        if (sortBy === "") {
            setFilteredTransactions(transactions);
            return;
        }

        const sortedTransactions = [...filteredTransactions];
        if (sortBy === "Descripción") {
            sortedTransactions.sort((a, b) => a.description.localeCompare(b.description));
        } else if (sortBy === "Fecha") {
            sortedTransactions.sort((a, b) => {
                if (a.date && b.date) {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                }
                return 0;
            });
        }
        setFilteredTransactions(sortedTransactions);
    };

    return (
        <>
            <SEO
                title="HOME | BANKI"
                description="Bienvenido a la página de inicio de nuestro sitio web."
                keywords={["inicio", "bienvenida", "sitio web"]}
                image="../assets/BANKIico.png"
                url="https://localhost:5173/home"
                type="website"
            />
            <BackgroundComponent>
                <div className="home-container">
                    <div className="profile-link">
                        <Link to="/profile" className="profile-icon">
                            <FaUser size={24} />
                        </Link>
                    </div>
                    
                    <div className="user-welcome">
                        <h1>Bienvenido/a, {user?.name}</h1>
                    </div>

                    <div className="dashboard-content">
                        <div className="balance-section">
                            <AvailableBalanceCard balance={accountBalance} />
                            <ExpenseStatisticsCard transactions={transactions} />
                        </div>

                        <div className="transactions-section">
                            <SearchFilter onSearch={handleSearch} onSort={handleSort} />
                            {isLoading ? (
                                <div className="loading">Cargando transacciones...</div>
                            ) : filteredTransactions.length > 0 ? (
                                <TransactionsTable transactions={filteredTransactions} />
                            ) : (
                                <div className="no-transactions">No hay transacciones disponibles</div>
                            )}
                        </div>
                    </div>
                </div>
            </BackgroundComponent>
        </>
    );
};

export default Home;
