const getClassName = (learningStage,className) =>{
    switch(learningStage){
        case "Not Started":
            return className += " border-danger"
            break;
        case "Started":
            return className += " border-light"
            break;
        case "Partially Completed":
            return className += " border-primary"
            break;
        case "Fully Completed":
            return className += " border-danger"
            break;
    }
}

export default getClassName;