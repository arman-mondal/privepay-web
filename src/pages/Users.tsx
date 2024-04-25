import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import UsersTable from '../components/Tables/UsersTable';
import useFetchFirestoreData from '../hooks/transactions';
import DefaultLayout from '../layout/DefaultLayout';

const Users = () => {
  const {loading,users} =useFetchFirestoreData();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <UsersTable transactions={users} />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Users;
