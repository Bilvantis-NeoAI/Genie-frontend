import { useRef, useState } from "react";

const MouseEvents = ({ children }) => {
    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const moveX = e.clientX - startX;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollLeft - moveX;
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
        if (scrollContainerRef.current) {
            setScrollLeft(scrollContainerRef.current.scrollLeft);
        }
    };
    return children({
        scrollContainerRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        isDragging,
    });
};
export default MouseEvents;
