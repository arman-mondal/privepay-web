import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import WithdrawTable from '../components/Tables/WithdrawTable';
import useFetchFirestoreData from '../hooks/transactions';
import DefaultLayout from '../layout/DefaultLayout';

const Withdraw = () => {
  const {withdraws} =useFetchFirestoreData();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Withdraws" />

      <div className="flex flex-col gap-10">
        <WithdrawTable transactions={withdraws} />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Withdraw;
