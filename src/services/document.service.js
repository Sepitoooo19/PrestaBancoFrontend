import httpClient from '../http-common';

const getDocumentsByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/v1/document/client/${rut}/documents`);
}

export default { 
    getDocumentsByRut, 
};