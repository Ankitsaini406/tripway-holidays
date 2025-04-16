"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Template({ children }) {
    const [displayChildren, setDisplayChildren] = useState(children);
    const container = useRef();

    // Animate on children key change (page transition)
    useGSAP(() => {
        if (children.key !== displayChildren.key) {
            const tl = gsap.timeline({
                defaults: { duration: 0.6, ease: "power2.inOut" }
            });

            tl.to(container.current, {
                opacity: 0,
                y: 50,
                scale: 0.95,
                pointerEvents: "none",
            }).add(() => {
                setDisplayChildren(children);
                window.scrollTo(0, 0);
            })
            .fromTo(
                container.current,
                {
                    opacity: 0,
                    y: -50,
                    scale: 0.95,
                    pointerEvents: "none",
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    pointerEvents: "auto",
                }
            );
        }
    }, [children]);

    // Initial load animation
    useGSAP(() => {
        gsap.fromTo(
            container.current,
            {
                opacity: 0,
                y: 20,
                scale: 0.98,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
            }
        );
    }, []);

    return (
        <div
            ref={container}
            style={{
                opacity: 0,
                transformOrigin: "center",
                transition: "opacity 0.3s ease-out",
                willChange: "opacity, transform",
            }}
        >
            {displayChildren}
        </div>
    );
}
