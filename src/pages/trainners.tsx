import type React from "react"
import { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import axiosInstance from "../utils/AxiosInstance"
import Pagination from "../components/utils/Pagination"
import { toast, ToastContainer } from "react-toastify"

interface Trainners {
    
    id: number,
    name: string,
    city: string,
    age: number,
    createdAt: string,
    updatedAt: string
}

interface TrainnerCreate {

    name: string,
    city: string,
    age: number,
}

interface TrainnerUpdate {

    id: number,
    name: string,
    city: string,
    age: number,
}


const Trainners: React.FC = () => {
    const [items, setItems] = useState<Trainners[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentItem, setCurrentItem] = useState<Trainners | null>(null)

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalPokemons, setTotalPokemons] = useState<number>(0);


    const openModal = (item: Trainners | null = null) => {
        setCurrentItem(item)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setCurrentItem(null)
        setIsModalOpen(false)
    }

    const createTrainner = async (newTrainner: TrainnerCreate) => {
        try {
            const res = await axiosInstance.post(`trainners`, newTrainner);
        
            if(res.status === 201){
                toast("Se creo el trainner correctamente");
                closeModal()
            }else{
                console.log("Ocurrio un error");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updatedTrainner = async (updateTrainner: TrainnerUpdate) => {
        try {
            const res = await axiosInstance.patch(`trainners`, updateTrainner);
        
            if(res.status === 200){
                const updatedItem = res.data;
                setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
                toast("Se actualizo el trainner correctamente");
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
            const newPokemon: TrainnerCreate = {
                name: formData.get("name") as string,
                city: formData.get("city") as string,
                age: Number(formData.get("age") as string),
            }

            createTrainner(newPokemon);
        } else {
            const upPokemon: TrainnerUpdate = {
                id: currentItem.id,
                name: formData.get("name") as string,
                city: formData.get("city") as string,
                age: Number(formData.get("age") as string),
            }
            
            updatedTrainner(upPokemon);
        }
        
    }

    const deleteItem = async (id: number) => {

        try {
            const res = await axiosInstance.delete(`trainners/${id}`);
        
            if(res.status === 200){
                setItems(items.filter((item) => item.id !== id));
                toast("Se elimino el Trainner correctamente");
            }else{
                console.log("Ocurrio un error");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        getAllTrainners(page);
    }

    const getAllTrainners = async (page: number) => {
        try {
            const res = await axiosInstance.get(`trainners`, { params: { page } });
        
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

    useEffect(() => {
        getAllTrainners(1);
    }, []);

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-900">Trainners Lists</h1>
                    <div className="flex flex-row ">

                        <button
                            onClick={() => openModal()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center text-sm"
                        >
                        
                            Agregar Trainner
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
                                    Ciudad
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Edad
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
                                        
                                        
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap text-base">{item.city}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap text-base">{item.age}</p>
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
                                    {currentItem ? "Editar trainner" : "Agregar nuevo trainner"}
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
                                        <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                                            Ciudad
                                        </label>
                                        <input
                                            id="city"
                                            name="city"
                                            defaultValue={currentItem?.city}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
                                            edad
                                        </label>
                                        <input
                                            id="age"
                                            name="age"
                                            type="number"
                                            defaultValue={currentItem?.age}
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

export default Trainners;