import React, { useState } from "react";
import { CardBody, Button, Modal, Card, CardTitle, CardImg } from "reactstrap";

const BookCard = ({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  previewLink,
  infoLink,
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Card style={{ width: "200px" }} className="m-auto">
      <CardImg
        top
        style={{ width: "100%", height: "100%" }}
        src={thumbnail}
        alt={title}
      />
      <CardBody>
        <CardTitle className="card-title">{title}</CardTitle>
        <Button onClick={toggle}>More info</Button>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className="modal-header d-flex justify-content-center">
          <h5 className="modal-title text-center" id="exampleModalLabel">
            {title}
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={toggle}
          >
            <span aria-hidden={true}>X</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-between ml-3">
            <img src={thumbnail} alt={title} style={{ height: "100%" }} />
            <div>
              <p>Author: {authors}</p>
              <p>Publishers: {publisher}</p>
              <p>Page Count: {pageCount}</p>
              <p>Language: {language}</p>
            </div>
          </div>
          <div className="mt-3">{description}</div>
        </div>
        <div className="modal-footer">
          <div className="right-slide">
            <a
              href={previewLink}
              className="btn-link"
              color="default"
              type="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview Link
            </a>
            </div>
            <div className='divider'></div>
            <div className="right-slide">
            <a
              href={infoLink}
              className="btn-link"
              color="default"
              type="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Info Link
            </a>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default BookCard;
