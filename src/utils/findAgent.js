import { database } from "@/firebase/firebaseConfig";
import { get, ref, set } from "firebase/database";

export async function findAgentByAgentCode(agentCode, docId) {
    try {

        // Reference to the agents node
        const agentsRef = ref(database, 'agents');
        const snapshot = await get(agentsRef);

        if (!snapshot.exists()) {
            console.log("No agents data found.");
            return null;
        }

        // Loop through agents to find one with the matching agentCode
        let foundAgent = null;
        snapshot.forEach(agentSnapshot => {
            const agent = agentSnapshot.val();
            if (agent.agentCode === agentCode) {
                foundAgent = agent;
                return true; // Found the agent, exit loop
            }
        });

        if (foundAgent) {

            console.log(foundAgent);
            const dbRef = ref(database, `agents/${foundAgent.uid}/agentTours/${docId}`);
            await set(dbRef, {
                tourId: docId,
            });

            console.log(dbRef);

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