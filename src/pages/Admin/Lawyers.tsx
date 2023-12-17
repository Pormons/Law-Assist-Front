import { useEffect, useState } from "react";
import { fetchAllLawyers } from "../../api/AdminApi";
import Show from "../../components/other/Show";
import ReactLoading from "react-loading";
import CreateModal from "../../components/CreateModal";
import EditModal from "../../components/EditModal";
import DeleteModal from "../../components/DeleteModal";

export default function Lawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLawyers = async () => {
    try {
      const data = await fetchAllLawyers();
      setLawyers(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    setLoading(true)
    setTimeout(()=>{
      fetchLawyers();
    },1000)
  }, []);
  return (
    <>
      <div className="dark:bg-dark dark:text-white flex flex-col h-screen w-full p-5 md:px-20 md:py-10">
        <div className=" h-24">
          <span className="text-[50px] font-semibold">Dealers</span>
        </div>
        <div className=" flex md:flex-row-reverse h-[50px] mb-6">
          <CreateModal refetch={fetchLawyers} loading={setLoading} />
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
            <table className="items-center bg-transparent border dark:border-none w-full border-collapse">
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
                {lawyers.map((lawyer) => (
                  <tr className="dark:bg-darkside" key={lawyer.id}>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {lawyer.name}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {lawyer.username}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {lawyer.email}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {lawyer.phone_number}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {lawyer.address}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center font-bold">
                      {lawyer.region}
                    </td>
                    <td className="border-t-0 px-6 text-sm p-2 text-center space-x-4 flex-row flex font-bold">
                      <EditModal
                        refetch={fetchLawyers}
                        key={lawyer.id}
                        id={lawyer.id}
                        loading={setLoading}
                      />
                      <DeleteModal
                        refetch={fetchLawyers}
                        key={lawyer.id}
                        id={lawyer.id}
                        name={lawyer.name}
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
