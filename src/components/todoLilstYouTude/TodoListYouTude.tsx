/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import {
  deleteRequest,
  fetchTodos,
  patchRequest,
  postYouTude,
} from "../../redux/tools/todoSlice";
import Modal from "../modal/Modal";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import scss from "./TodoListYouTude.module.scss";

interface TodoItem {
  _id?: number;
  songs: string;
  name: string;
  title: string;
  spots: string;
  img: string;
  filterSelect: string;
}
interface typeNewData {
  id: number;
  songs: string;
  name: string;
  title: string;
  img: string;
  filterSelect: string;
}

const TodoListYouTude: FC = () => {
  const { data: todos, error, loading } = useAppSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  // const [valueSports, _] = useState<string>("");
  const [newSrc, setNewSrc] = useState<string>("");
  const [newImg, setNewImg] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [selectFilter, setSelectFilter] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalItems, setModalItems] = useState<TodoItem | null>(null);

  const notifyError = () => toast.error("write");

  const openModal = (item: TodoItem) => {
    setIsModal(true);
    setModalItems(item);
  };

  const closeModal = () => {
    setIsModal(false);
    setModalItems(null);
  };

  useEffect(() => {
    const getRequest = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch<any>(fetchTodos());
    };
    getRequest();
  }, [dispatch]);

  const handleAdd = () => {
    if (inputValue === "" || img === "" || name === "" || title === "") {
      notifyError();
    } else {
      const newData: typeNewData = {
        id: Math.random(),
        songs: inputValue,
        name: name,
        title: title,
        img: img,
        filterSelect: selectFilter,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch<any>(postYouTude(newData));
    }
    setInputValue("");
    setImg("");
    setName("");
    setTitle("");
  };

  const deleteItem = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch<any>(deleteRequest(id));
  };

  const editItem = (item: TodoItem) => {
    setNewSrc(item.songs);
    setNewName(item.name);
    setNewTitle(item.title);
    setNewImg(item.img);
    setEditId(item._id!);
  };

  const saveTodo = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch<any>(
      patchRequest({
        id,
        songs: newSrc,
        title: newTitle,
        name: newName,
        img: newImg,
      })
    );
    setEditId(null);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className="container">
      <div className={scss.TodoListYouTude}>
        {error && <h1>Error: {error}</h1>}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className={scss.content}>
              <input
                type="url"
                placeholder="image"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <input
                placeholder="url video"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <input
                placeholder="singer"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="song or sport"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Button onClick={handleAdd} color="secondary" variant="text">
                add
              </Button>
              <ToastContainer />
              <select
                value={selectFilter}
                onChange={(e) => setSelectFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="спорт">Sports</option>
                <option value="песни">Songs</option>
              </select>
            </div>
            <div className={scss.aside}>
              {todos.map((item) =>
                selectFilter === item.filterSelect || selectFilter === "All" ? (
                  <div key={item._id}>
                    {editId === item._id ? (
                      <div className={scss.edits}>
                        <input
                          value={newSrc}
                          onChange={(e) => setNewSrc(e.target.value)}
                        />
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                        />
                        <input
                          type="url"
                          placeholder="img"
                          value={newImg}
                          onChange={(e) => setNewImg(e.target.value)}
                        />
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <button onClick={() => saveTodo(item._id!)}>
                          Save
                        </button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <div className={scss.card}>
                        <img
                          onClick={() => openModal(item)}
                          src={item.img}
                          alt="image"
                        />
                        <p>{item.name}</p>
                        <h3>{item.title}</h3>
                        <button onClick={() => deleteItem(item._id!)}>
                          Delete
                        </button>
                        <button onClick={() => editItem(item)}>Edit</button>
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </div>
            {modalItems && (
              <Modal isOpen={isModal} onClose={closeModal}>
                <div>
                  <iframe
                    style={{
                      width: "800px",
                      height: "500px",
                    }}
                    src={modalItems.songs}
                  ></iframe>
                  <Modal isOpen={isModal} onClose={closeModal}>
                    <iframe
                      style={{
                        width: "800px",
                        height: "500px",
                      }}
                      src={modalItems.spots}
                    ></iframe>
                    <div>{/* <p>{modalItems.name}</p> */}</div>
                  </Modal>
                </div>
              </Modal>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoListYouTude;
