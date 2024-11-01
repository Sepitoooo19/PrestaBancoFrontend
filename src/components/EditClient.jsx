import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clientService from '../services/client.service';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SaveIcon from '@mui/icons-material/Save';

const EditClient = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({});
    const [selectedField, setSelectedField] = useState('');
    const [error, setError] = useState(null);
    const [fieldValue, setFieldValue] = useState('');

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await clientService.get(clientId);
                setClient(response.data);
                setFieldValue(response.data.name);
            } catch (error) {
                setError('Error fetching client: ' + error.message);
            }
        };
    
        if (clientId) {
            fetchClient();
        } else {
            setError('Client ID is undefined');
        }
    }, [clientId]);

    const handleFieldChange = (e) => {
        setSelectedField(e.target.value);
        setFieldValue(client[e.target.value]);
    };

    const handleFieldValueChange = (e) => {
        setFieldValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedClient = { ...client, [selectedField]: fieldValue };
            await clientService.updateById(clientId, updatedClient);
            navigate('/client/list');
        } catch (error) {
            setError('Error updating client: ' + error.message);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!client) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
            <h2>Edit Client</h2>
            <FormControl fullWidth margin="normal">
                <InputLabel>Select Field to Edit</InputLabel>
                <Select value={selectedField} onChange={handleFieldChange}>
                    <MenuItem value=""><em>Select a field</em></MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="rut">RUT</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                    <MenuItem value="age">Age</MenuItem>
                    <MenuItem value="monthly_salary">Monthly Salary</MenuItem>
                    <MenuItem value="personal_savings">Personal Savings</MenuItem>
                    <MenuItem value="job_type">Job Type</MenuItem>
                    <MenuItem value="expected_amount">Expected Amount</MenuItem>
                    <MenuItem value="time_limit">Time Limit</MenuItem>
                    <MenuItem value="interest_rate">Interest Rate</MenuItem>
                    <MenuItem value="type_loan">Type of Loan</MenuItem>
                    <MenuItem value="independent_activity">Independent Activity</MenuItem>
                    <MenuItem value="job_seniority">Job Seniority</MenuItem>
                    <MenuItem value="actual_job">Actual Job</MenuItem>
                </Select>
            </FormControl>

            {selectedField && (
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label={selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}
                        value={fieldValue}
                        onChange={handleFieldValueChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                        Update {selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}
                    </Button>
                </form>
            )}
        </Box>
    );
};

export default EditClient;
