export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] === null || b[orderBy] === undefined) {
        return -1;
    }
    if (a[orderBy] === null || a[orderBy] === undefined) {
        return 1;
    }
    return b[orderBy].localeCompare(a[orderBy], undefined, {
        numeric: true,
        sensitivity: "base",
    });
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
