import BaseService from './baseService';

export function signup(data) {
    return BaseService.post('/signup', data);
}
export function getUsers() {
    return BaseService.get('/signup');
}
export function login(data) {
    return BaseService.post('/login', data);
}
export function boards(data) {
    return BaseService.post('/boards', data);
}
export function boardsname(id) {
    return BaseService.get("/" + id + '/boards');
}
export function allboards(id) {
    return BaseService.get("/" + id + '/allboards');
}

export function boardname(id) {
    return BaseService.get('/board/' + id);
}
export function teams(data) {
    return BaseService.post('/teams', data);
}
export function teamsname(id) {
    return BaseService.get(id + '/teams');
}

export function tboardname(iduser, idteams) {
    return BaseService.get('/' + iduser + '/teamboard/' + idteams);
}
export function teamboards(data) {
    return BaseService.post('/teamboards', data);
}
export function teamboardsname(id) {
    return BaseService.get("/" + id + '/teamboards');
}
export function editteamboards(idboards, idteams) {

    return BaseService.put("/" + idboards + '/editteamboards/' + idteams);
}

export function lists(data) {
    return BaseService.post('/lists', data);
}
export function listname(id) {

    return BaseService.get("/" + id + '/lists');
}
export function alllistname(id) {
    return BaseService.get("/" + id + '/alllists');
}

export function cards(data) {
    return BaseService.post('/cards', data);
}
export function deletecards(id) {
    return BaseService.delete('/'+id+'/cardsdel');
}

export function cardsname(id) {
    return BaseService.get("/" + id + '/cards');
}
export function editdcardsname(idlists, idcards) {
    
    return BaseService.put("/" + idlists + '/editcards/' + idcards);
}
export function AddComment(data) {  
    return BaseService.post("/cardscomment",data);
}
export function fetchCardComments(id) {
    
    return BaseService.get("/"+id+"/cardcomments");
}
export function fetchCardDetails(id) {
    return BaseService.get("/"+id+"/carddetails");
}
export function AddDesc(data) {
   
    return BaseService.post("/cardsdesc",data);
}
export function EditDesc(data) {
   
    return BaseService.post("/cardseditdesc",data);
}
export function archiveCard(id) {
   
    return BaseService.post("/"+id+"/archivecard");
}
export function stbCard(id) {
   
    return BaseService.post("/"+id+"/sendtb");
}
export function deletecomm(id) {
   
    return BaseService.delete("/"+id+"/delcomt");
}
