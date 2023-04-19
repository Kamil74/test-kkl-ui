import {useEffect, useState} from "react";
interface CampaignDetailsProps {
    campaignId: string | number;
}

const CampaignDetails = ({ campaignId }: CampaignDetailsProps) => {
    const [details, setDetails] = useState({});

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(`/api/campaigns/${campaignId}`);
            const fetchedDetails = await response.json();
            setDetails(fetchedDetails);
        };

        if (campaignId) {
            fetchDetails();
        } else {
            setDetails({});
        }
    }, [campaignId]);

    // Render details based on fetched data
    return (
        <div>
            {/* Render details here */}
        </div>
    );
};
export default CampaignDetails;