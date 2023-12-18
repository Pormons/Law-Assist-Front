import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLawyerInfo } from "../../api/UserApi";
import Show from "../../components/other/Show";
import ReactLoading from "react-loading";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Lawyer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState([]);
  const [loading, setloading] = useState<boolean>(false);

  const fetchLawyer = async () => {
    setloading(true);
    try {
      const data = await fetchLawyerInfo(id);
      setLawyer(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const directMessage = (id) => {
    navigate(`/Home/Lawyers/${id}/Chats`);
  };

  useEffect(() => {
    fetchLawyer();
  }, []);

  return (
    <>
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
        <div className="h-screen dark:bg-darkcard bg-light border w-full">
          <div className="flex md:flex-row flex-col justify-center h-full items-center space-x-5">
            <div className="w-[45%] h-[85%]">
              <div className="shadow-2xl dark:bg-dark dark:text-white bg-white flex flex-col items-center w-full flex-grow h-full rounded-2xl p-2">
                <div className="flex items-center mt-7 mb-3 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[200px] h-[200px]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                
                <div className="text-base w-[40%] space-y-2 mb-4 flex flex-col items-center text-gray-700">
                  <p>
                    <strong>Atty:</strong> {lawyer.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {lawyer.phone_number}
                  </p>
                </div>
                
                  


                <div
                  onClick={() => {
                    directMessage(lawyer.id);
                  }}
                  className="hover:shadow-md w-[40%] hover:bg-hover bg-maroon rounded-lg h-9 font-semibold items-center text-white justify-center cursor-pointer flex space-x-2"
                >
                  <span className="text-sm">Send A Message</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>
                </div>

                <div className="flex mb-4 mt-4 justify-center items-center space-x-2">
                <span className="hidden md:block h-[2.05px] bg-gray-700 w-[97px] mt-6 mb-4"></span>
                <p>or</p>
                <span className="hidden md:block h-[2.05px] bg-gray-700 w-[97px] mt-6 mb-4"></span>
                </div>


                <div className="text-lg   flex w-[40%] h-15 flex-row space-x-5 font-semibold mb-2">
                  <a href="" className="rounded-[20%] transition-all ease-in-out flex-grow hover:-translate-y-1 hover:shadow-md cursor-pointer">
                    <img
                      className="h-10 w-full rounded-[20%]"
                      src="https://store-images.s-microsoft.com/image/apps.37935.13510798886619769.4e5fb71e-c241-41d7-a2f6-59c7ab342dfb.bc476ab8-3523-4507-bd0c-75f9928cdb7b?h=464"
                      alt=""
                    />
                  </a>
                  <a href="" className="rounded-[20%] transition-all ease-in-out flex-grow hover:-translate-y-1 hover:shadow-md cursor-pointer">
                    <img
                      className="h-10 w-full rounded-lg "
                      src="data:image/png;base64,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"
                      alt=""
                    />
                  </a>

                  <a href="" className="rounded-[20%] transition-all ease-in-out flex-grow hover:-translate-y-1 hover:shadow-md cursor-pointer">
                    <img
                      className="h-10 w-full rounded-lg "
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
                      alt=""
                    />
                  </a>
                  <a href="" className="rounded-[20%] transition-all ease-in-out flex-grow hover:-translate-y-1 hover:shadow-md cursor-pointer">
                    <img
                      className="h-10 w-full rounded-lg "
                      src="https://i.pinimg.com/564x/8e/a0/83/8ea08365d331d8ae9bd93ba5f50528d4.jpg"
                      alt=""
                    />
                  </a>
                </div>




              </div>
            </div>
            <div className="w-[45%] h-[85%] shadow-2xl rounded-lg">
              <MapContainer
                center={[8.9492, 125.543]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[8.9492, 125.543]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
