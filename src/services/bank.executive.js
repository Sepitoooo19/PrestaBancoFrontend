import httpClient from '../http-common';

const getDebtsByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/executives/${rut}/debts`);
}



const getEmploymentHistoryByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/executives/${rut}/employment-history`);
}

const getBankAccountByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/executives/${rut}/client-bank-account`);
}

const getDepositInBankAccountByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/executives/${rut}/deposit`);
}

const getWithdrawalInBankAccountByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/executives/${rut}/withdrawal`);
}

const getExpectedAmountOfClientByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/executives/${rut}/amount`);
}

const getInteresRateOfClientByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/executives/${rut}/interest`);
}

const getTimeLimitOfClientByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/executives/${rut}/time`);
}

const getMonthlyLoanOfClientByRut = (rut) => {
    return httpClient.get(`http://localhost:8090/api/executives/${rut}/monthly-loan`);
}

export default { 
    getDebtsByRut, 
    getEmploymentHistoryByRut, 
    getBankAccountByRut, 
    getDepositInBankAccountByRut,
    getWithdrawalInBankAccountByRut, 
    getExpectedAmountOfClientByRut, 
    getInteresRateOfClientByRut, 
    getTimeLimitOfClientByRut, 
    getMonthlyLoanOfClientByRut };