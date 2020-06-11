import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AllPokemonPic from "../img/maxresdefault.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 540
  },
  media: {
    height: 140
  }
});

const AllPokemon = ({ pokeData }) => {
  const classes = useStyles();
  const [pokeAvatar, setPokeAvatar] = useState(null);
  const [dataSet, setDataSet] = useState(false);
  const [page, setPage] = useState(1);
  const [slicedPokeData, setSlicedPokeData] = useState(null);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSlicePokemons = pokeData => {
    const start = page * 10 - 10;
    const end = page * 10;
    return pokeData.slice(start, end);
  };

  useEffect(() => {

    if (pokeData) {

      setSlicedPokeData(handleSlicePokemons(pokeData));
    }

  }, [pokeData, page])

  useEffect(() => {
    if (slicedPokeData) {


      let pokemonPics = [];


      slicedPokeData.map((each, index) => {
        fetch(
          `https://pokeapi.co/api/v2/pokemon/${each.name.english.toLowerCase()}`
        )
          .then(res => res.json())
          .then(data => pokemonPics.push(data.sprites.front_default));

        if (slicedPokeData.length === index + 1) {
          setPokeAvatar(pokemonPics);
          setDataSet(true)
          console.log("Everything stored -> show index [2]", pokemonPics[2])
        }
      });
    }
  }, [slicedPokeData]);


  if (pokeAvatar && slicedPokeData) {

    // console.log( Object.entries( {pokeAvatar} )[0][1]);


    console.log(pokeAvatar[0])
    return (

      <React.Fragment>
        <div>All Pokemon</div>

        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={AllPokemonPic}
              title="All Pokemon"
            />
            <CardContent className={classes.root}>
              <div id="oneDivToRuleThemAll">
                {slicedPokeData.map((item, index) => {
                  console.log(item)    
                  console.log(pokeAvatar)            
                  return(


                  <div key = { item.id } >
                      <div className="eachPokemon">
                        <div className="eachPokemonAvatar">
                          <Avatar
                            alt="Remy Sharp"
                            // src={`${pokeAvatar.filter( (item) => index === item).front_default  }`}
                            src={pokeAvatar[index]}
                          />

                        </div>
                        <div className="eachPokemonName">
                          <Link key={`/pokemon/${item.id}`} to={`/pokemon/${item.id}`}>
                            {item.name.english}
                          </Link>
                        </div>
                      </div>
                  </div>
                )})}
              </div>
            </CardContent>
          </CardActionArea>
        <CardActions>
          {pokeData && (
            <Pagination
              page={page}
              count={Math.ceil(pokeData.length / 10)}
              onChange={handleChange}
            />
          )}
        </CardActions>
        </Card>
      </React.Fragment >
    )
  } else return null;
};

export default AllPokemon;
