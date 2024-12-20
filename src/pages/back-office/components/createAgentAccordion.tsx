import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { personnelsInfo} from "@/lib/placeholderData";

const CreateAgentAccordion = () => {
  return (
    <Accordion type="single" collapsible>
          <div className="w-full rounded-xl bg-white border-2 border-black overflow-hidden mb-[30px]">
            <AccordionItem value="field agent">
              <AccordionTrigger className="pl-3">
                <p className="text-[16px] font-medium">Personnels to assign</p>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader className="bg-stroke-clr">
                    <TableRow>
                      <TableHead className="w-1/6"></TableHead>
                      <TableHead className="w-2/6">Name</TableHead>
                      <TableHead className="w-2/6">Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personnelsInfo.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium w-5">
                          <input type="checkbox" name={item.name} id={item.id} />
                        </TableCell>
                        <TableCell className="w-2/5">{item.name}</TableCell>
                        <TableCell className="w-[50%]">{item.Address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </div>
      </Accordion>
  )
}

export default CreateAgentAccordion;