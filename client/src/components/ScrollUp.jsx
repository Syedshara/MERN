import { useLocation } from "react-router-dom"
import { useEffect } from "react"

const ScrollUp = () => {
    const pathname = useLocation().pathname;
    const location = useLocation()
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const getTag = params.get('tag')
        if (getTag) {
            window.scrollTo(0, 0);
        }
    }, [location.search])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return (
        null
    )
}

export default ScrollUp