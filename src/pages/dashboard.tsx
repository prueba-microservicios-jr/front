import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/layout/Layout";
import axiosInstance from "../utils/AxiosInstance";

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext)!;

  const [ totalPokemons, setTotalPokemons ] = useState<number>(0);

  const getTotalPokemons = async () => {
    const data = await axiosInstance.get(`pokemons/total`);
    
    if(data.status === 200){
      setTotalPokemons(data.data.total);
    }else{
      console.log("Ocurrio un error");
    }
  }
  
  useEffect(() => {
    getTotalPokemons();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-900">Dashboard {user?.username}</h1>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total pokemons</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{totalPokemons}</dd>
                  </dl>
                </div>
              </div>
            </div>
            
          </div>

          {/* Repeat similar card structures for other metrics */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;