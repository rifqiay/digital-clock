import dayjs from "dayjs";
import 'dayjs/locale/id';
import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const dateFormatted = dayjs(now).locale('id').format('HH:mm:ss');
      setTime(dateFormatted);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[#10172A] h-screen text-[#E2E8F0] flex justify-center items-center">
      <div>
        <h1 className="lg:text-9xl md:text-9xl font-extrabold">
          {time}
        </h1>
      </div>
    </div>
  );
}

export default App;
