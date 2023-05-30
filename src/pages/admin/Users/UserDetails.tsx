import {useEffect, useState} from "react";
import User from "./User";



interface UserDetailsProps {
    userId: string | number;
}

const UserDetails = ({ userId }: UserDetailsProps) => {
    const [details, setDetails] = useState<User>({
        ID: 0,
        FirstName: "",
        LastName: "",
        IdNum: "",
        IsActive: true,
        Password: "",
        Email: "",
        Phone: "",
        Role: "salkakal-admin",
        Module: ""
    });

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(`/api/campaigns/${userId}`);
            const fetchedDetails = await response.json();
            setDetails(fetchedDetails);
        };

        if (userId) {
            fetchDetails();
        } else {
            setDetails({
                Email: "",
                FirstName: "",
                ID: 0,
                IdNum: "",
                IsActive: false,
                LastName: "",
                Module: "",
                Password: "",
                Phone: "",
                Role: ""
            });
        }
    }, [userId]);

    return (
        <div>
            <h1>User Details</h1>
            <p>ID: {details.IdNum}</p>
            <p>FirstName: {details.FirstName}</p>
            <p>LastName: {details.LastName}</p>
            <p>Email: {details.Email}</p>
            <p>Phone: {details.Phone}</p>
            <p>Module: {details.Module}</p>
        </div>
    );
};
export default UserDetails;