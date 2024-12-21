import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App(props) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const noteAvailbale = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/data");
        setNotes(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    noteAvailbale();
  }, []);

  async function addNote(newNote) {
    /* setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    }); */

    try {
      const result = await axios.post(
        "http://localhost:3000/api/addNote",
        newNote
      );
      //console.log(result.data.success);
      if (result.data.success === false) {
        console.log(result.data);
      } else {
        setNotes((prevNotes) => {
          return [...prevNotes, result.data.rows[0]];
        });
      }
    } catch (error) {
      //capture what is the error
      console.log(error);
    }
  }

  async function deleteNote(id) {
    /* setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    }); */

    try {
      const result = await axios.delete(
        `http://localhost:3000/api/deleteNote/${id}`
      );
      //console.log(result.data);
      if (result.data.success === true) {
        try {
          const result = await axios.get("http://localhost:3000/api/data");
          setNotes(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header onLogin={props.onLogin} />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
