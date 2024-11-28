import { useState, useEffect } from "react";
import BackgroundComponent from "../../components/BackgroundComponent";
import { SEO } from "../../components/SEO/SEO";

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
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
            {!isMobile ? (
                <div
                className="bg-white p-5 rounded shadow"
                style={{
                    width: "90%",
                    maxWidth: "80vw",
                    height: "100vh",
                }}
                >
                    <h1 className="text-end">Contenido Blanco</h1>
                    <p className="text-center">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, quam laborum laboriosam veniam omnis eaque in fugit aliquid, consequuntur temporibus nesciunt aspernatur voluptatum amet eius a maxime, optio impedit expedita?
                    </p>
                </div>
            ) : (
                <div
                    className="bg-white p-5 rounded shadow"
                    style={{
                        width: "100%",
                        maxWidth: "100vw",
                        height: "80vh",
                        position: "relative",
                        zIndex: 1, 
                        marginTop: "20vh", 
                    }}
                    >
                    <h1 className="text-end">Contenido Blanco</h1>
                    <p className="text-center">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, quam laborum laboriosam veniam omnis eaque in fugit aliquid, consequuntur temporibus nesciunt aspernatur voluptatum amet eius a maxime, optio impedit expedita?
                    </p>
                </div>
            )}
        </BackgroundComponent>
        </>
    );
};

export default Home;
