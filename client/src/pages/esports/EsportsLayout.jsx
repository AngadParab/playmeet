import { Outlet } from 'react-router-dom';

const EsportsLayout = () => {
    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans">
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default EsportsLayout;
