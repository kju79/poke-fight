import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import BG from '../img/background.png';
import a1 from '../img/1.jpg';
import a2 from '../img/2.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Pokemondetails = () => {
  const { id } = useParams();
  console.log(id);
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch(`https://pokefight-wbs.herokuapp.com/pokemon/${id}`)
      .then(res => res.json())
      .then(data => setDetails(data))
      .catch(err => console.log(err.message));
  }, [id]);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

  const classes = useStyles();

  return (
    <>
      <div>Info one Pokemon</div>
      
      
      
      {details ? (
        <>
          
          <Card className={classes.root}>
      <CardActionArea>        
        <CardContent>
        <div id="pokeShowcase"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`} ALT="pokemon"/></div>
        <div>ID: {details.id}</div>
          <p />
          <div>
            <b>Name:</b>
            {Object.keys(details.name).map(key => (
              <div>
                {key}: {details.name[key]}
              </div>
            ))}
          </div>
          <p />
          <div>
            <b>Type:</b>{" "}
            {details.type.map(element => {
              return <div>{element}</div>;
            })}
          </div>
          <p />
          <div>
            <b>Base</b>:
            {Object.keys(details.base).map(key => (
              <div>
                {key}: {details.base[key]}
              </div>
            ))}
          </div>
        
      
        </CardContent>
      </CardActionArea>
    </Card>
    </>
    ) : (
      <>
        <p />
        <div>Sorry - no info to display. Go catch 'em</div>
      </>
          
          
         
      )}
    </>
  );
};

export default Pokemondetails;
