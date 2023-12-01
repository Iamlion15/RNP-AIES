


const defaultItem = { title: 'Dashboard', icon: <i className="bi bi-menu-button-wide mx-2"></i> };

const SidebarItems = {
    ADMIN: {
        items: [
            {
                ...defaultItem,
                icon: <i className="bi bi-view-stacked mx-2"></i>,
                link: ""
            },
            {
                title: "Add officer",
                icon: <i class="bi bi-collection mx-2"></i>,
                link: ""
            },
            {
                title: "Police officers",
                icon: <i class="bi bi-collection mx-2"></i>,
                link: ""
            },
            {
                title: "Messages",
                icon: <i className="bi bi-envelope mx-2"></i>,
                link: ""
            },
        ]
    },
    EBS: {
        items: [
            {
                ...defaultItem,
                link: ""
            },
            {
                title: "Review Requests",
                icon: <i class="bi bi-binoculars-fill mx-2"></i>,
                link: ""
            },
            {
                title: "Feedback",
                icon: <i class="bi bi-chat-left-fill mx-2"></i>,
                link: ""
            },
            {
                title: "Vendors",
                icon: <i class="bi bi-receipt-cutoff mx-2"></i>,
                link: ""
            },
        ]
    },
    RSB: {
        items: [
            {
                ...defaultItem,
                link: ""
            },
            {
                title: "Review Applications",
                icon: <i class="bi bi-binoculars-fill mx-2"></i>,
                link: ""
            },
        ]
    }, 
    RICA: {
        items: [
            {
                ...defaultItem,
                link: ""
            },
            {
                title: "Review Applications",
                icon: <i class="bi bi-binoculars-fill mx-2"></i>,
                link: ""
            },
        ]
    }

}

const getSidebarItems=(role)=>{
    return SidebarItems[role].items || []
}

export default getSidebarItems;