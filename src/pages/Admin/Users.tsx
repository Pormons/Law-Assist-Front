import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../api/AdminApi";
import Show from "../../components/other/Show";
import ReactLoading from "react-loading";
import EditModal from "../../components/EditModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchAllUsers();
      setUsers(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="dark:bg-dark dark:text-white flex flex-col h-screen w-full p-5 md:px-20 md:py-10">
        <div className=" h-24">
          <span className="text-[50px] font-semibold">Users</span>
        </div>
        <div className=" flex md:flex-row-reverse h-[50px] mb-6">
        </div>
        <Show
          loading={loading}
          fallback={
            <div className="h-screen w-full flex flex-col items-center justify-center">
              <ReactLoading
                type="bubbles"
                color="#6A0A2D"
                height={100}
                width={100}
              />
            </div>
          }
        >
          <div className="overflow-x-auto rounded-lg">
            <table className=" dark:border-none items-center bg-transparent border w-full border-collapse">
              <thead className="dark:bg-darkcard bg-maroon rounded-lg text-base text-white">
                <tr>
                  <td className="px-6 uppercase font-semibold text-center py-3">
                    Name
                  </td>
                  <td className="px-6 uppercase font-semibold text-center py-3">
                    Username
                  </td>
                  <td className="px-6 uppercase font-semibold text-center py-3">
                    Email
                  </td>
                  <td className="px-6 uppercase font-semibold text-center py-3">
                    Phone Number
                  </td>
                  <td className="px-6 uppercase font-semibold text-center py-3">
                    Address
                  </td>
                  <td className="px-6 uppercase font-semibold text-center py-3">
                    Region
                  </td>
                  <td className="px-6 uppercase font-semibold text-center py-3">
                    Actions
                  </td>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="dark:bg-darkside " key={user.id}>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {user.name}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {user.username}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {user.email}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {user.phone_number}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {user.address}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {user.region}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center space-x-4 flex-row flex font-bold">
                      <EditModal
                        refetch={fetchUsers}
                        key={user.id}
                        id={user.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Show>
      </div>
    </>
  );
}
