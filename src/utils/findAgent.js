import { database } from "@/firebase/firebaseConfig";
import { get, ref, set, update } from "firebase/database";
import { generateAndStoreCouponCode } from "./Utils";

export async function findAgentByAgentCode(agentCode, docId) {
    try {
        const couponCode = await generateAndStoreCouponCode();

        const agentsRef = ref(database, 'users');
        const snapshot = await get(agentsRef);

        if (!snapshot.exists()) {
            console.log("No agents data found.");
            return null;
        }

        let foundAgent = null;
        snapshot.forEach(agentSnapshot => {
            const agent = agentSnapshot.val();
            if (agent.agentCode === agentCode) {
                foundAgent = agent;
                return true;
            }
        });

        if (foundAgent) {
            const agentToursRef = ref(database, `users/${foundAgent.uid}/agentTours/${docId}`);
            await set(agentToursRef, { tourId: docId, couponCodes: couponCode });

            console.log("Agent found and coupon code added successfully");
            return foundAgent;
        } else {
            console.log("No agent found with the given agentCode");
            return null;
        }

    } catch (error) {
        console.error("Error fetching agent data:", error);
        return null;
    }
}
