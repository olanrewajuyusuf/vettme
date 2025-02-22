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
import { useLocation, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { useFetchFinding, useFetchVerdict, useFetchVerificationRating } from "@/hooks/company";
import { getFilteredObjects } from "@/lib/filteredObjects";
import { 
  academicInput, 
  guarantorInput1, 
  guarantorInput2, 
  guarantorInput3, 
  guarantorInput4, 
  mentalHealthInput, 
  personalInput, 
  professionalInput1, 
  professionalInput2 } from "@/utils/field";

export default function Personnel() {
  const location = useLocation();
  const { state } = location;
  const [findings, setFindings] = useState<"" | any>("");
  const [verdicts, setVerdicts] = useState<"" | any>("");
  const { fetchFinding } = useFetchFinding();
  const { fetchVerificationRating } = useFetchVerificationRating();
  const params = useParams();
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

      const getRating = async () => {
        try {
          const data = await fetchVerificationRating(params.personnel_id as string);
          // setVerdicts(data.results);
          console.log(data);
          
        } catch (error) {
          console.error("Failed to get Rating:", error);
        }
      };

      getFinding();
      getVerdict();
      getRating();
  }, [fetchFinding, state.id, fetchVerdict, fetchVerificationRating, params.personnel_id]);

  // console.log(state.id, params);
  
  const headers = [
    {
      title: "Status",
      text: state.status,
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
  const guarantorInformation = getFilteredObjects(state.responses, findings, guarantorInput1, "gi", "1", verdicts);
  const guarantorInformation2 = getFilteredObjects(state.responses, findings, guarantorInput2, 'gi', "2", verdicts);
  const guarantorInformation3 = getFilteredObjects(state.responses, findings, guarantorInput3, "gi", '3', verdicts);
  const guarantorInformation4 = getFilteredObjects(state.responses, findings, guarantorInput4, "gi", '4', verdicts);
  const academicInformation = getFilteredObjects(state.responses, findings, academicInput, "ai", verdicts);
  const professionalInformation = getFilteredObjects(state.responses, findings, professionalInput1, "pri", "1", verdicts);
  const professionalInformation2 = getFilteredObjects(state.responses, findings, professionalInput2, "pri", '2', verdicts);
  const mentalInformation = getFilteredObjects(state.responses, findings, mentalHealthInput, "mhi", verdicts);  
  
  return (
    <>
      <div className="mb-[30px] flex justify-between items-center">
        <div>
          <h2>{state.responses.piFullname}</h2>
          <p className="text-sm">Date Created: {moment(state.submittedAt).calendar()}</p>
        </div>
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
                <p className="text-[16px] font-medium">{guarantorInformation2.length > 0 ? "1st Guarantor Information" : "Guarantor Information"}</p>
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
        {guarantorInformation2.length > 0 && (
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value='personal information'>
              <AccordionTrigger className="px-7">
                <p className="text-[16px] font-medium">2nd Guarantor's Information</p>
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
                    {guarantorInformation2.map((item, idx) => (
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
        {guarantorInformation3.length > 0 && (
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value='personal information'>
              <AccordionTrigger className="px-7">
                <p className="text-[16px] font-medium">3rd Guarantor's Information</p>
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
                    {guarantorInformation3.map((item, idx) => (
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
        {guarantorInformation4.length > 0 && (
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value='personal information'>
              <AccordionTrigger className="px-7">
                <p className="text-[16px] font-medium">4th Guarantor's Information</p>
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
                    {guarantorInformation4.map((item, idx) => (
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
                <p className="text-[16px] font-medium">{professionalInformation2.length > 0 ? "1st Professional Information" : "Professional Information"}</p>
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
        {professionalInformation2.length > 0 && (
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value='personal information'>
              <AccordionTrigger className="px-7">
                <p className="text-[16px] font-medium">2nd Professional Information</p>
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
                    {professionalInformation2.map((item, idx) => (
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

      {/* <div className="flex gap-3">
        <Button className="red-gradient">Download Data</Button>
      </div> */}
    </>
  );
}
