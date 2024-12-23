// Import Hooks +  Network utils
import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Context + Utils
import { OrderDetailsContext } from '../../../Contexts/OrderDetailsContext';
import { hours } from '../../../helpers/restaurant';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';



const formatDateToLocal = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];
};

const initValues = {
    date: "",
    time: "",
    people: ""
}

function OrderPlace() {
    // Context + Utils
    const { setOrderDetails, orderDetails } = useContext(OrderDetailsContext)
    const navigate = useNavigate()
    // Local Hooks
    const [values, setValues] = useState(orderDetails ? orderDetails : initValues)
    const [remainingSeats, setRemainingSeats] = useState(null)
    const [showTime, setShowTime] = useState(orderDetails ? true : false)
    const [showPeople, setShowPeople] = useState(orderDetails ? true : false)
    // const [date, setDate] = useState(new Date());


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
            const numberOfEaters = []
            for (let i = 1; i <= data.data.data[0].remaining; i++)numberOfEaters.push(i)
            console.log(numberOfEaters);
            setRemainingSeats(numberOfEaters)
            console.log(data)
        }
    })

    useEffect(() => {
        if (!values?.time) return;
        getRemainingSeats(values)
    }, [values?.time])

    return (
        <div
            className='bg-gradient-to-br from-gray-800 to-gray-700 pb-48 '>
            <h2 className='text-center text-3xl font-bold text-amber-500 py-4'>
                Welcome to Our Restaurant!
            </h2>
            {/* <Calendar
                onChange={(newDate) => {
                console.log(formatDateToLocal(newDate));
                // handleChange()
                // setShowTime(true)
                
                
                }}
                value={date}
                className="rounded-lg shadow-md border border-gray-300 p-4 bg-gray-600 text-white w-1/2 text-center py-10" // מחלקות Tailwind מותאמות

            /> */}
            <div
                className='relative shadow-2xl rounded-xl h-56 py-2 w-4/5 mx-auto my-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'
            >
                <div
                    className='flex justify-center items-center gap-14 px-6 mt-6'
                >

                    <div className='w-1/4 rounded-xl border-2 border-amber-500 bg-gray-800 px-4 py-3 shadow-inner space-y-3'>
                        <p className='text-lg'>Date</p>

                        <input
                            value={values?.date}
                            className="bg-gray-600 text-white w-full h-12 rounded-xl"
                            // min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => {
                                handleChange(e)
                                setShowTime(true)
                            }}

                            type="date" name="date" id="date" />
                    </div>
                    {showTime && <div className='w-1/4 rounded-xl  border-2 border-amber-500 bg-gray-800 px-4 py-3 shadow-inner space-y-3'>
                        <p className='text-lg'>Time</p>
                        <select
                            value={values?.time}
                            className="bg-gray-600 text-white w-full h-12 rounded-xl"
                            onChange={(e) => {
                                handleChange(e)
                                setShowPeople(true)
                            }}
                            name="time"
                            id="time">
                            {hours.map((hour) => (<option value={hour}>{hour}</option>))}
                        </select>
                    </div>}
                    {showPeople && <div className='w-1/4 rounded-xl border-2 border-amber-500 rounded-l-lg bg-gray-800 px-4 py-3 shadow-inner space-y-3'>
                        <p className='text-lg'>People <span className='text-rose-600 ml-4 text-sm'>Max: {remainingSeats ? remainingSeats.length : null}</span></p>

                        <select
                            value={values?.people}

                            className="bg-gray-600 text-white w-full h-12 rounded-xl"
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            name="people"
                            id="people">
                            {remainingSeats && remainingSeats?.map((number) => (<option value={number}>{number} People</option>))}
                        </select>
                    </div>}
                    <button
                        onClick={() => {
                            setShowTime(false)
                            setShowPeople(false)
                            setRemainingSeats(null)
                            setOrderDetails(null)


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
