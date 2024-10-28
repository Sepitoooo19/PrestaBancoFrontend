import { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import clientService from "../services/client.service";
import bankExecutiveService from "../services/bank.executive";

const CreditSimulation = () => {
    const [rut, setRut] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [timeLimit, setTimeLimit] = useState("");
    const [expectedAmount, setExpectedAmount] = useState("");
    const [monthlyLoan, setMonthlyLoan] = useState("");

    const handleRutChange = (e) => {
        const newRut = e.target.value;
        setRut(newRut);

        if (newRut) {
            bankExecutiveService.getInteresRateOfClientByRut(newRut)
                .then(response => setInterestRate(response.data))
                .catch(error => console.error("Error al obtener el interest rate", error));

                bankExecutiveService.getTimeLimitOfClientByRut(newRut)
                .then(response => setTimeLimit(response.data))
                .catch(error => console.error("Error al obtener el time limit", error));

                bankExecutiveService.getExpectedAmountOfClientByRut(newRut)
                .then(response => setExpectedAmount(response.data))
                .catch(error => console.error("Error al obtener el expected amount", error));
        }
    };

    const calculateMonthlyLoan = () => {
        bankExecutiveService.getMonthlyLoanOfClientByRut(rut)
            .then(response => setMonthlyLoan(response.data))
            .catch(error => console.error("Error al calcular el monthly loan", error));
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: "auto" }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Solicitud de Crédito
            </Typography>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="RUT"
                    variant="outlined"
                    value={rut}
                    onChange={handleRutChange}
                />
                <TextField
                    label="Interest Rate"
                    variant="outlined"
                    value={interestRate}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label="Time Limit"
                    variant="outlined"
                    value={timeLimit}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label="Expected Amount"
                    variant="outlined"
                    value={expectedAmount}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label="Monthly Loan"
                    variant="outlined"
                    value={monthlyLoan}
                    InputProps={{ readOnly: true }}
                />
                <Button variant="contained" color="primary" onClick={calculateMonthlyLoan}>
                    Calcular Monthly Loan
                </Button>
            </Box>
        </Paper>
    );
};

export default CreditSimulation;
