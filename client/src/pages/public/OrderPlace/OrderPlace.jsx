import React, { useContext, useState } from 'react'
import Select from './Select'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { OrderDetailsContext } from '../../../Contexts/OrderDetailsContext';
import { useNavigate } from 'react-router-dom';

function OrderPlace() {
    const {setOrderDetails} = useContext(OrderDetailsContext)
    const navigate = useNavigate()
    const [values, setValues] = useState(null)
    const [remainingSeats, setRemainingSeats] = useState(null)
    const [showTime, setShowTime] = useState(false)
    const [showPeople, setShowPeople] = useState(false)

    async function handleChange(e) {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setValues((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const { mutate: getRemainingSeats } = useMutation({
        mutationKey: ['getRemainingSeats'],
        mutationFn: async (data) => await axios.post(`/restaurant/get-remaining-seats`, data),
        onSuccess: (data) => {
            alert(data.data.data[0].remaining)
            const numberOfEaters = []
            for(let i = 1; i <= data.data.data[0].remaining; i++)numberOfEaters.push(i)
            console.log(numberOfEaters);
            setRemainingSeats(numberOfEaters)
            console.log(data)}
    })

    // const 
    return (
        <div
            className='bg-gradient-to-br from-gray-800 to-gray-700 pb-48 '>
            <h2 className='text-center text-3xl font-bold text-amber-500 py-4'>
                Welcome to Our Restaurant!
            </h2>
            <div
                className='relative shadow-2xl rounded-xl h-56 py-2 w-4/5 mx-auto my-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'
            >
                <div
                    className='flex justify-center items-center gap-14 px-6 mt-6'
                >
                    
                    <div className='w-1/4 rounded-xl border-2 border-amber-500 bg-gray-800 px-4 py-3 shadow-inner space-y-3'>
                    <p className='text-lg'>Date</p>

                        <input
                            className="bg-gray-600 text-white w-full h-12 rounded-xl"
                            // min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => {
                                handleChange(e)
                                setShowTime(true)
                            }}
                            // onBlur={() => setShowTime(true)}

                            type="date" name="date" id="date" />
                    </div>
                    {showTime && <div className='w-1/4 rounded-xl  border-2 border-amber-500 bg-gray-800 px-4 py-3 shadow-inner space-y-3'>
                        <p className='text-lg'>Time</p>
                        <select
                            className="bg-gray-600 text-white w-full h-12 rounded-xl"
                            onChange={(e) => {
                                handleChange(e)
                                getRemainingSeats(values)
                                setShowPeople(true)
                            }}
                            name="time"
                            id="time">
                            <option value="16:00-17:00">16:00-17:00</option>
                            <option value="17:00-18:00">17:00-18:00</option>
                            <option value="18:00-19:00">18:00-19:00</option>
                            <option value="19:00-20:00">19:00-20:00</option>
                            <option value="20:00-21:00">20:00-21:00</option>
                            <option value="21:00-22:00">21:00-22:00</option>
                            <option value="22:00-23:00">22:00-23:00</option>
                            <option value="23:00-00:00">23:00-00:00</option>
                        </select>
                    </div> }
                    {showPeople && <div className='w-1/4 rounded-xl border-2 border-amber-500 rounded-l-lg bg-gray-800 px-4 py-3 shadow-inner space-y-3'>
                        <p className='text-lg'>People</p>

                        <select
                             className="bg-gray-600 text-white w-full h-12 rounded-xl"
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            name="people"
                            id="people">
                            {remainingSeats && remainingSeats?.map((number) => (<option value={number}>{number} People</option>))}
                        </select>
                    </div> }
                    <button
                        onClick={() => { 
                            setShowTime(false)
                            setShowPeople(false)
                            setRemainingSeats(null)

                         }}
                        className='absolute bottom-2 left-2 w-28 px-6 py-2 rounded-2xl bg-gradient-to-r from-rose-700 to-rose-600 text-black text-lg font-bold hover:from-rose-600 hover:to-rose-500 shadow-xl   hover:bottom-3 right-6 transition-all transform hover:scale-105'
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => { 
                            setOrderDetails(values)
                            navigate('/menu')

                         }}
                        className='absolute bottom-2 right-2 px-6 py-2 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-black text-lg font-bold hover:from-green-500 hover:to-green-400 shadow-xl hover:bottom-3 transition-all transform hover:scale-105'
                    >
                        Save and Continue
                    </button>
                    
                    
                </div>
            </div>
        </div>

    );


}

export default OrderPlace
