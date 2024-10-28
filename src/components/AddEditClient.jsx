import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clientService from "../services/client.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

const AddEditClient = () => {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [monthly_salary, setMonthlySalary] = useState("");
  const [personal_savings, setPersonalSavings] = useState("");
  const [job_type, setJobType] = useState("");
  const [expected_amount, setExpectedAmount] = useState("");
  const [time_limit, setTimeLimit] = useState("");
  const [interest_rate, setInterestRate] = useState("");
  const [type_loan, setTypeLoan] = useState("");
  const [independent_activity, setIndependentActivity] = useState(false);
  const [job_seniority, setJobSeniority] = useState("");
  const [actual_job, setActualJob] = useState("");

  const { rut: paramRut } = useParams();
  const [titleclientForm, setTitleclientForm] = useState("");
  const [selectedField, setSelectedField] = useState("name");
  const navigate = useNavigate();

  const saveClient = (e) => {
    e.preventDefault();
    const client = { rut };
    client[selectedField] = eval(selectedField);

    if (paramRut) {
      clientService
        .update(paramRut, client)
        .then((response) => {
          console.log("Cliente actualizado.", response.data);
          navigate("/client/list");
        })
        .catch((error) => {
          console.log("Error al actualizar el cliente.", error);
        });
    }
  };

  useEffect(() => {
    if (paramRut) {
        setTitleclientForm("Editar Cliente");
        clientService
            .getByRut(paramRut)
            .then((client) => {
                setRut(client.data.rut);
                setName(client.data.name);
                setEmail(client.data.email);
                setPhone(client.data.phone);
                setAge(client.data.age);
          setMonthlySalary(client.data.monthly_salary);
          setPersonalSavings(client.data.personal_savings);
          setJobType(client.data.job_type);
          setExpectedAmount(client.data.expected_amount);
          setTimeLimit(client.data.time_limit);
          setInterestRate(client.data.interest_rate);
          setTypeLoan(client.data.type_loan);
          setIndependentActivity(client.data.independent_activity);
          setJobSeniority(client.data.job_seniority);
          setActualJob(client.data.actual_job);
        })
        .catch((error) => {
          console.log("Error al cargar el cliente.", error);
        });
    } else {
      setTitleclientForm("Nuevo Cliente");
    }
  }, [paramRut]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" component="form">
      <h3>{titleclientForm}</h3>
      <hr />

      <FormControl fullWidth>
        <TextField
          select
          label="Seleccionar Campo para Editar"
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <MenuItem value="name">Nombre</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="phone">Teléfono</MenuItem>
          <MenuItem value="age">Edad</MenuItem>
          <MenuItem value="monthly_salary">Salario Mensual</MenuItem>
          <MenuItem value="personal_savings">Ahorros Personales</MenuItem>
          <MenuItem value="job_type">Tipo de Trabajo</MenuItem>
          <MenuItem value="expected_amount">Monto Esperado</MenuItem>
          <MenuItem value="time_limit">Plazo</MenuItem>
          <MenuItem value="interest_rate">Tasa de Interés</MenuItem>
          <MenuItem value="type_loan">Tipo de Préstamo</MenuItem>
          <MenuItem value="independent_activity">Actividad Independiente</MenuItem>
          <MenuItem value="job_seniority">Antigüedad Laboral</MenuItem>
          <MenuItem value="actual_job">Trabajo Actual</MenuItem>
        </TextField>
      </FormControl>

      <FormControl fullWidth>
        {selectedField === "name" && (
          <TextField label="Nombre" value={name} variant="standard" onChange={(e) => setName(e.target.value)} />
        )}
        {selectedField === "email" && (
          <TextField label="Email" value={email} variant="standard" onChange={(e) => setEmail(e.target.value)} />
        )}
        {selectedField === "phone" && (
          <TextField label="Teléfono" value={phone} variant="standard" onChange={(e) => setPhone(e.target.value)} />
        )}
        {selectedField === "age" && (
          <TextField label="Edad" type="number" value={age} variant="standard" onChange={(e) => setAge(e.target.value)} />
        )}
        {selectedField === "monthly_salary" && (
          <TextField label="Salario Mensual" type="number" value={monthly_salary} variant="standard" onChange={(e) => setMonthlySalary(e.target.value)} />
        )}
        {selectedField === "personal_savings" && (
          <TextField label="Ahorros Personales" type="number" value={personal_savings} variant="standard" onChange={(e) => setPersonalSavings(e.target.value)} />
        )}
        {selectedField === "job_type" && (
          <TextField label="Tipo de Trabajo" value={job_type} variant="standard" onChange={(e) => setJobType(e.target.value)} />
        )}
        {selectedField === "expected_amount" && (
          <TextField label="Monto Esperado" type="number" value={expected_amount} variant="standard" onChange={(e) => setExpectedAmount(e.target.value)} />
        )}
        {selectedField === "time_limit" && (
          <TextField label="Plazo" type="number" value={time_limit} variant="standard" onChange={(e) => setTimeLimit(e.target.value)} />
        )}
        {selectedField === "interest_rate" && (
          <TextField label="Tasa de Interés" type="number" value={interest_rate} variant="standard" onChange={(e) => setInterestRate(e.target.value)} />
        )}
        {selectedField === "type_loan" && (
          <TextField
            label="Tipo de Préstamo"
            value={type_loan}
            select
            variant="standard"
            onChange={(e) => setTypeLoan(e.target.value)}
          >
            <MenuItem value={"Primera Vivienda"}>Primera Vivienda</MenuItem>
            <MenuItem value={"Segunda Vivienda"}>Segunda Vivienda</MenuItem>
            <MenuItem value={"Propiedades Comerciales"}>Propiedades Comerciales</MenuItem>
            <MenuItem value={"Remodelación"}>Remodelación</MenuItem>
          </TextField>
        )}
        {selectedField === "independent_activity" && (
          <TextField
            label="Actividad Independiente"
            type="checkbox"
            checked={independent_activity}
            variant="standard"
            onChange={(e) => setIndependentActivity(e.target.checked)}
          />
        )}
        {selectedField === "job_seniority" && (
          <TextField label="Antigüedad Laboral" type="number" value={job_seniority} variant="standard" onChange={(e) => setJobSeniority(e.target.value)} />
        )}
        {selectedField === "actual_job" && (
          <TextField label="Trabajo Actual" value={actual_job} variant="standard" onChange={(e) => setActualJob(e.target.value)} />
        )}
      </FormControl>

      <FormControl>
        <br />
        <Button variant="contained" color="info" onClick={(e) => saveClient(e)} startIcon={<SaveIcon />}>
          Guardar
        </Button>
      </FormControl>

      <hr />
      <Link to="/client/list">Volver a la Lista</Link>
    </Box>
  );
};

export default AddEditClient;
