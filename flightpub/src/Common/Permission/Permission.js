const permission = () => {
    if (localStorage.getItem("permission") === null) {
        return 0;
    }
    switch (localStorage.getItem("permission")) {
        case "admin":
            return 4;
        case "agent":
            return 3;
        case "staff":
            return 2;
        default:
            return 1;
    }
};

export default permission;