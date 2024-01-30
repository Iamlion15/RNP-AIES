


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
                icon: <i className="bi bi-collection mx-2"></i>,
                link: ""
            },
            {
                title: "Police officers",
                icon: <i className="bi bi-collection mx-2"></i>,
                link: ""
            },
            {
                title: "List of questions",
                icon: <i className="bi bi-clipboard-x mx-2"></i>,
                link: ""
            },
            {
                title: "Questions",
                icon: <i className="bi bi-question-circle mx-2"></i>,
                link: ""
            },
        ]
    },
    OFFICER: {
        items: [
            {
                ...defaultItem,
                link: ""
            },
            {
                title: "Review scene",
                icon: <i className="bi bi-binoculars-fill mx-2"></i>,
                link: ""
            },
            {
                title: "Complete review",
                icon: <i className="bi bi-chat-left-fill mx-2"></i>,
                link: ""
            },
            {
                title: "CASES",
                icon: <i className="bi bi-receipt-cutoff mx-2"></i>,
                link: ""
            },
        ]
    },
    CITIZEN: {
        items: [
            {
                ...defaultItem,
                link: ""
            },
            {
                title: "Pending cases",
                icon: <i className="bi bi-circle-square mx-2"></i>,
                link: ""
            },
            {
                title: "Complete cases",
                icon: <i class="bi bi-clipboard-check mx-2"></i>,
                link: ""
            },
            {
                title: "Police decisions",
                icon: <i className="bi bi-back mx-2"></i>,
                link: ""
            },
        ]
    }, 
}

const getSidebarItems=(role)=>{
    return SidebarItems[role].items || []
}

export default getSidebarItems;