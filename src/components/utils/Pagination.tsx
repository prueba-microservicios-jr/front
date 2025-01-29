import React, { useState, useEffect } from 'react';

// Definimos los tipos para los props
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	totalPages,
	currentPage,
	onPageChange,
}) => {


	const [pageRange, setPageRange] = useState<number[]>([1, 2, 3]);


	useEffect(() => {
		const newPageRange = calculatePageRange(currentPage, totalPages);
		setPageRange(newPageRange);
	}, [currentPage, totalPages]);

	
	const calculatePageRange = (currentPage: number, totalPages: number): number[] => {
		
		let start = Math.max(1, currentPage - 1);
		let end = Math.min(totalPages, currentPage + 1);

		if (end - start < 2) {
		if (currentPage === 1) {
			end = Math.min(totalPages, 3);
		} else if (currentPage === totalPages) {
			start = Math.max(1, totalPages - 2);
		}
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	// Función para manejar el cambio de página
	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > totalPages) return;
		onPageChange(newPage);
	};

	return (
		<div className="flex justify-center items-center space-x-2">
		
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
			>
				Anterior
			</button>

			{currentPage >= 3 && (
				<a
					onClick={() => handlePageChange(1)}
				>
					1
				</a>
			)}

			{currentPage >= 3 && (
				<span>
					...
				</span>
			)}
			
		
			{pageRange.map((page) => (
				<a
					key={page}
					onClick={() => handlePageChange(page)}
					className={`px-4 py-2 ${
						currentPage === page ? 'text-blue-500' : ''
					}`}
				>
					{page}
				</a>
			))}


			{currentPage < totalPages - 2 && (
				<span>
					...
				</span>
			)}

			{currentPage < totalPages - 2 && (
				<a
					onClick={() => handlePageChange(totalPages)}
				>
					{totalPages}
				</a>
			)}

			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
			>
				Siguiente
			</button>
		</div>
	);
};

export default Pagination;