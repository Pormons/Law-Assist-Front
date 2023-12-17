import {
  faCalendarDays,
  faScaleBalanced,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Chart from "react-google-charts";
import "react-calendar/dist/Calendar.css";
import "../../assets/Dashboard.css";
import { dashboard } from "../../api/AdminApi";
import Show from "../../components/other/Show";
import ReactLoading from "react-loading";

const options = {
  backgroundColor: "white",
  title: "User",
  is3D: true,
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Dashboard() {
  const [value, onChange] = useState<Value>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboards, setDashboard] = useState([]);

  const fetchDashboard = async () => {
    try {
      const data = await dashboard();
      setDashboard(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDashboard();
    };

    fetchData();
  }, []);

  return (
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
      <div className="dark:bg-dark border h-screen w-full overflow-y-auto p-3 md:p-9">
        <div className="flex flex-col gap-3 p-9 md:p-0 md:gap-9 md:flex-row md:justify-center">
          <div className="dark:bg-darkcard flex-grow md:mb-[30px] px-9 shadow-lg bg-maroon flex items-center justify-between rounded-lg p-4 h-24">
            <FontAwesomeIcon icon={faUsers} className="w-16 h-16 text-white" />
            <div className="flex-col flex items-center text-white">
              <p className="text-lg font-bold">Total Users</p>
              <span className="text-2xl font-extrabold">
                {dashboards.users}
              </span>
            </div>
          </div>

          <div className="dark:bg-darkcard flex-grow px-9 shadow-lg bg-maroon flex items-center justify-between rounded-lg p-4 h-24">
            <FontAwesomeIcon
              icon={faScaleBalanced}
              className="w-16 h-16 text-white"
            />
            <div className="flex-col flex items-center text-white">
              <p className="text-lg font-bold">Total Lawyers</p>
              <span className="text-2xl font-extrabold">
                {dashboards.lawyers}
              </span>
            </div>
          </div>

          <div className="dark:bg-darkcard flex-grow shadow-lg space-x-9 md:space-x-0 px-9 bg-maroon flex items-center justify-between rounded-lg p-4 h-24">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="w-16 h-16 text-white"
            />
            <div className="flex-col flex items-center text-white">
              <p className="text-lg block text-center font-bold">
                Total Appointments
              </p>
              <span className="text-2xl font-extrabold">
                {dashboards.appointments}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:p-6 w-full md:flex-row ">
          {/* Chart */}
          <div className="mb-8 w-full md:w-[50%] md:h-full md:mb-0 border rounded-md shadow-md">
            <div className="p-2 dark:bg-darkcard">
              <Chart
                chartType="PieChart"
                data={[
                  ["Task", "Users"],
                  ["New Users", 2],
                  ["Active Users", 3],
                  ["Inactive Users", 4],
                ]}
                options={options}
                width={"100%"}
                height={"400px"}
                legendToggle
              />
            </div>
          </div>

          {/* Calendar */}
          <div className="h-full md:flex-grow md:items-stretch justify-center flex p-4 mt-4 md:mt-0">
            <Calendar onChange={onChange} showWeekNumbers value={value} />
          </div>
        </div>
      </div>
    </Show>
  );
}
