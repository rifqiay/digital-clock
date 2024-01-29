import {useState} from 'react'

const Modal = () => {
    const [task, setTask] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        const taskData = {
            task,
            startAt : new Date(),
            endAt: null,
            isCompleted: false
        }

        localStorage.setItem(`task-${task}`, JSON.stringify(taskData));
        window.location.reload()
    }

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div>
            <input type="text" placeholder='Task' className='w-full p-3 rounded-lg' onChange={(e) => setTask(e.target.value)} />
            <div className='flex gap-4 mt-3'>
            </div>
        </div>
    <div className="modal-action">
      <form method="dialog" className='flex gap-3'>
        <button className="btn">Close</button>
        <button className='btn' onClick={handleSave}>Mulai</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default Modal
