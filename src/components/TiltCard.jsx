import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const ROTATION_RANGE = 20; // Max rotation in degrees
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export default function TiltCard({ children, className = '', onClick }) {
    const ref = useRef(null);

    // Motion values for mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth movement
    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    // Map mouse position to rotation
    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1; // Invert X for natural tilt
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                transform,
            }}
            className={`relative h-full w-full rounded-[2rem] bg-slate-50 dark:bg-slate-900 transition-colors hover:shadow-2xl hover:shadow-indigo-500/20 ${className}`}
        >
            <div
                style={{
                    transform: 'translateZ(50px)',
                    transformStyle: 'preserve-3d',
                }}
                className="h-full w-full rounded-[2rem] glass p-1"
            >
                {children}
            </div>
        </motion.div>
    );
}
