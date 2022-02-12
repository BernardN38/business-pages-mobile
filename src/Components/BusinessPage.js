import React from 'react'
import ControlledCarousel from "./Carousel";
import BusinessHeader from "./BusinessHeader";
import BusinessTabs from "./BusinessTabs.js"
function BusinessPage() {
    return (
        <div>
            <ControlledCarousel />
            <BusinessHeader />
            <BusinessTabs />
        </div>
    )
}

export default BusinessPage