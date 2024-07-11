import { useLocation } from "react-router-dom"
import { useEffect } from "react"

const ScrollUp = () => {
    const pathname = useLocation().pathname;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return (
        null
    )
}

export default ScrollUp