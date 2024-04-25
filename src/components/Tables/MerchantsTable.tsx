import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { useEffect, useState } from 'react';
import { Props } from 'react-apexcharts';
import useFetchFirestoreData from '../../hooks/transactions';
import { ArrowLeft, ArrowRight, Cross, Edit, Eye, X } from 'lucide-react';
import EditFormModal from './EditFormModal';
import ViewModal from './ViewModal';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
];

const MerchantsTable = ({transactions}:{transactions:any}) => {
  const [data,setdata]=useState([]);
  const [selectedMerchant,setselectedMerchant]=useState<any>({})
  useEffect(()=>{
setdata(transactions)
  },[transactions])
  const downloadJsonFile = () => {
    // Your JSON data

    // Create a Blob from the JSON data
    const blob = new Blob([JSON.stringify(transactions[0])], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set the href attribute to the temporary URL
    link.href = url;

    // Set the download attribute to specify the filename
    link.download = 'data.json'; // You can specify any filename here

    // Programmatically click on the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up:
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  const {getUserName}=useFetchFirestoreData()
  function convertTimestampToDateTime(timestamp:any) {
    // Create a new Date object with the provided timestamp
    const date = new Date(timestamp);
  
    // Extract date and time components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Construct the date and time string
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return dateTimeString;
  }
  const [modal,setmodal]=useState(false);

  return (
    <>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">


      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              ID
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
        
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone
            </h5>
          </div>
          
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>
        
        {data.length>0 ? <>
          {data.map((item:any) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              item.id === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={item.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
         
              <p className="hidden text-black dark:text-white sm:block">
                {item.id}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.name===null ? 'Empty' : item.name}</p>
            </div>

         

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white"> +91 {item.phone===null ? 'Empty' : item.phone}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5 flex justify-center items-center">{item.active===true ? 
              <div className='w-4 h-4 bg-green-600  rounded-full' >

              </div>
            :
            <div className='w-4 h-4 bg-red-500 rounded-full' >

            </div>
            }</p>
            </div>
            <div className="hidden items-center justify-center gap-5 p-2.5 sm:flex xl:p-5">
            <EditFormModal data={item} />
             <ViewModal data={item}/>
            </div>
          </div>
        ))}
        </>
        :
         
        <>
        <div className='w-full h-max flex p-10 justify-center'>
          No Transactions Found
        </div>
        </>
  }
      
      </div>
    </div>
    </>
  );
};

export default MerchantsTable;
