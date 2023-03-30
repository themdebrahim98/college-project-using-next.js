export const getOrdinals=(props)=>{
    
    return props + (props > 0 ? ['th', 'st', 'nd', 'rd'][(props > 3 && props < 21) || props % 10 > 3 ? 0 : props % 10] : '');
}