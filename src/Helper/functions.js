import Swal from "sweetalert2";
export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
export const getOrdinals = (props) => {

    return props + (props > 0 ? ['th', 'st', 'nd', 'rd'][(props > 3 && props < 21) || props % 10 > 3 ? 0 : props % 10] : '');
}

export const getSemesterByYear = (props) => {
    const SemesterArray = [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10],
        [11, 12],
        [13, 14],
        [15, 16],
        [17, 18],
        [19, 20],
    ];

    return SemesterArray[props - 1];
}