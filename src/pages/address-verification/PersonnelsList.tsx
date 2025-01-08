import { personnelsInfo } from "@/lib/placeholderData";
import { getGeolocation } from "@/lib/geolocation";
import { useNavigate } from "react-router-dom";
import Nav from "../back-office/components/nav";

const PersonnelsList = () => {
  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    getGeolocation(
      async (location, accuracy) => {
        console.log('Latitude:', location.lat, 'Longitude:', location.lon, 'Accuracy:', accuracy);
  
        // Save the location to localStorage
        localStorage.setItem('savedLocations', JSON.stringify(location));

      },
      (errorMessage) => {
        alert(`Error: ${errorMessage}`);
      }
    );

    navigate(`address-form/${id}`)
  }
  return (
    <>
    <Nav />
    <div className=" flow-root md:px-10 px-3">
      <h1 className="text-xl md:text-2xl font-light mb-3 md:mb-5">List of Personnels to verify</h1>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-white p-2 md:pt-0 mb-10">
          <div className="md:hidden">
            {personnelsInfo?.map((info) => (
              <div
                key={info.id}
                className="mb-2 w-full rounded-md bg-gray-50 px-2 py-4"
              >
                <div className="flex items-center justify-between border-b-2 border-white pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="rounded-full w-8 h-8 bg-white text-green-400 mr-1 grid place-items-center">{info.name.slice(0, 1)}</div>
                      <p>{info.name}</p>
                    </div>
                  </div>
                  <button 
                      onClick={() => handleClick(info.id)} 
                      className="bg-red-300 text-white text-[12px] md:text-[16px] md:px-5 px-2 py-2 rounded-full border-[1px] border-destructive hover:bg-destructive hover:text-white"
                      >
                        Start Verification
                  </button>
                </div>
                <div className="pt-4">
                  <p className="text-gray-500">{info.Address}</p>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-700 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="py-5 font-medium sm:pl-6">
                </th>
                <th scope="col" className="py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Start Button</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {personnelsInfo?.map((info) => (
                <tr
                  key={info.id}
                  className="w-full border-b-2 border-white py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-3">
                    <div className="rounded-full w-10 h-10 bg-white text-green-400 mr-1 grid place-items-center">{info.name.slice(0, 1)}</div>
                  </td>
                  <td className="whitespace-nowrap py-3">
                    {info.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {info.Address}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <button 
                        onClick={() => handleClick(info.id)} 
                        className="px-5 py-2 rounded-full border-[1px] border-destructive hover:bg-destructive hover:text-white"
                        >
                          Start Verification
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default PersonnelsList;