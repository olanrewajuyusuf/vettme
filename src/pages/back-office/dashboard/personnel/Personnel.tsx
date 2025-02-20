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
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { useFetchFinding, useFetchVerdict } from "@/hooks/company";
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
import { Button } from "@/components/ui/button";
import { useFetchBatchesResponse } from "@/hooks/backOffice";

export default function Personnel() {
  const [claims, setClaims] = useState<"" | any>("");
  const [findings, setFindings] = useState<"" | any>("");
  const [verdicts, setVerdicts] = useState<"" | any>("");
  // const { fetchForm } = useFetchForm();
  const { fetchFinding } = useFetchFinding();
  const { fetchVerdict } = useFetchVerdict();
  const {fetchBatchesResponse} = useFetchBatchesResponse();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getResponse = async () => {
      try {
        const data = await fetchBatchesResponse(params.verification_id as string);
        const resp = data.data.filter((item: any)=> item.id === params.id);
        setClaims(resp);
      } catch (error) {
        console.error("Failed to get batches response:", error);
      }
    };

    const getFinding = async () => {
        try {
          const data = await fetchFinding(params.id as string);
          setFindings(data);
        } catch (error) {
          console.error("Failed to get Finding:", error);
        }
    };

    const getVerdict = async () => {
        try {
          const data = await fetchVerdict(params.id as string);
          setVerdicts(data.results);
        } catch (error) {
          console.error("Failed to get Verdict:", error);
        }
    };

    getResponse();
    getFinding();
    getVerdict();
  }, [fetchFinding, params.id, fetchVerdict, params.verification_id, fetchBatchesResponse]);
  
  const headers = [
    {
      title: "Status",
      text: claims && claims[0].status,
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
  
  const personalInformation = getFilteredObjects(claims && claims[0].responses, findings, personalInput, "pi", verdicts);
  const guarantorInformation = getFilteredObjects(claims && claims[0].responses, findings, guarantorInput1, "gi", "1", verdicts);
  const guarantorInformation2 = getFilteredObjects(claims && claims[0].responses, findings, guarantorInput2, 'gi', "2", verdicts);
  const guarantorInformation3 = getFilteredObjects(claims && claims[0].responses, findings, guarantorInput3, "gi", '3', verdicts);
  const guarantorInformation4 = getFilteredObjects(claims && claims[0].responses, findings, guarantorInput4, "gi", '4', verdicts);
  const academicInformation = getFilteredObjects(claims && claims[0].responses, findings, academicInput, "ai", verdicts);
  const professionalInformation = getFilteredObjects(claims && claims[0].responses, findings, professionalInput1, "pri", "1", verdicts);
  const professionalInformation2 = getFilteredObjects(claims && claims[0].responses, findings, professionalInput2, "pri", '2', verdicts);
  const mentalInformation = getFilteredObjects(claims && claims[0].responses, findings, mentalHealthInput, "mhi", verdicts);

  return (
    <>
      <div className="mb-[30px] flex justify-between items-center">
        <div>
          <h2>{claims && claims[0].responses.piFullname}</h2>
          <p className="text-sm">Date Created: {moment(claims && claims[0].submittedAt).calendar()}</p>
        </div>

        <Button
              className="gap-2 bg-gray-200 text-base-clr hover:bg-gray-300"
              onClick={() => navigate("edit")}
            >
              Edit
        </Button>
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
                <p className="text-[16px] font-medium">1st Guarantor's Information</p>
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
