import React, { useState, useEffect } from "react";
import BackgroundComponent from "../../components/BackgroundComponent";
import { SEO } from "../../components/SEO/SEO";
import AvailableBalanceCard from "../../components/CardsHome/AvailableBalanceCard";

const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

const Home: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
    const month = new Date().getMonth();
    const monthName = monthNames[month];
    const year = new Date().getFullYear();

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
                    <div>
                        <img
                            src="\src\assets\BANKI-NEGRO 2.svg"
                            alt="Logo"
                            width={150}
                        />
                    </div>
                    <div className="py-4">
                        <div className="row g-4">
                            {/* Header */}
                            <div className="col-12">
                                <h1 className="fs-3 fw-bold">
                                    Movimientos de tu cuenta para el mes de{" "}
                                    {monthName} del {year}
                                </h1>
                            </div>

                            {/* Tarjetas superiores */}
                            <div className="col-md-6 col-lg-4 gap-4">
                                <div className="pb-4">
                                    <AvailableBalanceCard accountNumber={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BackgroundComponent>
        </>
    );
};

export default Home;
