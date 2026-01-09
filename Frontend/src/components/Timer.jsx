// import { useEffect, useState } from "react";

// export default function Timer({ timeLimit, onTimeUp }) {
//   const [time, setTime] = useState(timeLimit);

//   useEffect(() => {
//     if (time <= 0) {
//       onTimeUp();
//       return;
//     }

//     const interval = setInterval(() => {
//       setTime(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [time]);

//   return (
//     <div className="text-lg font-bold text-red-400">
//       Time Left: {time}s
//     </div>
//   );
// }


import { useEffect, useState } from "react";

export default function Timer({ timeLimit, onTimeUp }) {
  const [time, setTime] = useState(timeLimit);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-600 font-semibold shadow-sm">
      ⏱ Time Left: {time}s
    </div>
  );
}
