// import React from "react";

// const AvailableBalanceCard: React.FC = () => (
//     <div className="bg-success p-2 rounded-4" style={{width: "100%", height: "10rem" }}>
//         <h2 className="fs-4 bold text-start">Saldo disponible</h2>
//         <p className="fs-1 text-center text-light">$0</p>
//         <p className="fs-5 text-dark text-center">Caja ahorro en pesos</p>
//     </div>
// );

// export default AvailableBalanceCard;

import React from "react";

const AvailableBalanceCard: React.FC = () => (
    <div className="bg-success text-white p-3 rounded-3 h-100">
        <h2 className="fs-5 fw-bold">Saldo disponible</h2>
        <p className="fs-2 text-center">$13.506,65</p>
        <p className="fs-6 text-center">Caja ahorro en pesos</p>
    </div>
);

export default AvailableBalanceCard;
