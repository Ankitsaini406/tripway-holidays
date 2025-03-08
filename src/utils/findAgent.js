import { database } from "@/firebase/firebaseConfig";
import { get, ref, set } from "firebase/database";
import { generateAndStoreCouponCode } from "./Utils";

export async function findAgentByAgentCode(agentCode, docId = null) {
    try {
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

        if (!foundAgent) {
            console.log("No agent found with the given agentCode");
            return null;
        }

        if (docId) {
            const couponCode = await generateAndStoreCouponCode('Agent');
            const agentToursRef = ref(database, `users/${foundAgent.uid}/agentTours/${docId}`);
            await set(agentToursRef, { tourId: docId, couponCode: couponCode });
            console.log("Agent found and coupon code added successfully for docId:", docId);
        } else {
            console.log("Agent found, no docId provided");
        }

        return foundAgent;

    } catch (error) {
        console.error("Error fetching agent data:", error);
        return null;
    }
}