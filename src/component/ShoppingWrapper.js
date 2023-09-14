import React, {useState, useEffect} from 'react';
import {ShoppingForm} from "./ShoppingForm";
import {v4 as uuidv4} from "uuid";
import {Shopping} from "./Shopping";
import {ShoppingFormEdit} from "./ShoppingFormEdit";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

uuidv4();
export const ShoppingWrapper = () => {
    const [shoppings, setShoppings] = useState([]);
    const addShopping = shopping => {
        setShoppings([...shoppings, {
            id: shopping.id,
            buy: shopping.title,
            completed: shopping.completed,
            isEditing: false
        }])
    }
    const toggleComplete = async (id) => {
        setShoppings(shoppings.map(shopping => shopping.id === id ? {
            ...shopping,
            completed: !shopping.completed
        } : shopping))
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/tasks/done/' + id);
            window.location.reload()
            toast.success("Task Compeleted")
        } catch (error) {
            toast.error("Task Not Compeleted")
        }
    }
    const deleteShopping = async (id) => {
        try {
            const response = await axios.delete('http://127.0.0.1:8000/api/tasks/' + id);
            setShoppings(shoppings.filter(shopping => shopping.id !== id));
            toast.success("Task Deleted")
        } catch (error) {
            toast.error("Task Not Deleted")
        }
    }
    const editShopping = id => {
        setShoppings(shoppings.map(shopping => shopping.id === id ? {
            ...shopping,
            isEditing: !shopping.isEditing
        } : shopping))
    }
    const editTask = (value, id) => {
        setShoppings(shoppings.map(shopping => shopping.id === id ? {
            ...shopping,
            value,
            isEditing: !shopping.isEditing
        } : shopping))
    }
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tasks');
            const data = response.data.data;
            const newTasks = data.map((value) => ({
                id: value.id,
                title: value.title,
                completed: value.isDone,
                isEditing: false,
            }));
            setShoppings([...shoppings, ...newTasks]);
        } catch (error) {
            toast.error("Task Not Found")
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);
    return (
        <div>
            <ShoppingForm addShopping={addShopping}/>
            {shoppings.map((value, index) => (
                value.isEditing ? (
                    <ShoppingFormEdit shopping={value} editShopping={editTask}/>
                ) : (
                    <Shopping task={value} key={index} toggleComplete={toggleComplete}
                              deleteShopping={deleteShopping}
                              editShopping={editShopping}/>
                )
            ))
            }

        </div>
    )
}