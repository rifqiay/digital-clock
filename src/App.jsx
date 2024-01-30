import dayjs from "dayjs";
import "dayjs/locale/id";
import { useState, useEffect } from "react";
import Modal from "./components/modals/Modal";

function App() {
  const [time, setTime] = useState("");
  const [getTask, setGetTask] = useState([]);
  const [keys, setKeys] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const dateFormatted = dayjs(now).locale("id").format("HH:mm:ss");
      setTime(dateFormatted);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getAllKeysFromLocalStorage = () => {
      const keys = Object.keys(localStorage).filter((key) =>
        key.startsWith("task")
      );
      return keys;
    };

    const allKeys = getAllKeysFromLocalStorage();
    setKeys(allKeys);
    let taskData = [];
    allKeys.map((item) => {
      const task = localStorage.getItem(item);
      const parseData = JSON.parse(task);
      const data = {
        name: parseData.task,
        startAt: parseData.startAt,
        endAt: parseData.endAt,
        status: parseData.isCompleted,
        duration: parseData.duration,
      };
      taskData.push(data);
    });
    setGetTask(taskData);
  }, []);

  const handleFinishTask = (item) => {
    const endTask = new Date();
    const startAt = dayjs(item.startAt);
    const endAt = dayjs(endTask);
    const duration = endAt.diff(startAt, "second");
    // Mengonversi durasi ke format "HH:mm"
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);

    const durationFormatted = `${hours.toString().padStart(2, "0")}Jam ${minutes
      .toString()
      .padStart(2, "0")}Menit`;

    const taskData = {
      task: item.name,
      startAt: item.startAt,
      endAt: endTask,
      duration: durationFormatted,
      isCompleted: true,
    };

    localStorage.setItem(`task-${taskData.task}`, JSON.stringify(taskData));
    window.location.reload();
  };

  const handleClearTask = () => {
    for (const x of keys) {
      localStorage.removeItem(x);
    }
    window.location.reload();
  };

  return (
    <div className="bg-[#10172A] h-screen text-[#E2E8F0] flex justify-center items-center">
      <p
        className="absolute right-3 top-3 cursor-pointer"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Todo
      </p>
      <Modal />
      <p
        className="absolute right-3 bottom-3 cursor-pointer"
        onClick={handleClearTask}
      >
        Hapus semua tugas
      </p>
      <div>
        <h1 className="lg:text-9xl md:text-9xl font-extrabold text-center">
          {time}
        </h1>
        {getTask.map((item, i) => (
          <div className="flex gap-4 mt-1" key={i}>
            <span>Nama: {item.name}</span>
            <span>
              Mulai: {dayjs(item.startAt).locale("id").format("YY-MM-DD HH:mm")}
            </span>
            {/* <span>Selesai: {item.endAt && dayjs(item.endAt).locale('id').format('YY-MM-DD HH:mm')}</span> */}
            {/* <span >Status: {item.status ? 'Selesai' : 'Berlangsung'}</span> */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-accent"
                checked={item.status}
                onChange={() => handleFinishTask(item)}
                disabled={item.status}
              />
              <span>Dikerjakan</span>
            </div>
            <p>Durasi: {item.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
