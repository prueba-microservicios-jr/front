import type React from "react"
import { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import axiosInstance from "../utils/AxiosInstance"
import Pagination from "../components/utils/Pagination"
import { toast, ToastContainer } from "react-toastify"

interface Pokemon {
    
    id: number,
    name: string,
    level: number,
    trainer: string,
    status: boolean,
    type: string,
    createdAt: string,
    updatedAt: string
}

interface PokemonCreate {

    name: string,
    level: number,
    trainer: string,
    type: string,
}

interface PokemonUpdate {
    id: number,
    name: string,
    level: number,
    trainer: string,
    type: string,
}


const Pokemons: React.FC = () => {
    const [items, setItems] = useState<Pokemon[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentItem, setCurrentItem] = useState<Pokemon | null>(null)

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalPokemons, setTotalPokemons] = useState<number>(0);


    const openModal = (item: Pokemon | null = null) => {
        setCurrentItem(item)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setCurrentItem(null)
        setIsModalOpen(false)
    }

    const createPokemon = async (newPokemon: PokemonCreate) => {
        try {
            const res = await axiosInstance.post(`pokemons`, newPokemon);
        
            if(res.status === 201){
                toast("Se creo el pokemon correctamente");
                closeModal()
            }else{
                console.log("Ocurrio un error");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updatePokemon = async (updatePokemon: PokemonUpdate) => {
        try {
            const res = await axiosInstance.patch(`pokemons/${updatePokemon.id}`, updatePokemon);
        
            if(res.status === 200){
                const updatedItem = res.data;
                setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
                toast("Se actualizo el pokemon correctamente");
                closeModal();
            }else{
                console.log("Ocurrio un error");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        
        
        if (!currentItem) {
            const newPokemon: PokemonCreate = {
                name: formData.get("name") as string,
                type: formData.get("type") as string,
                trainer: formData.get("trainer") as string,
                level: Number(formData.get("level") as string),
            }

            createPokemon(newPokemon);
        } else {
            const upPokemon: PokemonUpdate = {
                id: currentItem.id,
                name: formData.get("name") as string,
                type: formData.get("type") as string,
                trainer: formData.get("trainer") as string,
                level: Number(formData.get("level") as string),
            }
            
            updatePokemon(upPokemon);
        }
        
    }

    const deleteItem = async (id: number) => {

        try {
            const res = await axiosInstance.delete(`pokemons/${id}`);
        
            if(res.status === 200){
                setItems(items.filter((item) => item.id !== id));
                toast("Se elimino el pokemon correctamente");
            }else{
                console.log("Ocurrio un error");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        getAllPokemons(page);
    }

    const getAllPokemons = async (page: number) => {
        try {
            const res = await axiosInstance.get(`pokemons`, { params: { page } });
        
            if(res.status === 200){
                setItems(res.data.data);
                setTotalPages(res.data.pages_total);
                setTotalPokemons(res.data.total_pokemons);
            }else{
                console.log("Ocurrio un error");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const migratePokemons = async () => {
        try {
            const res = await axiosInstance.get(`pokemons/execute/migrate`, { });
        
            if(res.status === 200){
                getAllPokemons(1);
            }else{
                console.log("Ocurrio un error");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteAllPokemons = async () => {
        try {
            const res = await axiosInstance.delete(`pokemons/delete/all`, { });
        
            if(res.status === 200){
                getAllPokemons(1);
            }else{
                console.log("Ocurrio un error");
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllPokemons(1);
    }, []);

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-900">Pokemons Lists</h1>
                    <div className="flex flex-row ">
                        <button
                            onClick={() => openModal()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center text-sm"
                        >
                        
                            Agregar Pokemon
                        </button>

                        
                        <button
                            onClick={() => migratePokemons()}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2 text-sm"
                        >
                        
                            Migrar Pokemons (API)
                        </button>
                        <button
                            onClick={() => deleteAllPokemons()}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2 text-sm"
                        >
                        
                            Eliminar todos 
                        </button>
                    </div>
                    
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Entrenador
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex flex-col">
                                        <p className="text-gray-900 whitespace-no-wrap text-base">{item.name}</p>
                                        <div className="flex items-center mt-0.5 text-xs">
                                            <span className="font-bold">Nivel:</span>
                                            <span className="">{item.level}</span>
                                        </div>
                                        
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap text-base">{item.type}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap text-base">{item.trainer}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button onClick={() => openModal(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                                            Editar
                                        </button>
                                        <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:text-red-900">
                                            Eliminar                     
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-4 flex flex-row justify-between">
                    <span className="text-sm font-semibold">Total: {totalPokemons}</span>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
                

                {isModalOpen && (
                    <div className="fixed inset-0 bg-modal overflow-y-auto h-full w-full" id="my-modal">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {currentItem ? "Editar pokemon" : "Agregar nuevo pokemon"}
                                </h3>
                                <form className="mt-2 text-left" onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            defaultValue={currentItem?.name}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
                                            Tipo
                                        </label>
                                        <input
                                            id="type"
                                            name="type"
                                            defaultValue={currentItem?.type}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="trainer" className="block text-gray-700 text-sm font-bold mb-2">
                                            Entrenador
                                        </label>
                                        <input
                                            id="trainer"
                                            name="trainer"
                                            defaultValue={currentItem?.trainer}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="level" className="block text-gray-700 text-sm font-bold mb-2">
                                            Nivel
                                        </label>
                                        <input
                                            id="level"
                                            name="level"
                                            type="number"
                                            defaultValue={currentItem?.level}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-row justify-end">
                                        <div className="flex flex-row justify-between">
                                            <button
                                                onClick={closeModal}
                                                className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            >
                                                Cancelar
                                            </button>

                                            <button
                                                type="submit"
                                                className="px-4 py-2 ml-2 bg-blue-500 text-white text-sm font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            >
                                                {currentItem ? "Actualizar" : "Agregar"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                           
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </Layout>
    
    )
}

export default Pokemons;