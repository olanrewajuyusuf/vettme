// import { useFetchFurtherInfo } from "@/hooks/company";
import { useFetchFurtherInfo } from "@/hooks/backOffice";
import { useEffect, useState } from "react";
import { Table } from "./ui/table";

interface Data {
    title: string,
    respId: string,
    typeId: string,
    name: string
}

export default function FurtherInfo ({title, respId, typeId}: Data) {
    const [formResponse, setFormResponse] = useState<any>(null);
    const { fetchFurtherInfo } = useFetchFurtherInfo();

    useEffect(() => {
        const getFormResponse = async () => {
          try {
            const data = await fetchFurtherInfo(title, respId, typeId);
            console.log(data);
            setFormResponse(data.data);
          } catch (error) {
            console.error(`Failed to get ${title}:`, error);
          }
        };

        getFormResponse();
    }, [fetchFurtherInfo, title, respId, typeId]);

    console.log(formResponse);
    // const data = {  
    //   awarenessQuestion: `Are you aware that you'll be standing as a guarantor for ${name}?`,
    //   liabilityQuestion: `Do you agree to be liable to any damages caused by our employee?`,
    //   propertyQuestion: `Do you own a property?`,
    //   bankStatement: "gfadhghgds",


    // }
    
    return (
        <div className="border-t-[1px] border-stroke-clr p-10">
            <h3>Further Information from the {title}</h3>
            <div>
              <Table>

              </Table>
            </div>
        </div>
    )
}