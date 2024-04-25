import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import useFetchFirestoreData from '../hooks/transactions';
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
  const {loading,data} =useFetchFirestoreData();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Transactions" />

      <div className="flex flex-col gap-10">
        <TableOne transactions={data} />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Tables;
