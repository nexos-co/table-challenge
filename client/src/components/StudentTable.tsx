import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import {
    Download,
    PenLine,
    Search,
    Trash,
    UserRound,
    UserRoundPen,
} from "lucide-react";

const StudentTable = () => {
    return (
        <Table>
            <TableCaption> List of Students</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Students</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right"> </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )


}
export default StudentTable;

