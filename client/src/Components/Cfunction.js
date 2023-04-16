export function ctimeSince(date) {


    // const datetime = new Date(date)
    // const inSeconds = datetime.getTime()


    var aDay = 24 * 60 * 60 * 1000;

    const dates = new Date(date)

    var seconds = Math.floor((dates - new Date()  ) / 1000);
    //console.log(seconds)

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}



