import React, { useContext, useEffect, useState } from 'react'
import { TableContext } from '../../../contexts/TableContext'
import MealTableDrawer from '../../../modals/TableDrawer/MealTableDrawer'
import { AuthContext } from '../../../contexts/AuthContext'
import { hours } from '../../../helpers/restaurant'
import { OrderDetailsContext } from '../../../contexts/OrderDetailsContext'
import { Formik } from 'formik'
import { FullOrderContext } from '../../../contexts/FullOrderContext'
import { notifyError, notifySuccess } from '../../../lib/Toasts'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

function Checkout() {
  const navigate = useNavigate()

  const { fullOrder, setFullOrder, setValuesByOrderSchema } = useContext(FullOrderContext)

  const { table, tableMeals } = useContext(TableContext)
  const { user } = useContext(AuthContext)
  const { orderDetails, remainingSeats, setRemainingSeats, getRemainingSeats } = useContext(OrderDetailsContext)

  const [initValues, setInitValues] = useState(null)

  const {mutate: createOrder} = useMutation({
    mutationKey:['createOrder'],
    mutationFn: async (order) => await axios.post('/orders/add-order', order),
    onSuccess:(data) => notifySuccess(data.data.msg),
    onError:(error) => notifyError(error.response.data.msg)
  })




  useEffect(() => {
    setInitValues({
      userName: user?.userName || "",
      userEmail: user?.userEmail || "",
      numberOfGuests: orderDetails?.people || 85,
      time: orderDetails?.time || "17:00-18:00",
      date: orderDetails?.date || "12/19/2024",
      specialRequests: ""
    })
    console.log(user)
  }, [user])
  useEffect(() => console.log(initValues, [initValues]))
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[480px] sm:min-w-[300px]">
          <div className="relative h-full">
            <div className="px-4 py-2 sm:overflow-auto sm:h-[calc(100vh-0px)]">
              <div className="space-y-5">
                <div className="  w-full mt-5 ">
                  <h4 className="flex flex-wrap gap-4  text-white text-3xl">Total Price: <span className="ml-auto">{table?.totalPrice}$</span></h4>
                </div>

                <ul className="flex flex-col">
                  {table?.meals?.map((meal) => (
                    <MealTableDrawer key={meal.meal._id} meal={meal} edited={false} />
                  ))}
                </ul>

              </div>

            </div>


          </div>
        </div>


        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0 ">

          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          { }
          <Formik
            initialValues={initValues}
            enableReinitialize
            onSubmit={async (values, actions) => {
              
              await getRemainingSeats({date: values.date, time: values.time })
              if(remainingSeats.length === 0) {
                return notifyError("The restaurant is Full!!!!!")
                
              } else {
                const order = setValuesByOrderSchema(values)
                console.log(order)
                createOrder(order)
                navigate('/home')
              }
              

            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                className="mt-8">
                <div>
                  <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input 
                      type="text" 
                      name="userName"
                      placeholder="Full Name"
                        value={values?.userName}
                        onChange={handleChange}
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                    </div>


                    <div>
                      <input 
                      type="email"
                      name="userEmail"     
                       placeholder="Email"
                        value={values?.userEmail}
                        onChange={handleChange}
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                    </div>

                    
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-base text-gray-800 mb-4">Other Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input
                      type="date"
                       name="date"
                        id="date"
                        value={values?.date}
                        onChange={handleChange}
                        className="bg-gray-100 text-black w-full h-12 rounded-xl"
                        min={new Date().toISOString().split('T')[0]}
                         />
                    </div>
                    <div>

                      <select
                        value={values?.time}
                        className="bg-gray-100 text-gray-800 w-full h-12 rounded-xl"
                        onChange={async(e) => {
                          handleChange(e)
                          const data = await getRemainingSeats({date: values.date, time: e.target.value })
                          console.log(data.data.data[0].remaining)
                          if(data.data.data[0].remaining === 0) {notifyError("The restaurant is Full!!!!!")} 
                        }}
                        name="time"
                        id="time">
                        {hours.map((hour) => (<option value={hour}>{hour}</option>))}
                      </select>
                    </div>
                    <div>
                      <select
                        value={values?.numberOfGuests}
                        onChange={handleChange}

                        className="bg-gray-100 text-black w-full h-12 rounded-xl"

                        name="numberOfGuests"
                        id="numberOfGuests">
                        {remainingSeats && remainingSeats?.map((number) => (<option value={number}>{number} People</option>))}
                      </select>
                    </div>

                  </div>

                  <div className="flex gap-4 max-md:flex-col mt-8">
                    <button type="button" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1">Cancel</button>
                    <button type="submit" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white">Complete Purchase</button>
                  </div>
                </div>
              </form>)}
          </Formik>


        </div>
      </div>
    </div>
  )
}

export default Checkout
