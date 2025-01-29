import type React from "react"
import { Link } from "react-router-dom"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <>
            <div
                className={`fixed inset-0 bg-blue-400 bg-opacity-75 z-20 transition-opacity duration-300 ease-linear ${
                sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <div
                className={`fixed inset-y-0 left-0 w-64 bg-blue-800 overflow-y-auto transition duration-300 ease-in-out transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:static lg:inset-0 z-30`}
            >
                <div className="flex items-center justify-center mt-8">
                <div className="flex items-center">
                    <span className="text-white text-2xl mx-2 font-semibold">PokemonsCenter</span>
                </div>
                </div>

                <nav className="mt-10">
                <Link
                    className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-100 hover:bg-opacity-25 hover:text-blue-800 hover:font-bold"
                    to="/dashboard"
                >
                    
                    <span className="mx-3">Dashboard</span>
                </Link>

                <Link
                    className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-100 hover:bg-opacity-25 hover:text-blue-800 hover:font-bold"
                    to="/trainners"
                >
                    
                    <span className="mx-3">Entrenadores</span>
                </Link>

                <Link
                    className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-100 hover:bg-opacity-25 hover:text-blue-800 hover:font-bold"
                    to="/pokemons"
                >
                   
                    <span className="mx-3">Pokemons</span>
                </Link>

                
                </nav>
            </div>
        </>
    )
}

export default Sidebar

