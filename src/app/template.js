"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);

    // Update children on route change
    useEffect(() => {
        setDisplayChildren(children);
        window.scrollTo(0, 0);
    }, [children]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                    willChange: "opacity, transform",
                    transformOrigin: "center",
                }}
            >
                {displayChildren}
            </motion.div>
        </AnimatePresence>
    );
}
