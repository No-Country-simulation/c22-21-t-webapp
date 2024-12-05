import React, { useEffect, useState } from "react";

const AvailableBalanceCard: React.FC<{ accountNumber: number }> = ({ accountNumber }) => {
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch(`aquivaellinksegunmiser`);
                if (!response.ok) throw new Error("Error al obtener el balance.");
                const data = await response.json();
                setBalance(data.balance);
                console.log("Saldo obtenido:", data.balance);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBalance();
    }, [accountNumber]);

    return (
        <div className="bg-success text-white p-3 rounded-4 h-100">
            <h2 className="fs-5 fw-bold">Saldo disponible</h2>
            <p className="fs-2 text-center">{balance !== null ? `$${balance}` : "Cargando..."}</p>
            <p className="fs-6 text-center">Caja ahorro en pesos</p>
        </div>
    );
};

export default AvailableBalanceCard;
