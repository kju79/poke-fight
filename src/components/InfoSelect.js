import React, { Fragment, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const InfoSelect = props => {
  const [pokeInfo, setPokeInfo] = useState(null);

  const { id, info } = useParams();
  const history = useHistory();
  useEffect(() => {
    fetch(`https://pokefight-wbs.herokuapp.com/pokemon/${id}/${info}`)
      .then(res => res.json())
      .then(data => setPokeInfo(data))
      .catch(err => console.error(err));
  }, [id, info]);

  const handleChange = e => {
    let selection = e.target.value;
    history.push(`/pokemon/${id}/${selection}`);
  };

  return (
    <Fragment>
      <select onChange={handleChange}>
        <option value="name">Name</option>
        <option value="type">Type</option>
        <option value="base">Base</option>
      </select>
      {pokeInfo &&
        Object.keys(pokeInfo).map(key => (
          <div>
            {key}: {pokeInfo[key]}
          </div>
        ))}
    </Fragment>
  );
};

// https://www.w3schools.com/tags/tag_select.asp
export default InfoSelect;
