import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import AllPokemon from "./components/AllPokemon";
import "./styles.css";
import Pokemondetails from "./components/Pokemondetails";
import InfoSelect from "./components/InfoSelect";

export default function App() {
  const [pokeData, setPokeData] = useState(null);
  const [pokeAPI, setPokeAPI] = useState(null);

  useEffect(() => {
    const pokemonData = async () => {
      const generalData = await fetch("https://pokefight-wbs.herokuapp.com/pokemon")
        .then(res => res.json())
        .then(data => {
          setPokeData(data);
          return data;
        })
        // .then(data => console.log(data.id))
        .catch(err => console.error(err));

      }
    pokemonData();
    
  }, []);

  

  return (
    <>
      <div>POKEFIGHT</div>
      <Switch>
        <Route path="/pokemon/:id/:info">
          <InfoSelect />
        </Route>
        <Route path="/pokemon/:id">
          <Pokemondetails />
        </Route>

        <Route path="/all">
          <AllPokemon pokeData={pokeData} pokeAPI={pokeAPI} />
        </Route>
      </Switch>
    </>
  );
}
