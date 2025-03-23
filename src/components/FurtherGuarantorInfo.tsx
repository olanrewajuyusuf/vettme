import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFetchFurtherGuarantorInfo } from "@/hooks/company";
import { BsPlayBtnFill } from "react-icons/bs";
import { Loader } from "lucide-react";
import { useEffect, useState} from "react";
import { Badge } from "@/components/ui/badge";
import { FaRegHandPointRight } from "react-icons/fa";

interface Data {
    respId: string;
    typeId: string;
    name: string;
}

interface FormResponse {
    awarenessQuestion: string;
    liabilityQuestion: string;
    propertyQuestion: string;
    propertyType: [];
    propertyValue: string;
    bankStatement: string;
    idCard: string;
    livenessCheck: string
}

export default function FurtherGuarantorInfo({ respId, typeId, name }: Data) {
    const [formResponse, setFormResponse] = useState<FormResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { fetchFurtherGuarantorInfo } = useFetchFurtherGuarantorInfo();

    useEffect(() => {
        setIsLoading(true);
        const getFormResponse = async () => {
            try {
                const data = await fetchFurtherGuarantorInfo(respId, typeId);
                setFormResponse(data.data);
            } catch (error) {
                console.error(`Failed to get guarantor-form:`, error);
            } finally {
                setIsLoading(false);
            }
        }
        getFormResponse();
    }, [fetchFurtherGuarantorInfo, respId, typeId]);

    const data = {  
        awarenessQuestion: `Are you aware that you'll be standing as a guarantor for ${name}?`,
        liabilityQuestion: `Do you agree to be liable to any damages caused by our employee?`,
        propertyQuestion: `Do you own a property?`,
        propertyType: `Type of property`,
        propertyValue: `What is the value of your property?`,
        bankStatement: "Six months Bank statement",
        idCard: "Corporate ID card!",
        livenessCheck: "liveness check confidence",
    };

    if (isLoading && formResponse === null) {
        return (
            <div className="h-[300px] grid place-items-center">
                <Loader />
            </div>
        )
    }

    return (formResponse !== null && !isLoading) && (
        <div className="border-t-[1px] border-stroke-clr p-10">
            <h2 className="mb-10">Further Information from the Guarantor form</h2>
            <div>
              <Table>
                <TableHeader className="bg-stroke-clr">
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Q.</TableHead>
                    <TableHead>Ans.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {(formResponse && formResponse.awarenessQuestion) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.awarenessQuestion}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.awarenessQuestion ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.liabilityQuestion) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.liabilityQuestion}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.liabilityQuestion ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.propertyQuestion) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.propertyQuestion}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.propertyQuestion ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.propertyType.length > 0) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.propertyType}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.propertyType.length > 0 
                            ? (formResponse.propertyType.map((item: string) => <Badge key={item}>{item} </Badge>))
                            : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.propertyValue) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.propertyValue}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.propertyValue ? formResponse.propertyValue : ""}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.bankStatement) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.bankStatement}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr text-blue-500 text-3xl hover:text-blue-800">
                            {formResponse && formResponse.bankStatement ? (<a href={formResponse.bankStatement} target="_blank" rel="noopener noreferrer"><BsPlayBtnFill /></a>) : ""}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.idCard) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.idCard}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr text-blue-500 text-3xl hover:text-blue-800">
                            {formResponse && formResponse.idCard ? (<a href={formResponse.idCard} target="_blank" rel="noopener noreferrer"><BsPlayBtnFill /></a>) : ""}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.livenessCheck) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.livenessCheck}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.livenessCheck ? formResponse.livenessCheck  : ""}
                        </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
        </div>
    );
}
