export const publicType = (type: string): string => {
        switch (type) {
            case 'express':
                return 'bg-yellow-400/10 text-yellow-400';
            case 'normal':
                return 'bg-blue-400/10 text-blue-400';
            case 'vip':
                return 'bg-purple-400/10 text-purple-400';
            default:
                return 'bg-gray-400';
        }
    };

export const publicStatus = (status : string) => {
    switch(status) {
        case "ontime":
            return "bg-green-900/50 text-green-400";
        case "delayed":
            return "bg-yellow-900/50 text-yellow-400";
        case "cancelled":
            return "bg-red-900/50 text-red-400";
    }
}

export const publicEmojis = (status : string) => {
    switch(status) {
        case "ontime":
            return "fa-check-circle";
        case "delayed":
            return "fa-clock";
        case "cancelled":
            return "fa-circle-xmark";
    }
}


export const statusEnglish = (status : string) => {
    switch(status) {
        case "ontime":
            return "On Time";
        case "delayed":
            return "Delayed";
        case "cancelled":
            return "Cancelled";
    }
}

export const statusSwahili = (status : string) => {
    switch(status) {
        case "ontime":
            return "Kwa wakati";
        case "delayed":
            return "Imechelewa";
        case "cancelled":
            return "Imeahirishwa";
    }
}