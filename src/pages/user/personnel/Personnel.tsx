import DeleteVerification from "@/components/modals/DeleteVerification";
import { Button } from "@/components/ui/button";
// import { TrashIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { useFetchFinding, useFetchVerdict } from "@/hooks/company";
import { getFilteredObjects } from "@/lib/filteredObjects";
import { academicInput, guarantorInput, personalInput, professionalInput } from "@/utils/field";
import { mentalHealthFields } from "@/utils/formSetupData";

export default function Personnel() {
  const location = useLocation();
  const { state } = location;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [findings, setFindings] = useState<"" | any>("");
  const [verdicts, setVerdicts] = useState<"" | any>("");
  const { fetchFinding } = useFetchFinding();
  const { fetchVerdict } = useFetchVerdict();

  useEffect(() => {
      const getFinding = async () => {
        try {
          const data = await fetchFinding(state.id);
          setFindings(data);
        } catch (error) {
          console.error("Failed to get Finding:", error);
        }
      };

      const getVerdict = async () => {
        try {
          const data = await fetchVerdict(state.id);
          setVerdicts(data.results);
        } catch (error) {
          console.error("Failed to get Verdict:", error);
        }
      };
  
      getFinding();
      getVerdict();
  }, [fetchFinding, state.id, fetchVerdict]);
  
  const headers = [
    {
      title: "Status",
      text: state.status,
    },
    {
      title: "Position",
      text: state.position,
    },
    {
      title: "Verification Rating",
      text: "9.8/10",
    },
    {
      title: "Claims Verified",
      text: "34/41",
    },
    {
      title: "Claims Rejected",
      text: "7/41",
    },
  ];
  
  const personalInformation = getFilteredObjects(state.responses, findings, personalInput, "pi", verdicts);
  const guarantorInformation = getFilteredObjects(state.responses, findings, guarantorInput, "gi", verdicts);
  const academicInformation = getFilteredObjects(state.responses, findings, academicInput, "ai", verdicts);
  const professionalInformation = getFilteredObjects(state.responses, findings, professionalInput, "pri", verdicts);
  const mentalInformation = getFilteredObjects(state.responses, findings, mentalHealthFields, "mhi", verdicts);
  
  return (
    <>
      {
        <DeleteVerification
          isOpen={deleteModalOpen}
          setIsOpen={setDeleteModalOpen}
        />
      }

      <div className="mb-[30px] flex justify-between items-center">
        <div>
          <h2>{state.responses.piFullname}</h2>
          <p className="text-sm">Date Created: {moment(state.submittedAt).calendar()}</p>
        </div>

        {/* <Button
          variant="outline"
          className="gap-2 border-red-clr text-red-clr hover:text-red-clr hover:bg-red-50"
          onClick={() => setDeleteModalOpen(true)}
        >
          <TrashIcon /> Delete
        </Button> */}
      </div>

      <div className="w-full bg-white rounded-xl flex items-center justify-between overflow-hidden border-[1px] border-stroke-clr mb-6">
        {headers.map((header, idx) => (
          <div
            className="list px-4 border-l-[1px] border-stroke-clr py-4 flex-1"
            key={idx}
          >
            <p className="text-sm">{header.title}</p>
            <p className="font-semibold">{header.text}</p>
          </div>
        ))}
      </div>

      <Accordion type="single" collapsible>
        {personalInformation.length > 0 && (
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value='personal information'>
              <AccordionTrigger className="px-7">
                <p className="text-[16px] font-medium">Personal Information</p>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader className="bg-stroke-clr">
                    <TableRow>
                      <TableHead className="w-1/6">Data</TableHead>
                      <TableHead className="w-2/6">Claim</TableHead>
                      <TableHead className="w-2/6">Finding</TableHead>
                      <TableHead className="w-1/6">Verdict</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personalInformation.map((item, idx) => (
                      <TableRow key={idx}>
                          <TableCell key={idx} className="font-medium w-1/6">
                          {item.data}
                        </TableCell>
                        <TableCell className="w-2/6">{item.claim}</TableCell>
                        <TableCell className="w-2/6">{item.finding ? item.finding : "No data"}</TableCell>
                        <TableCell className="w-1/6">
                          <Badge className={`${item.verdict ? "bg-green-600" : "bg-destructive"}`}>{item.verdict ? 'Correct' : 'Incorrect'}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </div>
        )}
      </Accordion>

      <Accordion type="single" collapsible>
        {guarantorInformation.length > 0 && (
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value='personal information'>
              <AccordionTrigger className="px-7">
                <p className="text-[16px] font-medium">Guarantor's Information</p>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader className="bg-stroke-clr">
                    <TableRow>
                      <TableHead className="w-1/6">Data</TableHead>
                      <TableHead className="w-2/6">Claim</TableHead>
                      <TableHead className="w-2/6">Finding</TableHead>
                      <TableHead className="w-1/6">Verdict</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guarantorInformation.map((item, idx) => (
                      <TableRow key={idx}>
                          <TableCell key={idx} className="font-medium w-1/6">
                          {item.data}
                        </TableCell>
                        <TableCell className="w-2/6">{item.claim}</TableCell>
                        <TableCell className="w-2/6">{item.finding ? item.finding : "No data"}</TableCell>
                        <TableCell className="w-1/6">
                          <Badge className={`${item.verdict ? "bg-green-600" : "bg-destructive"}`}>{item.verdict ? 'Correct' : 'Incorrect'}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </div>
        )}
      </Accordion>

      <Accordion type="single" collapsible>
        {academicInformation.length > 0 && (
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value='personal information'>
              <AccordionTrigger className="px-7">
                <p className="text-[16px] font-medium">Academic Information</p>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader className="bg-stroke-clr">
                    <TableRow>
                      <TableHead className="w-1/6">Data</TableHead>
                      <TableHead className="w-2/6">Claim</TableHead>
                      <TableHead className="w-2/6">Finding</TableHead>
                      <TableHead className="w-1/6">Verdict</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {academicInformation.map((item, idx) => (
                      <TableRow key={idx}>
                          <TableCell key={idx} className="font-medium w-1/6">
                          {item.data}
                        </TableCell>
                        <TableCell className="w-2/6">{item.claim}</TableCell>
                        <TableCell className="w-2/6">{item.finding ? item.finding : "No data"}</TableCell>
                        <TableCell className="w-1/6">
                          <Badge className={`${item.verdict ? "bg-green-600" : "bg-destructive"}`}>{item.verdict ? 'Correct' : 'Incorrect'}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </div>
        )}
      </Accordion>

      <Accordion type="single" collapsible>
        {professionalInformation.length > 0 && (
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value='personal information'>
              <AccordionTrigger className="px-7">
                <p className="text-[16px] font-medium">Professional Information</p>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader className="bg-stroke-clr">
                    <TableRow>
                      <TableHead className="w-1/6">Data</TableHead>
                      <TableHead className="w-2/6">Claim</TableHead>
                      <TableHead className="w-2/6">Finding</TableHead>
                      <TableHead className="w-1/6">Verdict</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {professionalInformation.map((item, idx) => (
                      <TableRow key={idx}>
                          <TableCell key={idx} className="font-medium w-1/6">
                          {item.data}
                        </TableCell>
                        <TableCell className="w-2/6">{item.claim}</TableCell>
                        <TableCell className="w-2/6">{item.finding ? item.finding : "No data"}</TableCell>
                        <TableCell className="w-1/6">
                          <Badge className={`${item.verdict ? "bg-green-600" : "bg-destructive"}`}>{item.verdict ? 'Correct' : 'Incorrect'}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </div>
        )}
      </Accordion>

      <Accordion type="single" collapsible>
        {mentalInformation.length > 0 && (
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value='personal information'>
              <AccordionTrigger className="px-7">
                <p className="text-[16px] font-medium">Mental Health Information</p>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader className="bg-stroke-clr">
                    <TableRow>
                      <TableHead className="w-1/6">Data</TableHead>
                      <TableHead className="w-2/6">Claim</TableHead>
                      <TableHead className="w-2/6">Finding</TableHead>
                      <TableHead className="w-1/6">Verdict</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mentalInformation.map((item, idx) => (
                      <TableRow key={idx}>
                          <TableCell key={idx} className="font-medium w-1/6">
                          {item.data}
                        </TableCell>
                        <TableCell className="w-2/6">{item.claim}</TableCell>
                        <TableCell className="w-2/6">{item.finding ? item.finding : "No data"}</TableCell>
                        <TableCell className="w-1/6">
                          <Badge className={`${item.verdict ? "bg-green-600" : "bg-destructive"}`}>{item.verdict ? 'Correct' : 'Incorrect'}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </div>
        )}
      </Accordion>

      <div className="flex gap-3">
        <Button className="red-gradient">Download Data</Button>
      </div>
    </>
  );
}
