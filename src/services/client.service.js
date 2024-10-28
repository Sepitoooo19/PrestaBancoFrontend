import httpClient from '../http-common';

const getAll = () => {
    return httpClient.get("http://localhost:8090/api/v1/client");
}

const create = data => {
    return httpClient.post("http://localhost:8090/api/v1/client/new", data);
}

const get = id => {
    return httpClient.get(`http://localhost:8090/api/v1/client/client_id/${id}`);
}

const getByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/v1/client/rut/${rut}`);
};

const updateByRut = (rut, data) => {
    return httpClient.put(`http://localhost:8090/api/v1/client/clients/${rut}`, data);
};

export default { getAll, create, get, updateByRut, getByRut };