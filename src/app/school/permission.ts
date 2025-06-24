interface SchoolPermission {
    create: () => void,
    edit: () => void,
    delete: () => void,
    publish: () => void,
    view: () => void,
}

// Now every class will have to implement interface they don't need
// class Teacher implements SchoolPermission{
//     create () {
//         throw new Error("Not Allowed");
//     }
//     edit () {
//         console.log("Can edit Student");
//     }
//     delete() {
//         throw new Error("Not Allowed");
//     }
//     publish () {
//         console.log("Can publish Result");
//     }
//     view () {
//         console.log("Can View Result");
//     }
// }

// ✅ Good Design (Applies ISP)

// 1. Split Interfaces

interface CreatePermission {
    create: () => void,
}

interface EditPermission {
    edit: () => void,
}

interface DeletePermission {
    delete: () => void,
}

interface PublishPermission {
    publish: () => void,
}

interface ViewPermission {
    view: () => void,
}

// 2. Implement only interface you need

class Teacher implements EditPermission, PublishPermission, ViewPermission{
    edit () {
        console.log("Can edit Student");
    }
    publish () {
        console.log("Can publish Result");
    }
    view () {
        console.log("Can View Result");
    }
}