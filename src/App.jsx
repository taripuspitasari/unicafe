import {useState} from "react";

const Statistic = ({total, good, neutral, bad, average}) => {
  if (total === 0) {
    return (
      <div>
        <h1>No feedback given</h1>
      </div>
    );
  }
  return (
    <div>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average / total} />
        <StatisticLine text="positive" value={good / total} />
      </table>
    </div>
  );
};

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);

  const handleClickGood = () => {
    setAverage(average + 1);
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
  };

  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral + 1);
    setTotal(good + updatedNeutral + bad);
  };

  const handleClickBad = () => {
    setAverage(average - 1);
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(good + neutral + updatedBad);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />
      <h1>statistic</h1>
      <Statistic
        total={total}
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
      />
    </div>
  );
};

export default App;
