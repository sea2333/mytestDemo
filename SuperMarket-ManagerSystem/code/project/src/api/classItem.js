import req from '@/utils/request';


export function showClassItem(){
    return req.get('/classItem/showClassItem');
}
export function deleteClassItem( params ){
    return req.post('/classItem/deleteClassItem', params);
}
export function addClassItem( params ){
    return req.post('/classItem/addClassItem', params);
}

