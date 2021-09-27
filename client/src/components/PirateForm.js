import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Row, Col, Input, Label } from "reactstrap";
import axios from 'axios';
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const initialState = {
    name:"",
    imageUrl:"",
    numberTreasures:0,
    catchPhrase:"",
    crewPosition:"Capitan",
    pegLeg:true,
    eyePatch:true,
    hookHand:true
}

const initialErrors = {
    name:"",
    imageUrl:"",
    numberTreasures:"",
    catchPhrase:"",
    crewPosition:"",
    pegLeg:"",
    eyePatch:"",
    hookHand:""
}



const CreatePirate = () => {

    const history = useHistory();
    const [pirates, setPirates] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const actualizarInputsForm = (e) => {
        const { name, value, checked, type } = e.target;
        setPirates({
            ...pirates,
            [name]: (type==='checkbox' || type==='radio')? checked: value
        })
    }

    const guardarPirata = (e) => {
        e.preventDefault();
            axios.post('http://localhost:8000/api/new', pirates)
                .then(resp => {
                    console.log('RESP', resp);
                    Swal.fire('Pirata se ha unido a la tripulacion!', '', 'success')
                    setPirates(initialState);
                    setErrors(initialErrors);
                })
                .catch( err => {
                    console.log(err);
                    for(let field in err.response.data.errors) {
                        setErrors({
                            ...errors,
                            [field]: err.response.data.errors[field].message
                        });
                    }
                });
            }

    useEffect(()=> {
        console.log(pirates);
    },[pirates])



    return(
        <>        
            <Row>
                <Col xs={4}>
                    <h1>Agregar Pirata</h1>
                </Col>
                <Col xs={3}>
                    <Button onClick={e => history.push('/pirates')}>Ver Tripulacion</Button>
                </Col>
            </Row>
            <Form onSubmit={ guardarPirata }>
                <Row>
                    <Col xs={3}>
                        <FormGroup>
                            <Label>Nombre Pirata</Label>
                            <Input type="text" name='name' value={pirates.name} onChange={actualizarInputsForm} required/>
                            {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={3}>
                        <FormGroup>
                            <Label>Posicion en el Barco</Label>
                            <Input type="select" name='crewPosition' value={pirates.crewPosition} onChange={actualizarInputsForm} required>
                                <option>Capitan</option>
                                <option>Primer Oficial</option>
                                <option>Maestro de Cuarto</option>
                                <option>Contramaestre</option>
                                <option>Encargado de la Polvora</option>
                            </Input>
                            {errors.crewPosition && <span style={{color: 'red'}}>{errors.crewPosition}</span>}
                        </FormGroup>
                    </Col>
                </Row>
                    <Col xs={3}>
                        <FormGroup>
                            <Label>Url Imagen</Label>
                            <Input type="text" name='imageUrl' value={pirates.imageUrl} onChange={actualizarInputsForm}  required/>
                            {errors.imageUrl && <span style={{color: 'red'}}>{errors.imageUrl}</span>}
                        </FormGroup>
                    </Col>                 
                <Row>
                    <Col xs={1}>
                        <FormGroup>
                            <Label># de Tesoros</Label>
                            <Input type="number" name='numberTreasures' value={pirates.numberTreasures} onChange={actualizarInputsForm} required/>
                            
                        </FormGroup>
                    </Col>
                    {errors.numberTreasures && <span style={{color: 'red'}}>{errors.numberTreasures}</span>}
                </Row>
                <Row>
                    <Col xs={3}>
                        <FormGroup>
                            <Label>Frase Tipica Pirata</Label>
                            <Input type="text" name='catchPhrase' value={pirates.catchPhrase} onChange={actualizarInputsForm} required/>
                            {errors.catchPhrase && <span style={{color: 'red'}}>{errors.catchPhrase}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={3}>
                        <FormGroup>
                            <Input type="checkbox" name='pegLeg' checked={pirates.pegLeg} onChange={actualizarInputsForm} required={pirates.pegLeg!==null?false:true}/>
                            <Label>Pata de Palo</Label>
                            {errors.pegLeg && <span style={{color: 'red'}}>{errors.pegLeg}</span>}
                        </FormGroup>

                        <FormGroup>
                            <Input type="checkbox" name='eyePatch' checked={pirates.eyePatch} onChange={actualizarInputsForm} required={pirates.eyePatch!==null?false:true}/>
                            <Label>Parche en el Ojo</Label>
                            {errors.eyePatch && <span style={{color: 'red'}}>{errors.eyePatch}</span>}
                        </FormGroup>

                        <FormGroup>
                            <Input type="checkbox" name='hookHand' checked={pirates.hookHand} onChange={actualizarInputsForm} required={pirates.hookHand!==null?false:true}/>
                            <Label>Mano de Garfio</Label>
                            {errors.hookHand && <span style={{color: 'red'}}>{errors.hookHand}</span>}
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit">Agregar Pirata</Button>
            </Form>
        </>
    )
}

export default CreatePirate;