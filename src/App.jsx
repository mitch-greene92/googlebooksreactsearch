import React, { useState } from "react";
import "./App.css";
import {
  InputGroup,
  Label,
  FormGroup,
  Input,
  Button,
  InputGroupAddon,
  Spinner,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BookCard from "./BookCard";

function App() {
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [load, setLoad] = useState(false);
  const [cards, setCards] = useState([]);
  const handleSubmit = () => {
    setLoad(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error("Max results must be between 1 and 40");
    } else {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
        )
        .then((res) => {
          if (startIndex >= res.data.totalItems || startIndex < 1) {
            toast.error(
              `Max Results must be between 1 and ${res.data.totalItems}`
            );
          } else {
            if (res.data.items.length > 0) {
              setCards(res.data.items);
              setLoad(false);
              console.log(cards);
            }
          }
          console.log(res.data);
        })
        .catch((err) => {
          setLoad(true);
        });
    }
  };
  const mainOverlay = () => {
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        {}
        <div className="filter"></div>
        <h1
          className="display-1 text-center text-white mb-3"
          style={{ zIndex: 2 }}
        >
          Google Books React Search
        </h1>
        <div style={{ width: "40%", zIndex: 2 }}>
          <InputGroup size="lg" className="mb-3">
            <Input
              placeholder="Enter a Book Title or Author to Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={handleSubmit}>
                <i className="fas fa-search"></i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <FormGroup className="ml-5">
              <Label for="maxResults">Max Book Results</Label>
              <Input
                type="number"
                id="maxResults"
                placeholder="Max Results"
                value={maxResults}
                onChange={(e) => setMaxResults(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="ml-5">
              <Label for="startIndex">Start Search Index</Label>
              <Input
                type="number"
                id="startIndex"
                placeholder="Start Index"
                value={startIndex}
                onChange={(e) => setStartIndex(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  };

  const handleCards = () => {
    console.log(cards);
    const books = cards.map((book, i) => {
      let thumbnail = "";
      if (book.volumeInfo.imageLinks.thumbnail) {
        thumbnail = book.volumeInfo.imageLinks.thumbnail;
      } else {
        thumbnail = "../src/images/missing.png";
      }

      return (
        <div className="col-lg-4 mb-3" key={book.id}>
          <BookCard 
          thumbnail={thumbnail}
          title={ book.volumeInfo.title}
          pageCount={book.volumeInfo.pageCount}
          authors= {book.volumeInfo.authors}
          publisher= {book.volumeInfo.publisher}
          language = {book.volumeInfo.language}
          description = {book.volumeInfo.description}
          previewLink= {book.volumeInfo.previewLink}
          infolink = {book.volumeInfo.infoLink}
           />
        </div>
      );
    });
    if (load) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        </div>
      );
    } else {
      return (
        <div className="container my-5">
          <div className="row">{books}</div>
        </div>
      );
    }
  };
  return (
    <div className="w-100 h-100">
      {mainOverlay()}
      {handleCards()}
      <ToastContainer />
    </div>
  );
}
export default App;
