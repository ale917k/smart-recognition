import React, { useState, useEffect } from "react";

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState(null);

  const generateEmoji = (entries) => {
    fetch(
      `https://kdqxu1a3qi.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`
    )
      .then((response) => response.json())
      .then((data) => setEmoji(data.input))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    entries && generateEmoji(entries);
  }, [entries]);

  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
      <div className="white f3">{`Rank Badge: ${emoji}`}</div>
    </div>
  );
};

export default Rank;
