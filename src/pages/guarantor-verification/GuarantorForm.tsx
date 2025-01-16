import images from "@/assets/Images";
import { useNavigate } from "react-router-dom";
import { PiRecordFill } from "react-icons/pi";

const GuarantorForm = () => {
  const navigate = useNavigate(); 
  
  const handleSubmit = () => {
    // event.preventDefault();
    console.log('hello')
    navigate('/')
  }
  return (
    <div className="min-h-[100svh] py-10 grid place-content-center">
        <form onSubmit={handleSubmit} className="address w-[90%] max-w-[500px] rounded-2xl mx-auto border-[1px] border-destructive overflow-hidden">
            <div className="h-[70px] flex justify-between items-center bg-destructive gap-10 pr-5">
                <div className="layoff">
                  <img src={images.logo} alt="Vettme" className="h-8 pl-5 object-contain" />
                </div>
                <h2 className="text-white font-light md:text-xl uppercase mt-1">Guarantor's Verification Form</h2>
            </div>
            <p
            className="text-sm font-normal mb-5 pl-5 pt-5 pb-2  text-white border-b-[1px] border-gray-200"
            >
              Our employment process requires that a person seeking employment in our establishment should produce a creditable, responsible and acceptable person as a guarantor as a prerequisite to employment confirmation.
            </p>

            <div className="px-5">
              <fieldset className="text-gray-200 text-sm font-light border-b-[1px] border-slate-500 pb-3 mb-3">
                <legend>Are you aware that you'll be standing as a guarantor for Mr/Mrs Shokunbi Adams?</legend>
                <ul className="flex items-center gap-5 mt-2">
                  <li>
                    <label htmlFor="guarantor1">
                      <input type="radio" id="guarantor1" name="guarantor" className="mr-1" />
                      Yes
                    </label>
                  </li>
                  <li>
                    <label htmlFor="guarantor2">
                      <input type="radio" id="guarantor2" name="guarantor" className="mr-1" />
                      No
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset className="text-gray-200 text-sm font-light border-b-[1px] border-slate-500 pb-3 mb-3">
                <legend>Are you liable to any damages caused by our employee?</legend>
                <ul className="flex items-center gap-5 mt-2">
                  <li>
                    <label htmlFor="damage1">
                      <input type="radio" id="damage1" name="damage" className="mr-1" />
                      Yes
                    </label>
                  </li>
                  <li>
                    <label htmlFor="damage2">
                      <input type="radio" id="damage2" name="damage" className="mr-1" />
                      No
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset className="text-gray-200 text-sm font-light border-b-[1px] border-slate-500 pb-3 mb-3">
                <legend>Do you own a Car?</legend>
                <ul className="flex items-center gap-5 mt-2">
                  <li>
                    <label htmlFor="car1">
                      <input type="radio" id="car1" name="car" className="mr-1" />
                      Yes
                    </label>
                  </li>
                  <li>
                    <label htmlFor="car2">
                      <input type="radio" id="car2" name="car" className="mr-1" />
                      No
                    </label>
                  </li>
                </ul>
                <div className="mt-3 relative">
                  <label htmlFor="car">What's the value of your Car?</label>
                  <input type="number" id="car" className="w-full bg-gray-300 py-1 pl-6 text-gray-900 outline-none" />
                  <span className="text-gray-900 font-bold absolute left-3 bottom-1">#</span>
                </div>
              </fieldset>

              <fieldset className="text-gray-200 text-sm font-light border-b-[1px] border-slate-500 pb-3 mb-3">
                <legend>Do you own a property?</legend>
                <ul className="flex items-center gap-5 mt-2">
                  <li>
                    <label htmlFor="property1">
                      <input type="radio" id="property1" name="property" className="mr-1" />
                      Yes
                    </label>
                  </li>
                  <li>
                    <label htmlFor="property2">
                      <input type="radio" id="property2" name="property" className="mr-1" />
                      No
                    </label>
                  </li>
                </ul>
                <div className="mt-3 relative">
                  <label htmlFor="property">What's the value of your property?</label>
                  <input type="number" id="property" className="w-full bg-gray-300 py-1 pl-6 text-gray-900 outline-none" />
                  <span className="text-gray-900 font-bold absolute left-3 bottom-1">#</span>
                </div>
              </fieldset>
              <div className="mt-3 text-gray-200 text-sm font-light">
                  <label htmlFor="id-card">Upload your corporate ID card!</label>
                  <input type="file" id="id-card" className="w-full bg-gray-300 py-1 pl-3 text-gray-900 outline-none" />
              </div>
              <div className="mt-3 text-gray-200 text-sm font-light">
                  <label htmlFor="bank-statement">Upload your six months Bank statement!</label>
                  <input type="file" id="bank-statement" className="w-full bg-gray-300 py-1 pl-3 text-gray-900 outline-none" />
              </div>
              <div className="mt-3 text-gray-200 text-sm font-light border-t-[1px] border-b-[1px] border-slate-500 py-3 mb-5">
                  <span>Click the button below for the liveness check!</span>
                  <button
                    onClick={()=> navigate('liveness-check')}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 mt-3 pl-3 rounded-full text-gray-900 text-sm font-bold"
                  >
                    <span>Click</span>
                    <PiRecordFill  className="text-destructive text-4xl"/>
                  </button>
              </div>

                 <button type="submit"
                  className="w-full bg-destructive py-4 mt-2 rounded-xl text-white font-bold hover:bg-red-700"
                 >
                  Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default GuarantorForm;