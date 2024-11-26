'use client';

import React from 'react';
import { firestore, collection, doc, writeBatch } from '@/firebase/firebaseConfig'; // Import Firestore methods

function AboutPage() {

    // const addToursData = async () => {
    //     const toursData = [
    //         { value: "", label: "Select Tour" },
    //         { value: "Adventure", label: "Adventure", models: ["Mountain", "Desert", "Ice"] },
    //         { value: "Wildlife", label: "Wildlife", models: ["Jungle Safari", "Rain Forest", "Zoo"] },
    //         { value: "Other", label: "Other" },
    //     ];

    //     // Replace empty values with 'default'
    //     const filteredToursData = toursData.map(tour => ({
    //         ...tour,
    //         value: tour.value || "default",
    //     }));

    //     try {
    //         const batch = writeBatch(firestore); // Write batch instance for Firestore

    //         filteredToursData.forEach(tour => {
    //             const docRef = doc(collection(firestore, "category"), tour.value); // Get Firestore document reference
    //             batch.set(docRef, tour); // Add to batch
    //         });

    //         await batch.commit(); // Commit the batch to Firestore
    //         console.log("Tours data successfully added to Firestore!");
    //     } catch (error) {
    //         console.error("Error adding tours data: ", error);
    //     }
    // };

    return (
        <div className='layout'>
            
        </div>
    );
}

export default AboutPage;
