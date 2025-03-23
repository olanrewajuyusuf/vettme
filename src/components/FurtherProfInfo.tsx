import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFetchFurtherProfessionalInfo } from "@/hooks/company";
import { Loader } from "lucide-react";
import { useEffect, useState} from "react";
import { FaRegHandPointRight } from "react-icons/fa";

interface Data {
    respId: string;
    typeId: string;
    name: string;
}

interface FormResponse {
    communicationSkills: boolean,
    disciplinaryIssues: boolean,
    employmentStartDate: boolean,
    employmentType: boolean,
    initiative: boolean,
    leaderShipQualities: boolean,
    organizationEmail: boolean,    
    organizationName: boolean,    
    performanceTargets: boolean,
    problemSolving: boolean,
    professionalSkills: boolean,
    referenceName: boolean,
    willingness: boolean,
}

export default function FurtherProfInfo({ respId, typeId, name }: Data) {
    const [formResponse, setFormResponse] = useState<FormResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { fetchFurtherProfessionalInfo } = useFetchFurtherProfessionalInfo();

    useEffect(() => {
        setIsLoading(true);
        const getFormResponse = async () => {
            try {
                const data = await fetchFurtherProfessionalInfo (respId, typeId);
                setFormResponse(data.data);
            } catch (error) {
                console.error(`Failed to get guarantor-form:`, error);
            } finally {
                setIsLoading(false);
            }
        }
        getFormResponse();
    }, [fetchFurtherProfessionalInfo , respId, typeId]);

    const data = {
        organizationName: `Did Mr/Mrs ${name} work in your Organization as claimed?`,
        communicationSkills: `Did Mr./Mrs. ${name} demonstrate strong communication skills during their time at your organization?`,
        disciplinaryIssues: `Did ${name} have any disciplinary issues during their employment?`,
        employmentStartDate: `Did Mr/Mrs ${name} start working in your Organization as claimed?`,
        employmentType: `Was the employment type of ${name} is the same as claimed?`,
        initiative: `Did ${name} take initiative in improving processes or contributing to the success of the organization?`,
        leaderShipQualities: `Would you say that ${name} demonstrated leadership qualities or potential during their time at your organization?`,
        organizationEmail: `Is the claimed email your organization's email?`,    
        performanceTargets: `Did Mr./Mrs. ${name} meet performance targets and deadlines in their role?`,
        problemSolving: `Would you say ${name} possessed problem-solving skills?`,
        professionalSkills: `Would you say that ${name} possesses the claimed skill(s)`,
        referenceName: `${name} used claimed name Donald as a reference. Have you worked with them, and would you consider them a good referral?`,
        willingness: `Did ${name} show a willingness to learn and adapt to new tasks or technologies?`,
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
                    {(formResponse && formResponse.organizationName) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.organizationName}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.organizationName ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.organizationEmail) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.organizationEmail}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.organizationEmail ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.employmentStartDate) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.employmentStartDate}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.employmentStartDate ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.employmentType) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.employmentType}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.employmentType ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.professionalSkills) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.professionalSkills}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.professionalSkills ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.performanceTargets) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.performanceTargets}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.performanceTargets ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.willingness) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.willingness}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.willingness ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.problemSolving) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.problemSolving}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.problemSolving ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.communicationSkills) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.communicationSkills}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.communicationSkills ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.disciplinaryIssues) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.disciplinaryIssues}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.disciplinaryIssues ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.leaderShipQualities) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.leaderShipQualities}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.leaderShipQualities ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.initiative) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.initiative}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.initiative ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                    {(formResponse && formResponse.referenceName) && (
                    <TableRow>
                        <TableCell><FaRegHandPointRight /></TableCell>
                        <TableCell className="w-1/2">{data.referenceName}</TableCell>
                        <TableCell className="w-1/2 border-l-[1px] border-stroke-clr">
                            {formResponse && formResponse.referenceName ? "Yes" : "No"}
                        </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
        </div>
    );
}
