import { Button } from "@material-tailwind/react";
import { Download, Search, UserRoundPen } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import StudentForm from "./StudentForm";
const Header = ({
    searchParam,
    setSearchParam,
}: {
    searchParam: string;
    setSearchParam: (searchParam: string) => void;
}) => {
    const onSearch = (search: string) => {
        setSearchParam(search);

    }

    //Add logic for download doc

    return (
        <div className="table_header">
            <h1>Students</h1>
            <h3>See Information About All Students</h3>

            <div className="table_header_content">
                <div className="input_search">
                    <input
                        onChange={(e) => onSearch(e.target.value)}
                        value={searchParam}
                        className="input"
                        type="search"
                        placeholder="Search..."
                    />
                    <Search />
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                    <Button className="add_button">
                    <UserRoundPen />
                    Create Student
                </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <StudentForm open={false} onClose={() => {}}/>
                    </DialogContent>
                </Dialog>
                <Button className="download_button">
                    <Download />
                    Get All
                </Button>
            </div>
        </div>

    )
}
export default Header;