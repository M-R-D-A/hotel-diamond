import React from 'react'

const ChartBar = ({ name, percentages }) => {

  return (
    <div className="flex items-center mb-4">
      <div className="w-1/4">
        <span className="text-white">{name}</span>
      </div>
      <div className="w-3/4">
        <div className="flex h-6 bg-gray-300 overflow-hidden">
          <div
            className="bg-red-500"
            style={{
              width: `${percentages.red}%`,
              animation: 'progressAnimationRed 1s linear'
            }}
          >{percentages.red}</div>
          <div
            className="bg-yellow-500"
            style={{
              width: `${percentages.yellow}%`,
              animation: 'progressAnimationYellow 1s linear'
            }}
          >{percentages.yellow}</div>
          <div
            className="bg-green-500"
            style={{
              width: `${percentages.green}%`,
              animation: 'progressAnimationGreen 1s linear'
            }}
          >{percentages.green}</div>
        </div>
      </div>
      <style>
        {`
          @keyframes progressAnimationRed {
            0% {
              width: 0%;
            }
            ${percentages.red}% {
              width: ${percentages.red}%;
            }
          }
          @keyframes progressAnimationYellow {
            0% {
              width: 0%;
            }
            ${percentages.yellow}% {
              width: ${percentages.yellow}%;
            }
          }
          @keyframes progressAnimationGreen {
            0% {
              width: 0%;
            }
            ${percentages.green}% {
              width: ${percentages.green}%;
            }
          }
        `}
      </style>
    </div>
  );
};

const Home = () => {
  const data = [

    { name: 'Keshan', percentages: { red: 40, yellow: 30, green: 30 } },
    { name: 'Senam', percentages: { red: 20, yellow: 40, green: 40 } },
    { name: 'Jurus', percentages: { red: 10, yellow: 60, green: 30 } },
    { name: 'Fisik', percentages: { red: 50, yellow: 20, green: 30 } },
    { name: 'Teknik', percentages: { red: 30, yellow: 10, green: 60 } },
    { name: 'Sambung', percentages: { red: 60, yellow: 30, green: 10 } },
  ];

  return (
    <div className='h-screen w-screen bg-secondary-dark-bg text-white'>
      <div className="max-w-xs mx-auto mt-10">
        {data.map((item, index) => (
          <ChartBar key={index} name={item.name} percentages={item.percentages} />
        ))}
      </div>
    </div>
  );
}

export default Home