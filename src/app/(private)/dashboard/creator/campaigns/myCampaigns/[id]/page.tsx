import AddCampaignForm from "@/components/dashboard/creator/AddCampaignForm";
import { GetCampaign } from "@/lib/actions/campaign";
import { UserSessionToSSR } from "@/lib/core/session";
import { User } from "@/types";
import { notFound } from "next/navigation";

const UpdateCampaignPage = async({ params }: { params: { id: string }}) => {

    const { id } = await  params

    let campaign
     try {
        ({ campaign } = await GetCampaign(id));
      } catch {
        notFound();
      }
    
      if (!campaign) {
        notFound();
      }
    

   const user = await UserSessionToSSR();
     console.log(user);
   
     return <AddCampaignForm user={user as User} campaign={campaign} />;
};

export default UpdateCampaignPage;