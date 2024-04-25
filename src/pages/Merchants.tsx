import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import MerchantsTable from '../components/Tables/MerchantsTable';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import UsersTable from '../components/Tables/UsersTable';
import useFetchFirestoreData from '../hooks/transactions';
import DefaultLayout from '../layout/DefaultLayout';

const Merchants = () => {
  const {loading,merchants} =useFetchFirestoreData();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Merchants" />

      <div className="flex flex-col gap-10">
        <MerchantsTable transactions={merchants} />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Merchants;
