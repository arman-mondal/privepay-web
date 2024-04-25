import { Edit, Eye, ViewIcon, X } from 'lucide-react';
import React, { useState } from 'react';

const ViewModal = ({ data}:{data:any}) => {
  const [formData, setFormData] = useState(data);
const [isOpen,setIsOpen]=useState(false)
 
const { name, category, mainImage, description, address, openingHours, phone, upi, offers, reviews, gallery ,balance} = data;

  return (
    <>
      <button onClick={()=>{
        setIsOpen(!isOpen)
      }} >
              <ViewIcon/>
             </button>
             {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
          <div className='w-full absolute  h-[100vh] z-10 flex justify-center items-center '>
   <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
    <button onClick={()=>{
      setIsOpen(false)
    }} className='w-8 absolute left-[57%] z-20 h-8 rounded-full bg-white  mt-5' >
      <X size={30} />
    </button>
      <img className="w-full h-64 object-cover" src={mainImage} alt={name} />
      <div className="p-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-700 text-lg font-bold">{name}</p>
          {offers && <p className="bg-yellow-500 text-white py-1 px-2 rounded">{offers} off</p>}
          {offers && <p className="bg-green-500 text-white py-1 px-2 rounded">₹ {(balance).toFixed(2)}</p>}

        </div>
        <p className="text-gray-500 text-sm">{category}</p>
        
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <p className="text-gray-600 text-sm mt-2">{address}</p>
        <p className="text-gray-600 text-sm mt-2">Phone: {phone}</p>
        <p className="text-gray-600 text-sm mt-2">UPI: {upi.join(', ')}</p>
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Opening Hours:</p>
          <p className="text-gray-600">
            {new Date(openingHours.from).toLocaleTimeString()} - {new Date(openingHours.to).toLocaleTimeString()}
          </p>
        </div>
            
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Reviews:</p>
          {reviews.map((review:any, index:any) => (
            <div key={index} className="flex items-center mt-2">
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-yellow-500 ml-2">{review.stars} stars</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Gallery:</p>
          <div className="flex mt-2">
            {gallery.map((item:any, index:any) => (
              <img key={index} className="w-16 h-16 object-cover rounded-full" src={item.image} alt={`Gallery ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
