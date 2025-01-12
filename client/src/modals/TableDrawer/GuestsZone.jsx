import React, { useContext, useState } from 'react'
import { TableContext } from '../../contexts/TableContext';
import AddButton from '../../pages/public/Menu/Meals/AddButton';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../lib/Toasts';

function GuestsZone({setToggle, toggle}) {
    const { table } = useContext(TableContext);
    const [guests, setGuests] = useState(table ? table?.sharedWith : []);

    const MAX_GUESTS = 4;
    const handleAddGuest = () => {
        if (guests.length < MAX_GUESTS) {
          setGuests([...guests, { guestEmail: "", rated: false }]); 
        }
      };
    
      const handleGuestChange = (index, value) => {
        const updatedGuests = [...guests];
        updatedGuests[index].guestEmail = value;
        setGuests(updatedGuests);
      };

      const handelDeleteGuest = (index) => {
        const updatedGuests = guests.filter((_, i) => i !== index); 
        setGuests(updatedGuests); 
      };

      const { mutate: addGuests} = useMutation({
        mutationKey: ['addGuests'],
        mutationFn: async (guests) => axios.put(`/tables/add-guests/${table._id}`, guests),
        onSuccess: (data) => notifySuccess(data.data.msg),
        onError: (error) => notifyError(error.response.data.msg)
      })
    
      const handleSubmitGuests = () => {
        addGuests(guests);
        setToggle(!toggle)

      };


    return (
        <div className='flex flex-col gap-2 mb-2'>
                {guests?.map((guest, index) => (
                    <div className='flex justify-between w-full'>
                  <input
                    key={index}
                    type="email"
                    value={guest.guestEmail}
                    onChange={(e) => handleGuestChange(index, e.target.value)}
                    className={`bg-gray-200 py-2 px-3 text-black rounded-lg ${index !== 0 ?'w-5/6' : 'w-full'} `}
                    placeholder="Enter guest email"
                  />
                {index !== 0 && <AddButton text={"-"} className='bg-red-500 text-lg w-8 px-1 py-1' fun={() => handelDeleteGuest(index)} />}
                </div>
                ))}
                
                <AddButton text={"+"} className='bg-green-500 text-lg w-8 px-1 py-1 cursor-pointer' fun={handleAddGuest}  disabled={guests.length >= MAX_GUESTS}/>
                {guests.length >= MAX_GUESTS && (
                  <p className="text-red-500">You can only add up to {MAX_GUESTS} guests.</p>
                )}

                <AddButton text={"Save"} className='bg-blue-500 text-lg px-3 py-2' fun={handleSubmitGuests} disabled={guests.length >= MAX_GUESTS} />
                
                  
              </div>
    )
}

export default GuestsZone
