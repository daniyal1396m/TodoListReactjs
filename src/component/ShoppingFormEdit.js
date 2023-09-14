import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const ShoppingFormEdit = ({editShopping, shopping}) => {
    const [value, setValue] = useState(shopping.title);
    const hasndleSubmit = e => {
        e.preventDefault();
        EditShoppings(value, shopping.id)
        setValue("")
    }
    const EditShoppings = async (shopping , id) => {
        try {
            const response = await axios.patch('http://127.0.0.1:8000/api/tasks/'+id, {title: shopping});
            toast.success("Task Updated")
        } catch (error) {
            toast.error("Task Not Updated")
        }
    }
    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={hasndleSubmit}>
            <input type="text"
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   required autoComplete='false' value={value} placeholder="Update enter what do you want  you need"
                   onChange={(e) => setValue(e.target.value)}/>
            <button type="submit"
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Update
            </button>
        </form>
    )
}