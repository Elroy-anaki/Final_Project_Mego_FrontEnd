import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext } from 'react';
import axios from 'axios'
import { TableContext } from '../../../context/TableContext';
import { FullOrderContext } from '../../../context/FullOrderContext';
import { notifyError, notifySuccess } from '../../../lib/Toasts';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const {table, setTable} = useContext(TableContext)
    const {fullOrder} = useContext(FullOrderContext)
    const navigate = useNavigate()

      const { mutate: addOrder } = useMutation({
        mutationKey: ['createOrder'],
        mutationFn: async (order) => await axios.post(`/orders/add-order/${table._id}`, order),
        onSuccess: (data) => {
          notifySuccess("Thank you for choosing to eat at my place. See you later!")
          
        },
        onError: (error) => notifyError(error.response.data.msg)
      })
    
    

    const createOrder = async (data) => {
        console.log(table)
        const response = await axios({
          url: "/orders/payment/create-order",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data:JSON.stringify({table:table})
        });
        return response.data.orderId;
      };
    
      const onApprove = async (data) => {
      const response = await axios({
          url: "/orders/payment/complete-order",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ orderId: data.orderID }),
        });
        console.log(response)
        if(response.status === 200){
            addOrder(fullOrder)
            navigate('/home')
            setTable(null);
            

        } else{
            notifyError("Order failed for some reason!")
        }
        return response.data;
      };

  return (
    <div className="w-full mx-auto bg-white space-y-28 mt-10">
        <h2 onClick={() => console.log(table)} className='text-3xl text-black text-center'>Payment Page</h2>
      <div className="w-1/2 mx-auto">
      {table && <PayPalButtons 
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        />}
      </div>
    </div>
  );
}

export default Payment;
