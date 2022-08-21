const permission = () => {

    if (!localStorage.getItem("permission")) {
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
        case "user":
        case "1":
            return 1;
        default:
         return 0;
    }

};

export default permission;
