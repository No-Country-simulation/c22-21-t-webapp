import BackgroundComponent from "../../components/BackgroundComponent";

const NotFound = () => {
    return (
        <BackgroundComponent>
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-center">
                <div>
                    <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                    <h2 className="text-2xl text-white mb-2">
                        Página no encontrada
                    </h2>
                    <p className="text-white mb-6 max-w-md mx-auto">
                        Lo sentimos, la página que buscas no existe. Verifica la URL o vuelve al inicio.
                    </p>
                    <a
                        href="/"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        </BackgroundComponent>
    );
};

export default NotFound;
