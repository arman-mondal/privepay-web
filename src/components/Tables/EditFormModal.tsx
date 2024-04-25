import { Edit } from 'lucide-react';
import React, { useState } from 'react';

const EditFormModal = ({ data}:{data:any}) => {
  const [formData, setFormData] = useState(data);
const [isOpen,setIsOpen]=useState(false)
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission, e.g., update data in the database
    console.log(formData);
    // Close modal
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={()=>{
        setIsOpen(!isOpen)
      }} >
              <Edit/>
             </button>
             {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border-2 border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category:</label>
                  <select  id="category" name="category" value={formData.category} onChange={handleChange} className="border-2 border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" >
                   <option value={'Cafes'}>Cafes</option>
                   <option value={'Restaurants'}>Restaurants</option>
                   <option value={'Events'}>Events</option>


                    </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                  <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border-2 border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="border-2 border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                </div>
                {/* Add more fields as needed */}
                <div className="flex justify-end">
                  <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                  <button onClick={() => setIsOpen(false)} className="bg-secondary hover:bg-gray-600 text-white font-bold py-2 px-4 ml-2 rounded">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFormModal;
