import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Row, Col } from 'reactstrap';
import {
    Card, CardText, CardBody,
    CardTitle
  } from 'reactstrap';

const PirateDetail = () => {

    let { id } = useParams();
    const [pirates, setPirates] = useState({});

    useEffect(() => {
        console.log(id); 
        axios.get(`http://localhost:8000/api/pirate/${id}`)
            .then(res => setPirates(res.data))
            .catch(err=>console.log(err))         
    }, [])

    
    
    return(
        <> 
             <Col xs={10}>
                    <Card>
                        <Row>
                            <CardTitle tag="h1">{pirates.name}</CardTitle>
                        </Row>
                        <Row>
                        <Col xs={4}>
                            <img width="100%" src={pirates.imageUrl} alt="Card cap" />
                            <CardText tag="h2">"{pirates.catchPhrase}"</CardText>
                        </Col>
                        <Col xs={8}>
                            <CardBody>
                                <CardTitle tag="h3">Acerca de:</CardTitle>
                            </CardBody>
                            <CardBody tag="h5">
                                <CardText>Posicion en el barco: {pirates.crewPosition}</CardText>
                                <CardText>Tesoros: {pirates.numberTreasures}</CardText>
                                {pirates.pegLeg===true?<CardText>Pata de palo: Si</CardText>:
                                <CardText>Pata de palo: No</CardText>}
                                {pirates.eyePatch===true?<CardText>Parche en el ojo: Si</CardText>:
                                <CardText>Parche en el ojo: No</CardText>}
                                {pirates.hookHand===true?<CardText>Mano de garfio: Si</CardText>:
                                <CardText>Mano de garfio: No</CardText>}
                            </CardBody>
                        </Col>
                        </Row>
                    </Card>
                </Col>
        </>
    )
}

export default PirateDetail;