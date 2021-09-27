import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import {
    Card, CardBody, CardLink,
    CardTitle
  } from 'reactstrap';
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const PirateList = () => {

    const history = useHistory();
    const [pirates, setPirates] = useState([]);
    const [refresh, setRefresh] = useState(0)

    useEffect (() => {
        axios.get('http://localhost:8000/api/pirate')
            .then(resp => setPirates(resp.data))
            .catch(err=>console.log(err))
    },[refresh])

    
    const eliminarPirata = (p) => {
        console.log(pirates);
        Swal.fire({
            title: 'Eliminar Pirata',
            text: 'Esta seguro que de sea eliminar este grandioso corsario?',
            confirmButtonText: 'A la plancha!!',
            cancelButtonText: 'No',
            showCancelButton: true,
            icon: 'warning'
        })
        .then(res => {
            if(res.value){
                axios.delete(`http://localhost:8000/api/pirate/${p._id}`)
                .then(res => {
                    Swal.fire('Pirata arrojado por la borda','','success')
                    .then(res => setRefresh(refresh+1))
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            }
        })
    }



    return(
        <>
            <Row>
                <Col xs={4}>
                    <h1>Tripulacion Pirata</h1>
                </Col>
                <Col xs={3}>
                    <Button onClick={e => history.push('/pirate/new')}>Crear Nuevo Pirata</Button>
                </Col>
            </Row>
            {pirates.map((p, i) => (              
                <Col xs={6} key={i}>
                    <Card>
                        <Row>
                        <Col xs={4}>
                            <img width="100%" src={p.imageUrl} alt="Card cap" />
                        </Col>
                        <Col xs={8}>
                            <CardBody>
                                <CardTitle tag="h1">{p.name}</CardTitle>
                            </CardBody>
                            <CardBody>
                                <CardLink><Link to={`/pirate/${p._id}`}><Button>Ver Pirata</Button></Link></CardLink>
                                <CardLink><Button onClick={e => eliminarPirata(p)}>Caminar por la Plancha</Button></CardLink>
                            </CardBody>
                        </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </>
    )
}

export default PirateList;