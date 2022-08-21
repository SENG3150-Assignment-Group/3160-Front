const permission = () => {
    console.log(localStorage.getItem('permission'));
    if (localStorage.getItem("permission") === null) {
        return 0;
    }
    switch (localStorage.getItem("permission")) {
        case "admin":
        case "4":
            return 4;
        case "agent":
        case "3":
            return 3;
        case "staff":
        case "2":
            return 2;
        default:
            return 1;
    }
};

export default permission;